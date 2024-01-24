import db from "$lib/server/db";
import { dailyTasks } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { eq, and } from "drizzle-orm";

import { getDay, getUserID, getTodaysDate } from "$lib/utils/helperFunctions";

// Would acc import these in from somewhere else --------------------------------
const loggedInUserID = getUserID();

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
				journal,
			})
			.where(eq(dailyTasks.id, +id));

		return { message: "Journal entry updated successfully" };
	},
};

// find journal prompt with id === day of prep
export const load = async () => {
	const userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, loggedInUserID),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

	const journalPromptQuery = await db
		.select()
		.from(journalPrompts)
		.where(eq(journalPrompts.id, getDay()));
	return {
		journalPrompt: journalPromptQuery[0],
		userTasks: userTasksQuery[0],
	};
};
