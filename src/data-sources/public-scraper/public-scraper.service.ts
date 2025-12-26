import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as cheerio from 'cheerio';

@Injectable()
export class PublicScraperService {
  constructor(private readonly httpService: HttpService) {}

  async scrapeAppStore(appId: string) {
    try {
      const url = `https://apps.apple.com/app/id${appId}`;
      const response = await firstValueFrom(this.httpService.get(url));
      const $ = cheerio.load(response.data);

      const name = $('h1').first().text().trim();
      const developer = $('.product-header__identity a').text().trim();
      const rating = $('.we-rating-count').text().trim();
      const reviewsCount = $('.we-customer-ratings__count').text().trim();
      const description = $('.product-review__pdp-section').first().text().trim();
      const category = $('.product-header__category').text().trim();
      const price = $('.product-header__list__item--price').text().trim();

      const screenshots: string[] = [];
      $('.product-screenshots img').each((_, el) => {
        const src = $(el).attr('src');
        if (src) screenshots.push(src);
      });

      return {
        name,
        developer,
        rating: parseFloat(rating) || 0,
        reviewsCount: this.parseNumber(reviewsCount),
        description,
        category,
        price,
        screenshots,
      };
    } catch (error) {
      throw new Error(`Ошибка при парсинге App Store: ${error.message}`);
    }
  }

  async scrapeGooglePlay(packageName: string) {
    try {
      const url = `https://play.google.com/store/apps/details?id=${packageName}`;
      const response = await firstValueFrom(this.httpService.get(url));
      const $ = cheerio.load(response.data);

      const name = $('h1').first().text().trim();
      const developer = $('a[href*="/store/apps/developer"]').first().text().trim();
      const rating = $('.BHMmbe').text().trim();
      const reviewsCount = $('.EymY4b span').first().text().trim();
      const description = $('.DWPxHb').first().text().trim();
      const category = $('a[href*="/store/apps/category"]').first().text().trim();
      const price = $('.VfPpkd-rymPhb-ibnC6b').text().trim() || 'Бесплатно';

      const screenshots: string[] = [];
      $('img[alt*="Screenshot"]').each((_, el) => {
        const src = $(el).attr('src');
        if (src && !screenshots.includes(src)) screenshots.push(src);
      });

      return {
        name,
        developer,
        rating: parseFloat(rating) || 0,
        reviewsCount: this.parseNumber(reviewsCount),
        description,
        category,
        price,
        screenshots,
      };
    } catch (error) {
      throw new Error(`Ошибка при парсинге Google Play: ${error.message}`);
    }
  }

  async getAppStoreReviews(appId: string, page: number = 1) {
    try {
      const url = `https://apps.apple.com/rss/customerreviews/page=${page}/id=${appId}/sortby=mostrecent/json`;
      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      if (!data.feed || !data.feed.entry) {
        return [];
      }

      return data.feed.entry.map((entry: any) => ({
        author: entry.author?.name?.label,
        rating: parseInt(entry['im:rating']?.label),
        title: entry.title?.label,
        content: entry.content?.label,
        date: entry.updated?.label,
      }));
    } catch (error) {
      throw new Error(`Ошибка при получении отзывов App Store: ${error.message}`);
    }
  }

  async getGooglePlayReviews(packageName: string, page: number = 0) {
    try {
      const url = `https://play.google.com/store/getreviews`;
      const response = await firstValueFrom(
        this.httpService.post(url, null, {
          params: {
            reviewType: 0,
            pageNum: page,
            id: packageName,
            reviewSortOrder: 0,
            xhr: 1,
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }),
      );

      const $ = cheerio.load(response.data[2][0]);
      const reviews: any[] = [];

      $('.single-review').each((_, el) => {
        const author = $(el).find('.author-name').text().trim();
        const rating = $(el).find('.rating').attr('aria-label')?.match(/\d+/)?.[0];
        const date = $(el).find('.review-date').text().trim();
        const content = $(el).find('.review-body').text().trim();

        reviews.push({
          author,
          rating: rating ? parseInt(rating) : 0,
          date,
          content,
        });
      });

      return reviews;
    } catch (error) {
      throw new Error(`Ошибка при получении отзывов Google Play: ${error.message}`);
    }
  }

  private parseNumber(text: string): number {
    const cleaned = text.replace(/[^\d.,]/g, '');
    const num = parseFloat(cleaned.replace(',', '.'));
    return isNaN(num) ? 0 : num;
  }
}

