import { ConfigType, registerAs } from '@nestjs/config';

export const redisConfig = registerAs('redis', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT) || 6379,
}));

export type TRedisConfig = ConfigType<typeof redisConfig>;
