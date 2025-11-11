import type { Config } from 'jest'

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  rootDir: './',
  testMatch: ['**/__tests__/**/*.test.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  collectCoverageFrom: [
    'app/api/**/*.ts',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!app/api/auth/**/*.ts', // NextAuth 라우트는 테스트 제외
  ],
  coverageThreshold: {
    global: {
      branches: 75,
      functions: 100,
      lines: 85,
      statements: 85,
    },
  },
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/.next/',
    '/coverage/',
  ],
  testTimeout: 30000, // Railway DB 지연을 고려한 타임아웃 (30초)
  maxWorkers: 1, // 테스트를 순차적으로 실행하여 DB 격리 보장
}

export default config
