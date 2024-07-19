import { Body, Controller, Post } from '@nestjs/common';
import { CrawlingManagerService } from './crawling-manager.service';
import { CrawlingRequestDto } from './dtos';
import { ApiTags } from '@nestjs/swagger';
import { SWAGGER_SETTINGS } from '../swagger';

@ApiTags(SWAGGER_SETTINGS.TAGS.CRAWLING)
@Controller('crawling')
export class CrawlingManagerController {
  constructor(private readonly service: CrawlingManagerService) {}

  @Post()
  initializeCrawling(@Body() data: CrawlingRequestDto) {
    return this.service.initializeCrawling(data);
  }
}
