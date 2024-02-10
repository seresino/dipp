import db from "$lib/server/db";
import { dailyTasks } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { eq, and } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";

import {
	getDay,
	getTodaysDate,
	getDefaultRedirect,
} from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();

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
export const load = async ({ locals }) => {
	const user = locals.user;
	const userID = user[0].id;

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	const userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)));

	console.log("Query:", userTasksQuery[0]);

	const journalPromptQuery = await db
		.select()
		.from(journalPrompts)
		.where(eq(journalPrompts.id, getDay()));
	return {
		user: user,
		journalPrompt: journalPromptQuery[0],
		userTasks: userTasksQuery[0],
	};
};
