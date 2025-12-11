#!/usr/bin/env node
/* eslint-env node */

// Simple test runner to check Jest setup
const { execSync } = require('child_process');
const path = require('path');

try {
  console.log('Running Jest tests...');

  // Run jest directly from node_modules
  const jestPath = path.join(process.cwd(), 'node_modules', '.bin', 'jest');
  execSync(`${jestPath} --no-watch --verbose`, {
    cwd: process.cwd(),
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'test' },
  });

  console.log('Tests completed successfully!');
} catch (error) {
  console.error('Test execution failed:', error.message);
  process.exit(1);
}
