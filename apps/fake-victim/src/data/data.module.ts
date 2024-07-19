import { Module } from '@nestjs/common';
import { DataController } from './data.controller';
import { DataService } from './data.service';
import { TokenIssuerModule } from '../token-issuer';

@Module({
  imports: [TokenIssuerModule],
  controllers: [DataController],
  providers: [DataService],
})
export class DataModule {}
