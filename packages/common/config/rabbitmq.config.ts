import { ConfigType, registerAs } from '@nestjs/config';

export const rabbitmqConfig = registerAs('rabbitmq', () => ({
  host: process.env.RABBITMQ_HOST,
  port: process.env.RABBITMQ_PORT,
  username: process.env.RABBITMQ_USERNAME,
  password: process.env.RABBITMQ_PASSWORD,
  uri: process.env.RABBITMQ_URI,
}));

export type TRabbitMQConfig = ConfigType<typeof rabbitmqConfig>;
