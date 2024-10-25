import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { json } from "@sveltejs/kit";
import * as XLSX from "xlsx";
import * as fs from "fs";
import * as path from "path";
import { env } from "$env/dynamic/private";

// Set up connection with PostgreSQL
console.log("Connecting to PostgreSQL-", env.VITE_DB_URL);
const sql = postgres(env.VITE_DB_URL);
const db = drizzle(sql);

export const GET = async () => {
	try {
		// Fetch all table names from PostgreSQL
		const tables = await db.execute(
			`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`
		);

		// Prepare a new workbook
		const workbook = XLSX.utils.book_new();

		for (const table of tables) {
			const tableName = table.table_name;
			const tableData = await db.execute(`SELECT * FROM "${tableName}"`);

			// Convert the table data to a worksheet
			const worksheet = XLSX.utils.json_to_sheet(tableData);

			// Append the worksheet to the workbook
			XLSX.utils.book_append_sheet(workbook, worksheet, tableName);
		}

		// Define the file path
		const filePath = path.resolve("tables.xlsx");

		// Write the workbook to a file
		XLSX.writeFile(workbook, filePath);

		// Return the Excel file
		return new Response(fs.readFileSync(filePath), {
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
