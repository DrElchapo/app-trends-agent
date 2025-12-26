import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Firestore } from '@google-cloud/firestore';
import * as path from 'path';

interface FirebaseConfig {
  projectId: string;
  credentialsPath: string;
}

@Injectable()
export class FirebaseAnalyticsService {
  private firestore: Firestore;

  constructor(private readonly configService: ConfigService) {
    this.initializeFirestore();
  }

  private initializeFirestore() {
    const config = this.configService.get<FirebaseConfig>('firebase');

    if (!config?.projectId || !config?.credentialsPath) {
      throw new Error('Firebase credentials not configured');
    }

    const credentialsPath = path.resolve(config.credentialsPath);

    this.firestore = new Firestore({
      projectId: config.projectId,
      keyFilename: credentialsPath,
    });
  }

  async getEvents(
    appId: string,
    startDate: Date,
    endDate: Date,
    eventName?: string,
  ) {
    try {
      const eventsRef = this.firestore
        .collection('analytics')
        .doc(appId)
        .collection('events');

      let query = eventsRef
        .where('timestamp', '>=', startDate)
        .where('timestamp', '<=', endDate);

      if (eventName) {
        query = query.where('event_name', '==', eventName);
      }

      const snapshot = await query.get();
      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      throw new Error(`Ошибка при получении событий: ${error.message}`);
    }
  }

  async getUserMetrics(appId: string, startDate: Date, endDate: Date) {
    try {
      const metricsRef = this.firestore
        .collection('analytics')
        .doc(appId)
        .collection('user_metrics');

      const snapshot = await metricsRef
        .where('date', '>=', startDate.toISOString().split('T')[0])
        .where('date', '<=', endDate.toISOString().split('T')[0])
        .get();

      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      throw new Error(`Ошибка при получении метрик пользователей: ${error.message}`);
    }
  }

  async getRetentionData(appId: string, cohortDate: Date) {
    try {
      const retentionRef = this.firestore
        .collection('analytics')
        .doc(appId)
        .collection('retention');

      const snapshot = await retentionRef
        .where('cohort_date', '==', cohortDate.toISOString().split('T')[0])
        .get();

      return snapshot.docs.map((doc) => doc.data());
    } catch (error) {
      throw new Error(`Ошибка при получении данных удержания: ${error.message}`);
    }
  }
}

