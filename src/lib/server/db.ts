// 1
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "$env/dynamic/private";

const client = postgres(env.VITE_DB_URL!);
const db = drizzle(client);
export default db;

// 2
// import { drizzle } from "drizzle-orm/vercel-postgres";
// import { sql } from "@vercel/postgres";

// // import { config } from 'dotenv';
// // config({ path: '.env.local' }); // or .env

// // export const db = drizzle(sql);

// const db = drizzle(sql);
// export default db;

// // 3
// import { drizzle } from "drizzle-orm/vercel-postgres";
// import { createPool } from "@vercel/postgres";

// const pool = createPool({
// 	connectionString: process.env.VITE_DB_URL,
// });

// const db = drizzle(pool);
// export default db;
