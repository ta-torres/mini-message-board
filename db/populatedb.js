#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text TEXT NOT NULL,
  username VARCHAR(255) NOT NULL,
  added TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO messages (text, username, added) 
VALUES
  ('Hi there!', 'Amando', CURRENT_TIMESTAMP),
  ('Hello World!', 'Charles', CURRENT_TIMESTAMP),
  ('Welcome to our message board!', 'Sarah', CURRENT_TIMESTAMP),
  ('This is a test message', 'Mike', CURRENT_TIMESTAMP);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString:
      process.env.DATABASE_URL ||
      "postgresql://tom:2580@localhost:5432/message_board",
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
