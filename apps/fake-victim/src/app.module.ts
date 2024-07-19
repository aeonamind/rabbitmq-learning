import { Module } from '@nestjs/common';
import { TokenIssuerModule } from './token-issuer';
import { DataModule } from './data';

@Module({
  imports: [TokenIssuerModule, DataModule],
})
export class AppModule {}
