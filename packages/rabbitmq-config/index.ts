import {
  RabbitMQExchangeConfig,
  RabbitMQQueueConfig,
} from '@golevelup/nestjs-rabbitmq';

export const crawlingExchange: RabbitMQExchangeConfig = {
  name: 'crawling_exchange',
  type: 'direct',
};

export const crawlingJobsRequestQueue: RabbitMQQueueConfig = {
  name: 'crawling_jobs_request',
};
export const crawlingJobsResponseQueue: RabbitMQQueueConfig = {
  name: 'crawling_jobs_response',
};
export const rpcTokenQueue: RabbitMQQueueConfig = {
  name: 'rpc_token_queue',
};

export const crawlingJobsRequestRoutingKey = 'crawling_jobs_request_route';
export const crawlingJobsResponseRoutingKey = 'crawling_jobs_response_route';
export const rpcTokenRoutingKey = 'rpc_token_route';
