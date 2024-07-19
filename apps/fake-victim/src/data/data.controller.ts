import { Controller, Get, Headers, Param } from '@nestjs/common';
import { DataService } from './data.service';

@Controller('songs')
export class DataController {
  constructor(private readonly service: DataService) {}

  @Get(':id')
  generateData(@Headers() headers: any, @Param('id') id: number) {
    return this.service.generateData(id, headers['x-token']);
  }
}
