import * as dotenv from "dotenv";
dotenv.config();
import { defineConfig } from "drizzle-kit";

// const db_url =
// 	"postgres://${process.env.VITE_DATABASE_USERNAME}:${process.env.VITE_DATABASE_PASSWORD}@${process.env.VITE_DATABASE_HOST}:${process.env.VITE_DATABASE_PORT}/${process.env.VITE_DATABASE_NAME}";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/server/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.VITE_DB_URL!,
	},
});
