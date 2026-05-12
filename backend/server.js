 console.log('Starting server...');

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

console.log('Loaded modules. Checking .env...');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Found' : 'MISSING');
console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? 'Found' : 'MISSING');

const app = express();
app.use(cors());
app.use(express.json());

let supabase;
try {
  supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
  console.log('Supabase client created');
} catch (e) {
  console.error('Supabase init failed:', e.message);
  process.exit(1);
}

app.get('/api/products', async (req, res) => {
  console.log('Got /api/products request');
  try {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
      console.error('Supabase error:', error.message);
      return res.status(500).json({ error: error.message });
    }
    console.log('Returning', data.length, 'products');
    res.json(data);
  } catch (err) {
    console.error('Route error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

app.listen(3001, () => {
  console.log('API running on 3001 - server is LIVE');
});

// Catch crashes
process.on('uncaughtException', (err) => {
  console.error('CRASHED:', err.message);
});
setInterval(() => {}, 1 << 30);
