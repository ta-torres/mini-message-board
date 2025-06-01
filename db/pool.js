const { Pool } = require("pg");

module.exports = new Pool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

// connection string
/* module.exports = new Pool({
  connectionString: process.env.DATABASE_URL
}); */
