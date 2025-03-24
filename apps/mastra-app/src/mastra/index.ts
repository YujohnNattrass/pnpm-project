import { Mastra } from '@mastra/core/mastra';
import { createLogger } from '@mastra/core/logger';

import { weatherAgent } from './agents';

const mastra = new Mastra({
  agents: { weatherAgent },
  logger: createLogger({
    name: 'Weather Agent',
    level: 'info',
  }),
}) as any;

export { mastra }