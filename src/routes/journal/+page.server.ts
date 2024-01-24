import db from "$lib/server/db";
import { dailyTasks } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

export const actions = {
	update: async ({ request }) => {
		const formData = await request.formData();
		const journal = formData.get("journal")?.toString();
		const id = formData.get("id")?.toString();

		if (!journal || !id) {
			return fail(400, { message: "Error updating journal" });
		}

		await db
			.update(dailyTasks)
			.set({
				journal
			})
			.where(eq(dailyTasks.user_id, +id));

		return { message: "Journal entry updated successfully" };
	},
};

// find journal prompt with id 1
export const load = async () => {
	return {
		users: await db.select().from(journalPrompts).where(eq(journalPrompts.id, 1)),
	};
};

// // Retrieve current day's journal entry
// export const load = async () => {
// 	return {
// 		users: await db.select().from(dailyTasks).where(dailyTasks.user_id, +id).orderBy(desc(dailyTasks.id)),
// 	};
// };
