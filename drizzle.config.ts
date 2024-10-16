// import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// dotenv.config();

// export default {
// 	schema: "./src/lib/server/schema.ts",
// 	out: "./migrations",
// 	driver: "pg",
// 	dbCredentials: {
// 		connectionString: `postgres://${process.env.VITE_DATABASE_USERNAME}:${process.env.VITE_DATABASE_PASSWORD}@${process.env.VITE_DATABASE_HOST}/${process.env.VITE_DATABASE_NAME}`,
// 	},
// } satisfies Config;

import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "drizzle-kit";

const db_url =
	"postgres://${process.env.VITE_DATABASE_USERNAME}:${process.env.VITE_DATABASE_PASSWORD}@${process.env.VITE_DATABASE_HOST}:${process.env.VITE_DATABASE_PORT}/${process.env.VITE_DATABASE_NAME}";
// console.log("URL", db_url);

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/server/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: db_url,
	},
});
