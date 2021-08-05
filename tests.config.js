const { pathsToModuleNameMapper } = require('ts-jest/utils');
const React = require('react');

const { compilerOptions } = require('./tsconfig');
const { globals } = require('./globals');

module.exports = {
  collectCoverageFrom: [],
  coverageReporters: ['text'],
  coverageDirectory: './code-coverage',
  roots: [
    '<rootDir>/src'
  ],
  globals: {
    [globals.IS_PRODUCTION]: true,
    React,
  },
  testMatch: [
    '<rootDir>/src/**/*.test.{js,jsx,ts,tsx}'
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$'
  ],
  modulePaths: [],
  moduleFileExtensions: [
    'web.js',
    'js',
    'web.ts',
    'ts',
    'web.tsx',
    'tsx',
    'json',
    'web.jsx',
    'jsx',
    'node'
  ],
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/src/core/tests/setup/index.ts']
};