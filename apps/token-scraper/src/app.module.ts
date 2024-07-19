import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { TokenModule } from './token';
import { rabbitmqConfig, TRabbitMQConfig } from '@koujiman/common';
import { crawlingExchange, rpcTokenQueue } from '@koujiman/rabbitmq-config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [rabbitmqConfig],
      cache: true,
      expandVariables: true,
    }),
    {
      ...RabbitMQModule.forRootAsync(RabbitMQModule, {
        useFactory: (rabbitmqConf: TRabbitMQConfig) => ({
          uri: rabbitmqConf.uri,
          exchanges: [crawlingExchange],
          queues: [rpcTokenQueue],
        }),
        inject: [rabbitmqConfig.KEY],
      }),
      global: true,
    },

    TokenModule,
  ],
})
export class AppModule {}
