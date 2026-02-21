import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manual .env parsing/loading
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (!fs.existsSync(envPath)) {
      console.error('❌ .env file not found');
      return {};
    }
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const env = {};
    envContent.split('\n').forEach(line => {
      const match = line.match(/^([^=]+)=(.*)$/);
      if (match) {
        env[match[1].trim()] = match[2].trim();
      }
    });
    return env;
  } catch (err) {
    console.error('❌ Error reading .env:', err.message);
    return {};
  }
}

const env = loadEnv();
const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

console.log('--- Supabase Connection Verification ---');
console.log(`URL: ${supabaseUrl}`);
console.log(`Key: ${supabaseKey ? 'Preseent (starts with ' + supabaseKey.substring(0, 5) + '...)' : 'Missing'}`);

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing credentials. Aborting.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('Testing connection...');
    // Try to fetch a non-existent table just to check connection, or a known one. 
    // diagnose tool used 'works'. Let's try that.
    const { data, error } = await supabase.from('works').select('count', { count: 'exact', head: true });

    if (error) {
       console.error('❌ Connection failed with error:', error.message);
       console.error('Error details:', error);
       
       if (error.code === 'PGRST301') {
         console.log('⚠️  Note: JWT might be expired or invalid, or RLS policies are blocking access.');
       }
    } else {
       console.log('✅ Connection successful!');
       console.log('Accessible tables check: OK');
    }

  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
}

testConnection();
