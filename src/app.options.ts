import {
  RestApplicationLoggerOptions,
  RestApplicationOptions,
} from '@pepa/platform-rest';
import { environment } from './config';

const loggerOptions: RestApplicationLoggerOptions = {
  level: 'debug',
  json: environment.env === 'production',
  stackTrace: environment.stage !== 'production',
  silent: false,
  request: true,
  requestBody: environment.stage !== 'production',
  response: true,
  responseBody: environment.stage !== 'production',
  excludeEndpoints: ['^/health'],
  sensitiveKeys: [/^password$/],
};

export const options: RestApplicationOptions = {
  // apiPrefix: 'credits/api',
  apiPrefixOptions: {
    exclude: ['health'],
  },
  enableCors: true,
  trustProxy: environment.env === 'production',
  versioning: true,
  validation: true,
  docs: {
    title: 'BFF CREDITS',
    description: '',
    servers: environment.stage === 'local' ? null : [{ url: '/bff-credits' }],
  },
  logger: loggerOptions,
};
