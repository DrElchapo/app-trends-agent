import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import * as path from 'path';

interface GooglePlayConfig {
  serviceAccountPath: string;
  packageName: string;
}

@Injectable()
export class GooglePlayService {
  private androidPublisher: any;

  constructor(private readonly configService: ConfigService) {
    this.initializeService();
  }

  private async initializeService() {
    const config = this.configService.get<GooglePlayConfig>('googlePlay');

    if (!config?.serviceAccountPath || !config?.packageName) {
      throw new Error('Google Play credentials not configured');
    }

    const keyPath = path.resolve(config.serviceAccountPath);
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/androidpublisher'],
    });

    this.androidPublisher = google.androidpublisher({
      version: 'v3',
      auth,
    });
  }

  async getStatistics() {
    try {
      const config = this.configService.get<GooglePlayConfig>('googlePlay');
      const edits = this.androidPublisher.edits;

      const editRequest = await edits.insert({
        packageName: config.packageName,
      });

      const editId = editRequest.data.id;

      const stats = await edits.statistics.get({
        packageName: config.packageName,
        editId,
      });

      await edits.delete({
        packageName: config.packageName,
        editId,
      });

      return stats.data;
    } catch (error) {
      throw new Error(`Ошибка при получении статистики: ${error.message}`);
    }
  }

  async getReviews(maxResults: number = 200) {
    try {
      const config = this.configService.get<GooglePlayConfig>('googlePlay');
      const reviews = await this.androidPublisher.reviews.list({
        packageName: config.packageName,
        maxResults,
      });

      return reviews.data.reviews || [];
    } catch (error) {
      throw new Error(`Ошибка при получении отзывов: ${error.message}`);
    }
  }

  async getInstallsByCountry(startDate: Date, endDate: Date) {
    try {
      const config = this.configService.get<GooglePlayConfig>('googlePlay');
      const reports = this.androidPublisher.reports;

      const result = await reports.query({
        packageName: config.packageName,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        metrics: ['installs'],
        dimensions: ['country'],
      });

      return result.data;
    } catch (error) {
      throw new Error(`Ошибка при получении установок по странам: ${error.message}`);
    }
  }

  async getInstallsByDevice(startDate: Date, endDate: Date) {
    try {
      const config = this.configService.get<GooglePlayConfig>('googlePlay');
      const reports = this.androidPublisher.reports;

      const result = await reports.query({
        packageName: config.packageName,
        startTime: startDate.toISOString(),
        endTime: endDate.toISOString(),
        metrics: ['installs'],
        dimensions: ['deviceType'],
      });

      return result.data;
    } catch (error) {
      throw new Error(`Ошибка при получении установок по устройствам: ${error.message}`);
    }
  }
}

