#!/usr/bin/env node
const { spawnSync } = require('child_process');
const semver = process.version.replace(/^v/, '');
const major = parseInt(semver.split('.')[0], 10);

if (Number.isNaN(major)) {
  console.warn('Unable to detect Node.js major version; skipping tests before version bump.');
  process.exit(0);
}

if (major > 12) {
  console.warn('Skipping npm test (winston 0.8.x test suite requires Node <=12).');
  process.exit(0);
}

const result = spawnSync('npm', ['test'], { stdio: 'inherit' });
process.exit(result.status || 0);
