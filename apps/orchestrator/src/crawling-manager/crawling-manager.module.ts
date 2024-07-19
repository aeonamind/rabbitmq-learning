import { Module } from '@nestjs/common';
import { CrawlingManagerController } from './crawling-manager.controller';
import { CrawlingManagerService } from './crawling-manager.service';

@Module({
  controllers: [CrawlingManagerController],
  providers: [CrawlingManagerService],
})
export class CrawlingManagerModule {}
