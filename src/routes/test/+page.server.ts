import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";
import seed from "./seed";

export const actions = {
	add: async ({ request }) => {
		// Get the form data from the request
		const formData = await request.formData();

		// Get the username from the form data
		const username = formData.get("username");

		// Update message if username empty
		if (!username) {
			return fail(400, { message: "Title is required" });
		}

		// Finally, add entry to the database
		await db.insert(users).values({
			username: username,
			password: "pass",
			high_dosage: true,
		});

		return { message: "User added successfully" };
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get("username")?.toString();
		const password = formData.get("password")?.toString();
		const meditation = formData.get("meditation")?.toString();
		const high_dosage = formData.get("high_dosage")?.toString();
		const id = formData.get("id")?.toString();

		if (!username || !password || !id) {
			return fail(400, { message: "Error updating user" });
		}

		await db
			.update(users)
			.set({
				username,
				password,
				meditation: !!meditation,
				high_dosage: !!high_dosage,
			})
			.where(eq(users.id, +id));

		return { message: "User updated successfully" };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get("id")?.toString();

		if (!id) {
			return fail(400, { message: "Error deleting user" });
		}

		await db.delete(users).where(eq(users.id, +id));
		return { message: "User deleted successfully" };
	},

	seed: seed,
};

export const load = async () => {
	return {
		users: await db.select().from(users).orderBy(desc(users.id)),
	};
};
