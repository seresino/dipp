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
		await db.insert(users).values({
			username: content,
			password: "pass",
		});

		return { message: "User added successfully" };
	},

	update: async ({ request }) => {
		const formData = await request.formData();

		const content = formData.get("content")?.toString();
		const completed = formData.get("completed")?.toString();
		const id = formData.get("id")?.toString();

		if (!content || !id) {
			return fail(400, { message: "Error updating user" });
		}

		/**
		 * Finally, add the page to the database
		 */
		await db
			.update(users)
			.set({
				content,
				completed: !!completed,
			})
			.where(eq(users.id, +id));

		return { message: "User updated successfully" };
	},

	delete: async ({ request }) => {
		/**
		 * Get the form data from the request
		 */
		const formData = await request.formData();

		/**
		 * Get the title from the form data
		 */
		const id = formData.get("id")?.toString();

		if (!id) {
			return fail(400, { message: "Error deleting user" });
		}

		/**
		 * Finally, add the page to the database
		 */
		await db.delete(users).where(eq(users.id, +id));

		return { message: "User deleted successfully" };
	},
};

// export const load = async () => {
// 	return {
// 		users: await db.select().from(users).orderBy(desc(users.createdAt)),
// 	};
// };
