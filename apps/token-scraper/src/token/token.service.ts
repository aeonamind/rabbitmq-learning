import { AmqpConnection, RabbitRPC } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import {
  crawlingExchange,
  rpcTokenQueue,
  rpcTokenRoutingKey,
} from '@koujiman/rabbitmq-config';

@Injectable()
export class TokenService {
  constructor(private readonly amqpConnection: AmqpConnection) {}

  @RabbitRPC({
    exchange: crawlingExchange.name,
    queue: rpcTokenQueue.name,
    routingKey: rpcTokenRoutingKey,
  })
  async tokenHandler() {
    return (await axios.get('http://fake-victim:3000/tokens')).data;
  }
}
