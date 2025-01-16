const axios = require('axios');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', 
  host: 'localhost',
  database: 'pokemon',
  password: 'pokemon',
  port: 5432,
});

const fetchAndSeedPokemon = async () => {
  try {
    for (let i = 1; i <= 1025; i++) { 
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`);
      const { id, name, height, weight, stats, sprites, types } = response.data;

      const image = sprites.front_default;
      const type = types.map((t) => t.type.name).join(', ');
      const hp = stats[0].base_stat;
      const attack = stats[1].base_stat;
      const defense = stats[2].base_stat;
      const specialAttack = stats[3].base_stat;
      const specialDefense = stats[4].base_stat;

      await pool.query(
        `INSERT INTO pokemon (id, name, image, type, height, weight, hp, attack, defense, special_attack, special_defense)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
        [id, name, image, type, height, weight, hp, attack, defense, specialAttack, specialDefense]
      );
      console.log(`Added ${name}`);
    }

    console.log('Seed complete!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

fetchAndSeedPokemon();

