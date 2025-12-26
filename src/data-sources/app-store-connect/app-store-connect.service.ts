import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import * as path from 'path';

interface AppStoreConnectConfig {
  keyId: string;
  issuerId: string;
  keyPath: string;
}

interface TokenPayload {
  iss: string;
  iat: number;
  exp: number;
  aud: string;
}

@Injectable()
export class AppStoreConnectService {
  private readonly baseUrl = 'https://api.appstoreconnect.apple.com/v1';
  private token: string | null = null;
  private tokenExpires: number = 0;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  private generateToken(): string {
    const now = Math.floor(Date.now() / 1000);
    
    if (this.token && now < this.tokenExpires) {
      return this.token;
    }

    const config = this.configService.get<AppStoreConnectConfig>('appStoreConnect');
    
    if (!config?.keyId || !config?.issuerId || !config?.keyPath) {
      throw new Error('App Store Connect credentials not configured');
    }

    const keyPath = path.resolve(config.keyPath);
    const privateKey = fs.readFileSync(keyPath, 'utf8');

    const headers = {
      alg: 'ES256',
      kid: config.keyId,
      typ: 'JWT',
    };

    const payload: TokenPayload = {
      iss: config.issuerId,
      iat: now,
      exp: now + 1200,
      aud: 'appstoreconnect-v1',
    };

    this.token = jwt.sign(payload, privateKey, {
      algorithm: 'ES256',
      header: headers,
    }) as string;

    this.tokenExpires = now + 1100;

    return this.token;
  }

  private async makeRequest(endpoint: string, params?: Record<string, any>) {
    const token = this.generateToken();
    const url = `${this.baseUrl}/${endpoint}`;

    const response = await firstValueFrom(
      this.httpService.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        params,
      }),
    );

    return response.data;
  }

  async getApps() {
    const data = await this.makeRequest('apps');
    return data.data || [];
  }

  async getSalesReports(
    appId: string,
    startDate: Date,
    endDate: Date,
  ) {
    const params = {
      'filter[reportType]': 'SALES',
      'filter[frequency]': 'DAILY',
      'filter[reportSubType]': 'SUMMARY',
      'filter[reportDate]': `${this.formatDate(startDate)},${this.formatDate(endDate)}`,
    };

    const data = await this.makeRequest(`apps/${appId}/salesReports`, params);
    return data.data || [];
  }

  async getDownloads(appId: string, startDate: Date, endDate: Date) {
    const params = {
      'filter[reportType]': 'INSTALLS',
      'filter[frequency]': 'DAILY',
      'filter[reportDate]': `${this.formatDate(startDate)},${this.formatDate(endDate)}`,
    };

    return await this.makeRequest(`apps/${appId}/downloads`, params);
  }

  async getReviews(appId: string, limit: number = 200) {
    const params = {
      limit,
      sort: '-createdDate',
    };

    const data = await this.makeRequest(`apps/${appId}/customerReviews`, params);
    return data.data || [];
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

