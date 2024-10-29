import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { json } from "@sveltejs/kit";
import * as XLSX from "xlsx";
import { env } from "$env/dynamic/private";

// Set up connection with PostgreSQL
// console.log("Connecting to PostgreSQL-", env.VITE_DB_URL);
// const sql = postgres(env.VITE_DB_URL);
// const db = drizzle(sql);

import db from "$lib/server/db";

export const GET = async () => {
	try {
		// Fetch all table names from PostgreSQL
		const tables = await db.execute(
			`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
		);

		// Prepare a new workbook
		const workbook = XLSX.utils.book_new();

		// console.log("Tables:", tables); // Only works for local version
		// for (const table of tables) { // for local version

		console.log("Tables Names:", tables.rows); // Only works for vercel version
		for (const table of tables.rows) {
			// Only works for vercel version
			console.log("Name: ", table.table_name);
			const tableName = table.table_name;
			const tableData = await db.execute(`SELECT * FROM "${tableName}"`);

			// Convert the table data to a worksheet
			const worksheet = XLSX.utils.json_to_sheet(tableData.rows);

			// Append the worksheet to the workbook
			XLSX.utils.book_append_sheet(workbook, worksheet, tableName);
		}

		// Write the workbook to a buffer
		const buffer = XLSX.write(workbook, {
			type: "buffer",
			bookType: "xlsx",
		});

		// Return the Excel file as a response
		return new Response(buffer, {
			headers: {
				"Content-Type":
					"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
				"Content-Disposition": "attachment; filename=tables.xlsx",
			},
		});
	} catch (err) {
		console.error("Error exporting tables:", err);
		return json({ error: "Error exporting tables" }, { status: 500 });
	}
};
