/**
 * Configuration loader for GUI-driven spec editor
 */

import dotenv from 'dotenv';
import { existsSync } from 'fs';
import { join } from 'path';
import { logger } from './utils/logger.js';
import type { Config } from './types.js';

// Load .env file
dotenv.config();

/**
 * Load and validate configuration
 */
export function loadConfig(): Config {
  // Determine mode
  const mode = (process.env.MODE?.toLowerCase() || 'cli') as 'cli' | 'api';

  if (mode !== 'cli' && mode !== 'api') {
    logger.error(`Invalid MODE: ${process.env.MODE}. Must be 'cli' or 'api'`);
    process.exit(1);
  }

  // Get API key if in API mode
  let apiKey: string | undefined;
  if (mode === 'api') {
    apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      logger.error('ANTHROPIC_API_KEY is required when MODE=api');
      logger.info('Set ANTHROPIC_API_KEY in .env file or environment');
      process.exit(1);
    }
  }

  // Spec file location
  const specFile = join(process.cwd(), 'spec.html');
  if (!existsSync(specFile)) {
    logger.error('spec.html not found in current directory');
    logger.info('Create a spec.html file to get started');
    process.exit(1);
  }

  // Configuration values
  const config: Config = {
    mode,
    apiKey,
    specFile,
    debounceMs: 300,
    claudeTimeout: 60000, // 60 seconds
  };

  logger.debug(`Configuration loaded: mode=${mode}, specFile=${specFile}`);

  return config;
}
