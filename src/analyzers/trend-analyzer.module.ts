import { Module } from '@nestjs/common';
import { TrendAnalyzerService } from './trend-analyzer.service';
import { TrendAnalyzerController } from './trend-analyzer.controller';
import { AppStoreConnectModule } from '../data-sources/app-store-connect/app-store-connect.module';
import { GooglePlayModule } from '../data-sources/google-play/google-play.module';
import { FirebaseAnalyticsModule } from '../data-sources/firebase-analytics/firebase-analytics.module';
import { GoogleAnalyticsModule } from '../data-sources/google-analytics/google-analytics.module';
import { PublicScraperModule } from '../data-sources/public-scraper/public-scraper.module';

@Module({
  imports: [
    AppStoreConnectModule,
    GooglePlayModule,
    FirebaseAnalyticsModule,
    GoogleAnalyticsModule,
    PublicScraperModule,
  ],
  controllers: [TrendAnalyzerController],
  providers: [TrendAnalyzerService],
  exports: [TrendAnalyzerService],
})
export class TrendAnalyzerModule {}

