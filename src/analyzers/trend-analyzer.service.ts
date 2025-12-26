import { Injectable } from '@nestjs/common';
import { AppStoreConnectService } from '../data-sources/app-store-connect/app-store-connect.service';
import { GooglePlayService } from '../data-sources/google-play/google-play.service';
import { FirebaseAnalyticsService } from '../data-sources/firebase-analytics/firebase-analytics.service';
import { GoogleAnalyticsService } from '../data-sources/google-analytics/google-analytics.service';
import { PublicScraperService } from '../data-sources/public-scraper/public-scraper.service';

@Injectable()
export class TrendAnalyzerService {
  constructor(
    private readonly appStoreConnectService: AppStoreConnectService,
    private readonly googlePlayService: GooglePlayService,
    private readonly firebaseAnalyticsService: FirebaseAnalyticsService,
    private readonly googleAnalyticsService: GoogleAnalyticsService,
    private readonly publicScraperService: PublicScraperService,
  ) {}

  async analyzeAppStoreTrends(appId: string, days: number = 30) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [downloads, reviews, sales] = await Promise.all([
      this.appStoreConnectService.getDownloads(appId, startDate, endDate),
      this.appStoreConnectService.getReviews(appId, 200),
      this.appStoreConnectService.getSalesReports(appId, startDate, endDate),
    ]);

    return {
      downloads,
      reviews: {
        total: reviews.length,
        averageRating: this.calculateAverageRating(reviews),
        recent: reviews.slice(0, 10),
      },
      sales,
      period: { startDate, endDate },
    };
  }

  async analyzeGooglePlayTrends(packageName: string, days: number = 30) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const [statistics, reviews, installsByCountry, installsByDevice] =
      await Promise.all([
        this.googlePlayService.getStatistics(),
        this.googlePlayService.getReviews(200),
        this.googlePlayService.getInstallsByCountry(startDate, endDate),
        this.googlePlayService.getInstallsByDevice(startDate, endDate),
      ]);

    return {
      statistics,
      reviews: {
        total: reviews.length,
        averageRating: this.calculateAverageRating(reviews),
        recent: reviews.slice(0, 10),
      },
      installsByCountry,
      installsByDevice,
      period: { startDate, endDate },
    };
  }

  async analyzePublicData(appStoreId?: string, googlePlayPackage?: string) {
    const results: any = {};

    if (appStoreId) {
      results.appStore = await this.publicScraperService.scrapeAppStore(
        appStoreId,
      );
    }

    if (googlePlayPackage) {
      results.googlePlay = await this.publicScraperService.scrapeGooglePlay(
        googlePlayPackage,
      );
    }

    return results;
  }

  async getComprehensiveAnalysis(
    appStoreId?: string,
    googlePlayPackage?: string,
    days: number = 30,
  ) {
    const analysis: any = {
      period: days,
      timestamp: new Date(),
    };

    if (appStoreId) {
      analysis.appStore = await this.analyzeAppStoreTrends(appStoreId, days);
      analysis.appStorePublic = await this.publicScraperService.scrapeAppStore(
        appStoreId,
      );
    }

    if (googlePlayPackage) {
      analysis.googlePlay = await this.analyzeGooglePlayTrends(
        googlePlayPackage,
        days,
      );
      analysis.googlePlayPublic =
        await this.publicScraperService.scrapeGooglePlay(googlePlayPackage);
    }

    return analysis;
  }

  private calculateAverageRating(reviews: any[]): number {
    if (!reviews || reviews.length === 0) return 0;

    const ratings = reviews
      .map((review) => {
        if (review.rating) return review.rating;
        if (review['im:rating']?.label) return parseInt(review['im:rating'].label);
        return 0;
      })
      .filter((rating) => rating > 0);

    if (ratings.length === 0) return 0;

    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    return sum / ratings.length;
  }
}

