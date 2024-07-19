import { Module } from '@nestjs/common';
import { TokenIssuerController } from './token-issuer.controller';
import { TokenIssuerService } from './token-issuer.service';

@Module({
  controllers: [TokenIssuerController],
  providers: [TokenIssuerService],
  exports: [TokenIssuerService],
})
export class TokenIssuerModule {}
