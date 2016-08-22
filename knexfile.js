require('dotenv').config();

module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    ssl: false,
    pool: {
      min: 2,
      max: 10
    }
  },
};


