import { Injectable, OnModuleInit } from '@nestjs/common';
import UIDGenerator from 'uid-generator';

@Injectable()
export class TokenIssuerService implements OnModuleInit {
  token: string = new UIDGenerator().generate();

  onModuleInit() {
    setInterval(() => {
      this.token = new UIDGenerator().generate();
    }, 10000);
  }

  async getToken() {
    return this.token;
  }
}
