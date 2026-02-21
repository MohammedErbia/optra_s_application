import { readFileSync } from 'fs';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

// 1. Manually parse .env since dotenv isn't installed
function parseEnv() {
  const envContent = readFileSync('.env', 'utf-8');
  const env = {};
  envContent.split('\n').forEach(line => {
    line = line.trim();
    if (line && !line.startsWith('#')) {
      const [key, ...values] = line.split('=');
      env[key.trim()] = values.join('=').trim().replace(/^['"]|['"]$/g, '');
    }
  });
  return env;
}

const env = parseEnv();

// 2. Initialize Firebase
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: env.VITE_FIREBASE_DATABASE_URL,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log('Initializing Firebase with Project ID:', firebaseConfig.projectId);
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 3. Define schema for known tables to map indices to column names
const schemas = {
  'blog': ['id', 'title', 'slug', 'short_description', 'content', 'cover_image_url', 'author_name', 'author_role', 'author_image_url', 'published_at', 'category', 'tags', 'is_featured', 'reading_time', 'is_published', 'created_at', 'updated_at', 'show_cover_image', 'helpful_yes_count', 'helpful_no_count', 'title_ar', 'short_description_ar', 'content_ar', 'tags_ar', 'category_ar'],
  'careers': ['id', 'title', 'description', 'image', 'content', 'category', 'deadline', 'link_share', 'helpful_yes_count', 'helpful_no_count', 'job_summary', 'forms', 'title_ar', 'description_ar', 'category_ar'],
  'contact_us': ['id', 'name', 'email', 'message', 'created_at'],
  'mission_stats': ['id', 'label', 'value', 'created_at', 'type', 'label_ar'],
  'partners': ['id', 'name', 'logo_image', 'created_at'],
  'services': ['id', 'title', 'description', 'icon_image', 'slug', 'created_at', 'title_ar', 'description_ar'],
  'socials': ['id', 'icon_svg', 'url', 'created_at'],
  'testimonials': ['id', 'quote', 'name', 'user_image', 'created_at', 'quote_ar'],
  'works': ['id', 'title', 'description', 'strategy', 'case_study_brief', 'slug', 'image', 'created_at', 'project-type', 'url_work', 'project-type_ar']
};

function parsePostgresValue(value) {
  if (value === '\\N') return null; // Null representation in pg dump
  if (value === 't') return true;
  if (value === 'f') return false;
  
  // Handle PostgreSQL Arrays e.g., {ECOMERS APP,MUSIC APP} or {"ECOMERS APP"}
  if (value.startsWith('{') && value.endsWith('}')) {
    const inner = value.slice(1, -1);
    if (!inner) return [];
    
    // Rudimentary array parsing (splitting by comma, handling quotes)
    // Note: This might break if values contain commas inside quotes, 
    // but should be fine for our specific tags which look simple.
    const elements = inner.split(',');
    return elements.map(e => e.replace(/^"|"$/g, '').trim());
  }

  // Attempt to parse numbers, but only if they are entirely numeric (to avoid parsing things like "1" randomly if they should be strings)
  if (!isNaN(value) && value.trim() !== '' && !value.includes('-')) { // Checking for hyphens to avoid date conversion issues if any, but ID handles UUID.
     // Actually, it's safer to keep things as strings unless we absolutely know they are numbers based on column schema.
     // Given JavaScript's loose typing, leaving them as strings is often safer unless they are counts.
     // Let's explicitly look for counts.
  }
  
  return value;
}


async function migrate() {
  const filePath = 'db/db_cluster-18-08-2025@07-13-05.backup';
  console.log(`Starting migration from ${filePath}...`);
  
  const content = readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  let currentTable = null;
  let cols = [];
  let successCount = 0;
  let errorCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for start of a COPY block
    if (line.startsWith('COPY public.')) {
      const match = line.match(/COPY public\.([a-z_]+) \((.*?)\) FROM stdin;/i);
      if (match) {
        currentTable = match[1];
        if (schemas[currentTable]) {
           cols = schemas[currentTable];
           console.log(`======= STARTING TABLE: ${currentTable} =======`);
        } else {
           console.log(`Skipping unknown table structure: ${currentTable}`);
           currentTable = null; // Skip tables we don't have schemas for
        }
        continue;
      }
    }

    // Check for end of a COPY block
    if (line === '\\.') {
      if (currentTable) {
        console.log(`======= FINISHED TABLE: ${currentTable} =======`);
        currentTable = null;
      }
      continue;
    }

    // Process data rows within a COPY block
    if (currentTable && cols.length > 0) {
      if (!line.trim()) continue; // Skip empty lines

      const values = line.split('\t');
      
      // Safety check: ensure values match columns (roughly)
      if (values.length !== cols.length) {
         console.warn(`Warning: Column count mismatch in ${currentTable} (Expected ${cols.length}, got ${values.length}). Line: ${i + 1}`);
         // Still try to process it
      }

      const docData = {};
      let docId = null;

      values.forEach((val, index) => {
        const key = cols[index];
        if (key) {
           const parsedVal = parsePostgresValue(val);
           docData[key] = parsedVal;
           if (key === 'id') {
             docId = parsedVal;
           }
        }
      });

      // Explicitly convert known numeric types for certain columns
      if (docData['helpful_yes_count']) docData['helpful_yes_count'] = parseInt(docData['helpful_yes_count'], 10) || 0;
      if (docData['helpful_no_count']) docData['helpful_no_count'] = parseInt(docData['helpful_no_count'], 10) || 0;
      if (docData['reading_time']) docData['reading_time'] = parseInt(docData['reading_time'], 10) || 0;

      if (!docId) {
        console.error(`Error: No ID found for row in ${currentTable}. Skipping.`);
        errorCount++;
        continue;
      }

      // Convert Date strings to Firestore Timestamps if needed. But Firebase SDK accepts standard Date objects or strings, too.
      // Easiest is to leave as ISO strings to avoid issues, or convert to timestamps if strictly required. 
      // Firestore handles ISO date strings well enough for basic use cases.

      try {
        const docRef = doc(db, currentTable, docId);
        await setDoc(docRef, docData);
        successCount++;
        if (successCount % 50 === 0) console.log(`Migrated ${successCount} records so far...`);
      } catch (err) {
        console.error(`Failed to upload doc ${docId} to ${currentTable}:`, err.message);
        errorCount++;
      }
    }
  }

  console.log(`\nMigration completed!`);
  console.log(`Successfully migrated: ${successCount}`);
  console.log(`Errors encountered: ${errorCount}`);
  process.exit(0);
}

migrate().catch(console.error);
