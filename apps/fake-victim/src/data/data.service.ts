import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenIssuerService } from '../token-issuer/token-issuer.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class DataService {
  constructor(private readonly tokenIssuerService: TokenIssuerService) {}

  async generateData(id: number, token: string) {
    if (token !== (await this.tokenIssuerService.getToken()))
      throw new BadRequestException();

    return {
      id,
      data: faker.music.songName(),
    };
  }
}
