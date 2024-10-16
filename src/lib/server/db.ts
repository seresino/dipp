// import { drizzle } from "drizzle-orm/node-postgres";
// import pkg from "pg";
// const { Client } = pkg;

// const client = new Client({
// 	host: import.meta.env.VITE_DATABASE_HOST,
// 	user: import.meta.env.VITE_DATABASE_USERNAME,
// 	password: import.meta.env.VITE_DATABASE_PASSWORD,
// 	database: import.meta.env.VITE_DATABASE_NAME,
// 	port: import.meta.env.VITE_DATABASE_PORT,
// 	ssl: true, // Handle SSL mode
// });

// await client.connect();
// const db = drizzle(client);

// export default db;

// import { drizzle } from "drizzle-orm/node-postgres";
import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";

const db = drizzle({ client: sql });

// import { Pool } from "@vercel/postgres"; // Vercel's Postgres Pool

// // Create the client using Vercel's Postgres pool
// const pool = new Pool({
// 	connectionString: process.env.POSTGRES_URL, // Use Vercel's provided connection string
// 	ssl: true, // Enable SSL for secure connections
// });

// // Initialize Drizzle ORM with the Postgres client
// const db = drizzle(pool);

export default db;
