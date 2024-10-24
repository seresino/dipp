import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "$env/dynamic/private";

const client = postgres(env.VITE_DB_URL);
const db = drizzle(client);
export default db;
