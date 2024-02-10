import db from "$lib/server/db";
import { dailyTasks, mood } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { redirect, fail } from "@sveltejs/kit";
import { users } from "$lib/server/schema";

import { getTodaysDate } from "$lib/utils/helperFunctions";
import { getDefaultRedirect } from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();

export const actions = {
	update: async ({ request, locals }) => {
		const userID = locals.user[0].id;
		// Get the form data from the request
		const formData = await request.formData();

		// Get the question answers from the form data
		let answers = formData.get("answers[]");
		answers = answers.split(" ,");

		// Update message if array is empty/null or has less than 9 elements
		if (!answers || answers.length !== 9) {
			return fail(400, { message: "Error submitting questionnaire" });
		}

		let userTasksQuery = await db
			.select()
			.from(dailyTasks)
			.where(
				and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today))
			);

		let updateFields = {};
		for (let i = 0; i < 9; i++) {
			updateFields["q" + (i + 1)] = answers[i];
		}
		// create new mood entry with answers from form
		let moodQuery = await db.insert(mood).values(updateFields).returning();
		// update dailyTasks entry for today with corresponding mood id
		await db
			.update(dailyTasks)
			.set({ mood_id: moodQuery[0].id })
			.where(eq(dailyTasks.id, userTasksQuery[0].id));
	},
};

export const load = async ({ locals }) => {
	const user = locals.user;
	const userID = user[0].id;

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)));

	// Check if userTasksQuery[0].mood_id is null or not
	let moodQuery = [];
	if (userTasksQuery.length !== 0) {
		if (userTasksQuery[0].mood_id !== null) {
			// find the mood entry for today
			moodQuery = await db
				.select()
				.from(mood)
				.where(eq(mood.id, userTasksQuery[0].mood_id));
		}
	}

	return {
		user: user,
		userTasks: userTasksQuery,
		mood: moodQuery[0],
	};
};
