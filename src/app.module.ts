import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppStoreConnectModule } from './data-sources/app-store-connect/app-store-connect.module';
import { GooglePlayModule } from './data-sources/google-play/google-play.module';
import { FirebaseAnalyticsModule } from './data-sources/firebase-analytics/firebase-analytics.module';
import { GoogleAnalyticsModule } from './data-sources/google-analytics/google-analytics.module';
import { PublicScraperModule } from './data-sources/public-scraper/public-scraper.module';
import { TrendAnalyzerModule } from './analyzers/trend-analyzer.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AppStoreConnectModule,
    GooglePlayModule,
    FirebaseAnalyticsModule,
    GoogleAnalyticsModule,
    PublicScraperModule,
    TrendAnalyzerModule,
  ],
})
export class AppModule {}

