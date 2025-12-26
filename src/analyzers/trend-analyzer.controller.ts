import { Controller, Get, Query, Param } from '@nestjs/common';
import { TrendAnalyzerService } from './trend-analyzer.service';

@Controller('analyze')
export class TrendAnalyzerController {
  constructor(private readonly trendAnalyzerService: TrendAnalyzerService) {}

  @Get('app-store/:appId')
  async analyzeAppStore(
    @Param('appId') appId: string,
    @Query('days') days?: string,
  ) {
    const daysNumber = days ? parseInt(days) : 30;
    return this.trendAnalyzerService.analyzeAppStoreTrends(appId, daysNumber);
  }

  @Get('google-play/:packageName')
  async analyzeGooglePlay(
    @Param('packageName') packageName: string,
    @Query('days') days?: string,
  ) {
    const daysNumber = days ? parseInt(days) : 30;
    return this.trendAnalyzerService.analyzeGooglePlayTrends(
      packageName,
      daysNumber,
    );
  }

  @Get('public')
  async analyzePublic(
    @Query('appStoreId') appStoreId?: string,
    @Query('googlePlayPackage') googlePlayPackage?: string,
  ) {
    return this.trendAnalyzerService.analyzePublicData(
      appStoreId,
      googlePlayPackage,
    );
  }

  @Get('comprehensive')
  async getComprehensiveAnalysis(
    @Query('appStoreId') appStoreId?: string,
    @Query('googlePlayPackage') googlePlayPackage?: string,
    @Query('days') days?: string,
  ) {
    const daysNumber = days ? parseInt(days) : 30;
    return this.trendAnalyzerService.getComprehensiveAnalysis(
      appStoreId,
      googlePlayPackage,
      daysNumber,
    );
  }
}

