const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ['http://localhost:3000','http://localhost:5173'],//Replace your frontend webpage address when you run both locally and online
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true
}));
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome to the Pokémon API!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
const { Pool } = require('pg');

// Database connection
const pool = new Pool({
  user: 'postgres', // Replace with your DB username
  host: 'localhost',
  database: 'pokemon',
  password: 'pokemon', // Replace with your DB password
  port: 5432, // Default PostgreSQL port
});

pool.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Connected to the database.');
  }
});
app.get('/api/pokemon', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10; // Default limit to 10
      const offset = parseInt(req.query.offset) || 0; // Default offset to 0
      const result = await pool.query('SELECT * FROM pokemon ORDER BY id');
      const paginatedPokemon = result.rows.slice(offset, offset + limit);
      res.json(paginatedPokemon);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      res.status(500).send('Server error');
    }
  });
  app.get('/api/pokemon/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query('SELECT * FROM pokemon WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return res.status(404).send('Pokémon not found');
      }
      res.json(result.rows[0]);
    } catch (error) {
      console.error('Error fetching Pokémon:', error);
      res.status(500).send('Server error');
    }
  });
