import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AppStoreConnectService } from './app-store-connect.service';

@Module({
  imports: [HttpModule],
  providers: [AppStoreConnectService],
  exports: [AppStoreConnectService],
})
export class AppStoreConnectModule {}

