import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PublicScraperService } from './public-scraper.service';

@Module({
  imports: [HttpModule],
  providers: [PublicScraperService],
  exports: [PublicScraperService],
})
export class PublicScraperModule {}

