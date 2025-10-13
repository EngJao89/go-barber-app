#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const environment = process.argv[2];

if (!environment || !['dev', 'prod'].includes(environment)) {
  console.error('❌ Uso: node scripts/set-env.js [dev|prod]');
  console.error('   Exemplo: node scripts/set-env.js dev');
  process.exit(1);
}

const envConfig = {
  dev: {
    NODE_ENV: 'development',
    NEXT_PUBLIC_API_URL: 'http://localhost:3333'
  },
  prod: {
    NODE_ENV: 'production', 
    NEXT_PUBLIC_API_URL: 'https://api-gb-vowe.onrender.com'
  }
};

const envContent = Object.entries(envConfig[environment])
  .map(([key, value]) => `${key}=${value}`)
  .join('\n');

const envPath = path.join(process.cwd(), '.env.local');

fs.writeFileSync(envPath, envContent);

console.log(`✅ Ambiente configurado para: ${environment.toUpperCase()}`);
console.log(`📡 API URL: ${envConfig[environment].NEXT_PUBLIC_API_URL}`);
console.log(`🔧 NODE_ENV: ${envConfig[environment].NODE_ENV}`);
