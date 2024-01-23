import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

export const actions = {
	add: async ({ request }) => {
		/**
		 * Get the form data from the request
		 */
		const formData = await request.formData();

		/**
		 * Get the title from the form data
		 */
		const content = formData.get("content");

		if (!content) {
			return fail(400, { message: "Title is required" });
		}

		/**
		 * Finally, add the page to the database
		 */
		// await db.insert(todos).values({
		// 	content,
		// });

		await db.insert(users).values({
			username: content,
			password: "pass",
		});

		return { message: "Todo added successfully" };
	},
};

// export const load = async () => {
// 	return {
// 		todos: await db.select().from(todos).orderBy(desc(todos.createdAt)),
// 	};
// };
