import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { CrawlingManagerModule } from './crawling-manager';
import {
  rabbitmqConfig,
  redisConfig,
  TRabbitMQConfig,
  TRedisConfig,
} from '@koujiman/common';
import {
  crawlingExchange,
  crawlingJobsRequestQueue,
  crawlingJobsResponseQueue,
} from '@koujiman/rabbitmq-config';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig, redisConfig],
      cache: true,
      expandVariables: true,
    }),
    {
      ...RabbitMQModule.forRootAsync(RabbitMQModule, {
        useFactory: (rabbitmqConf: TRabbitMQConfig) => ({
          uri: rabbitmqConf.uri,
          exchanges: [crawlingExchange],
          queues: [crawlingJobsRequestQueue, crawlingJobsResponseQueue],
          channels: {
            prefetch1Channel: {
              prefetchCount: 1,
            },
          },
        }),
        inject: [rabbitmqConfig.KEY],
      }),
      global: true,
    },

    RedisModule.forRootAsync({
      useFactory: async (redisConf: TRedisConfig) => ({
        config: {
          host: redisConf.host,
          port: redisConf.port,
        },
      }),
      inject: [redisConfig.KEY],
    }),

    CrawlingManagerModule,
  ],
})
export class AppModule {}
