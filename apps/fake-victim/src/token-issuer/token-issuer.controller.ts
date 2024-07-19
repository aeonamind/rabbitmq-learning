import { Controller, Get } from '@nestjs/common';
import { TokenIssuerService } from './token-issuer.service';

@Controller('tokens')
export class TokenIssuerController {
  constructor(private readonly service: TokenIssuerService) {}

  @Get()
  generateToken() {
    return this.service.getToken();
  }
}
