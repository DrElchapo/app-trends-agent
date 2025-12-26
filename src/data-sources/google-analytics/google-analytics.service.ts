import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import * as path from 'path';

interface GoogleAnalyticsConfig {
  propertyId: string;
  credentialsPath: string;
}

@Injectable()
export class GoogleAnalyticsService {
  private analyticsData: any;

  constructor(private readonly configService: ConfigService) {
    this.initializeService();
  }

  private async initializeService() {
    const config = this.configService.get<GoogleAnalyticsConfig>('googleAnalytics');

    if (!config?.propertyId || !config?.credentialsPath) {
      throw new Error('Google Analytics credentials not configured');
    }

    const keyPath = path.resolve(config.credentialsPath);
    const auth = new google.auth.GoogleAuth({
      keyFile: keyPath,
      scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
    });

    this.analyticsData = google.analyticsdata({
      version: 'v1beta',
      auth,
    });
  }

  async getReport(
    startDate: string,
    endDate: string,
    metrics: string[],
    dimensions?: string[],
  ) {
    try {
      const config = this.configService.get<GoogleAnalyticsConfig>('googleAnalytics');

      const request = {
        property: `properties/${config.propertyId}`,
        dateRanges: [
          {
            startDate,
            endDate,
          },
        ],
        metrics: metrics.map((metric) => ({ name: metric })),
        dimensions: dimensions?.map((dimension) => ({ name: dimension })),
      };

      const response = await this.analyticsData.properties.runReport(request);
      return response.data;
    } catch (error) {
      throw new Error(`Ошибка при получении отчета: ${error.message}`);
    }
  }

  async getUsers(startDate: string, endDate: string) {
    return this.getReport(startDate, endDate, ['activeUsers'], ['date']);
  }

  async getSessions(startDate: string, endDate: string) {
    return this.getReport(startDate, endDate, ['sessions'], ['date']);
  }

  async getEvents(startDate: string, endDate: string, eventName?: string) {
    const dimensions = ['eventName', 'date'];
    if (eventName) {
      return this.getReport(
        startDate,
        endDate,
        ['eventCount'],
        dimensions,
      ).then((data) => {
        return data.rows?.filter((row) => row.dimensionValues[0].value === eventName);
      });
    }
    return this.getReport(startDate, endDate, ['eventCount'], dimensions);
  }

  async getAcquisitionData(startDate: string, endDate: string) {
    return this.getReport(
      startDate,
      endDate,
      ['newUsers', 'sessions'],
      ['sessionSource', 'sessionMedium'],
    );
  }
}

