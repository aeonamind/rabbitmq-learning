import {
  AmqpConnection,
  Nack,
  RabbitSubscribe,
} from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import {
  crawlingExchange,
  crawlingJobsRequestQueue,
  crawlingJobsRequestRoutingKey,
  crawlingJobsResponseRoutingKey,
  rpcTokenRoutingKey,
} from '@koujiman/rabbitmq-config';
import axios, { AxiosError } from 'axios';
import Redis from 'ioredis';
import { InjectRedis } from '@liaoliaots/nestjs-redis';

@Injectable()
export class CrawlingService {
  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  @RabbitSubscribe({
    exchange: crawlingExchange.name,
    queue: crawlingJobsRequestQueue.name,
    routingKey: crawlingJobsRequestRoutingKey,
    queueOptions: {
      channel: 'prefetch1Channel',
    },
  })
  async handleCrawlingJobs(message: any) {
    let i = message.start;

    try {
      const token = await this.amqpConnection.request<string>({
        exchange: crawlingExchange.name,
        routingKey: rpcTokenRoutingKey,
        payload: {},
      });

      for (; i <= message.end; i++) {
        const data = (
          await axios.get(`http://fake-victim:3000/songs/${i}`, {
            headers: {
              'x-token': token,
            },
          })
        ).data;

        await this.redis.set(`${message.label}:${i}`, data.data);
      }

      console.log(`${message.label} offset: ${message.end} completed`);

      await this.amqpConnection.publish(
        crawlingExchange.name,
        crawlingJobsResponseRoutingKey,
        {
          label: message.label,
          offset: message.end,
        },
      );
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(`${message.label} offset: ${message.end} failed`);
        await this.amqpConnection.publish(
          crawlingExchange.name,
          crawlingJobsRequestRoutingKey,
          {
            ...message,
            start: i,
          },
        );

        return;
      }

      return new Nack(true);
    }
  }
}
