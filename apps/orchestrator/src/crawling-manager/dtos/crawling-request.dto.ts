import { ApiProperty } from '@nestjs/swagger';

export class CrawlingRequestDto {
  @ApiProperty()
  start: number;

  @ApiProperty()
  end: number;
}
