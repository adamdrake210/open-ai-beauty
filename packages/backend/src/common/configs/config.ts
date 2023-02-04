import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 3001,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'AI-Poetry Nestjs',
    description: 'APIs for AI-Poetry Backend',
    version: '1.5',
    path: 'api',
  },
  security: {
    expiresIn: '2m',
    refreshIn: '7d',
  },
};

export default (): Config => config;
