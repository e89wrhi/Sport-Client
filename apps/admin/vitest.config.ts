import { mergeConfig, defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import baseConfig from '@sport/config/vitest-react';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default mergeConfig(
  baseConfig,
  defineConfig({
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
  })
);
