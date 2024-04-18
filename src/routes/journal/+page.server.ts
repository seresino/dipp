import db from "$lib/server/db";
import { dailyTasks } from "$lib/server/schema";
import { dayData } from "$lib/server/schema";
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
	const startDate = user[0].start_date;

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	const userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)));

	// redirects to day page if user goes straight to /journal without daily task entry in table
	// or if meditation task hasn't been completed (won't trigger for non-mediation group as they'll have NULL)
	// or mood questionaire task hasn't been completed
	if (
		userTasksQuery.length === 0 ||
		userTasksQuery[0].meditation === false ||
		!userTasksQuery[0].mood_id
	) {
		throw redirect(302, "/day");
	}

	const dayDataQuery = await db
		.select()
		.from(dayData)
		.where(eq(dayData.id, getDay(startDate)));
	return {
		user: user,
		dayData: dayDataQuery[0],
		userTasks: userTasksQuery[0],
	};
};
