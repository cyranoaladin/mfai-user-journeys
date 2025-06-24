/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  transform: {
    '^.+\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
    }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/'
  ],
  // Configuration pour la couverture de code
  collectCoverage: true,
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'services/**/*.{js,jsx,ts,tsx}',
    'stores/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/__tests__/**',
    '!**/tests/**',
  ],
  coverageThreshold: {
    global: {
      branches: 10,
      functions: 25,
      lines: 25,
      statements: 25,
    },
    './services/': {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
