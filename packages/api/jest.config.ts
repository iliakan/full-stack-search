import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm', // needed for ts to support top-level await
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  verbose: true,
  restoreMocks: true,
  forceExit: true,
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  }
}

export default config;
