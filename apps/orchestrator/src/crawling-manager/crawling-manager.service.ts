import { Injectable } from '@nestjs/common';
import { AmqpConnection, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

import { CrawlingRequestDto } from './dtos';
import {
  crawlingExchange,
  crawlingJobsRequestRoutingKey,
  crawlingJobsResponseQueue,
  crawlingJobsResponseRoutingKey,
} from '@koujiman/rabbitmq-config';
import { ICrawlingRequestMessage } from './interfaces';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Redis from 'ioredis';
import { dump } from 'js-yaml';
import { writeFile } from 'fs/promises';
import { splitRange } from './crawling-manager.util';

@Injectable()
export class CrawlingManagerService {
  private startTime: number;

  constructor(
    private readonly amqpConnection: AmqpConnection,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async initializeCrawling(data: CrawlingRequestDto) {
    this.startTime = Date.now();
    const messages = splitRange(data.start, data.end, 10);

    await Promise.all(
      messages.map(
        async (message) =>
          await this.amqpConnection.publish<ICrawlingRequestMessage>(
            crawlingExchange.name,
            crawlingJobsRequestRoutingKey,
            message,
            {
              persistent: true,
            },
          ),
      ),
    );

    return 'OK';
  }

  @RabbitSubscribe({
    exchange: crawlingExchange.name,
    queue: crawlingJobsResponseQueue.name,
    routingKey: crawlingJobsResponseRoutingKey,
    queueOptions: {
      channel: 'prefetch1Channel',
    },
  })
  async handleResult(message: any) {
    const count =
      parseInt(await this.redis.get(`${message.label}_total_count`)) || 0;

    await this.redis.set(`${message.label}_total_count`, count + 1);

    if (await this.checkJobComplete(message.label)) {
      const keys = await this.redis.keys(`${message.label}:*`);

      const result = {};
      for (const key of keys) {
        const propName = key.split(':')[2];
        result[propName] = await this.redis.get(key);
      }

      await this.writeResultToFile(message.label, result);

      await this.redis.del([...keys, `${message.label}_total_count`]);
    }
  }

  async checkJobComplete(label: string) {
    const count = parseInt(await this.redis.get(`${label}_total_count`));
    return count === 10;
  }

  async writeResultToFile(label: string, data: any) {
    const name = label.split(':')[1];
    const yamlStr = dump(data);

    await writeFile(`${name}.yaml`, yamlStr);

    const completedTime = Date.now() - this.startTime;
    console.log(`${label} completed in ${completedTime}ms`);
  }
}
