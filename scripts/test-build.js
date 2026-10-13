import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('Running regression check for Vercel deployment configuration...');

// Check 1: vercel.json exists and specifies framework: "nextjs"
const vercelJsonPath = path.resolve('vercel.json');
if (!fs.existsSync(vercelJsonPath)) {
  console.error('FAIL: vercel.json does not exist');
  process.exit(1);
}

const vercelConfig = JSON.parse(fs.readFileSync(vercelJsonPath, 'utf8'));
if (vercelConfig.framework !== 'nextjs') {
  console.error(`FAIL: vercel.json framework expected "nextjs", got "${vercelConfig.framework}"`);
  process.exit(1);
}

// Check 2: npm run build passes
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('PASS: npm run build succeeded.');
} catch (e) {
  console.error('FAIL: npm run build failed.');
  process.exit(1);
}

console.log('SUCCESS: All regression tests passed!');
