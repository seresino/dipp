import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/lib/server/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		url: process.env.VITE_DB_URL!,
	},
});
