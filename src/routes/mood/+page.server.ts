import db from "$lib/server/db";
import { dailyTasks, mood } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { redirect, fail } from "@sveltejs/kit";
import { users } from "$lib/server/schema";

import {
	getDay,
	getUserID,
	getTodaysDate,
} from "$lib/utils/helperFunctions";

const loggedInUserID = getUserID();
const day = getDay();

export const actions = {
	add: async () => {
		// Add blank entry to the database
		await db.insert(mood).values({}).returning();
	},
	update: async ({ request }) => {
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
				and(
					eq(dailyTasks.user_id, loggedInUserID),
					eq(dailyTasks.date, getTodaysDate().toISOString())
				)
			);

		let updateFields = {};
		for (let i = 0; i < 9; i++) {
				updateFields['q' + (i + 1)] = answers[i];
		}
		await db
			.update(mood)
			.set(updateFields)
			.where(eq(mood.id, userTasksQuery[0].mood_id));

	},
};

export const load = async () => {
	const userQuery = await db
		.select()
		.from(users)
		.where(eq(users.id, loggedInUserID));

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, loggedInUserID),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

	// if (userTasksQuery.length === 0) {
	// 	// Create new task
	// 	await db.insert(dailyTasks).values({
	// 		user_id: loggedInUserID,
	// 		date: getTodaysDate().toISOString(),
	// 		mood_id: null,
	// 		day_number: day,
	// 	});
	// 	// Refresh userTasksQuery
	// 	userTasksQuery = await db
	// 		.select()
	// 		.from(dailyTasks)
	// 		.where(
	// 			and(
	// 				eq(dailyTasks.user_id, loggedInUserID),
	// 				eq(dailyTasks.date, getTodaysDate().toISOString())
	// 			)
	// 		);
	// }

	// Check if userTasksQuery[0].mood_id is null or not
	let moodQuery = [];
	if (userTasksQuery.length !== 0) {
		if (userTasksQuery[0].mood_id === null) {
			// Create a new mood entry for today
			moodQuery = await db.insert(mood).values({}).returning();
			// Update userTasksQuery[0].mood_id
			await db
				.update(dailyTasks)
				.set({ mood_id: moodQuery[0].id })
				.where(eq(dailyTasks.id, userTasksQuery[0].id));
		} else {
			// find the mood entry for today
			moodQuery = await db
				.select()
				.from(mood)
				.where(eq(mood.id, userTasksQuery[0].mood_id));
		}
	}

	return {
		userTasks: userTasksQuery,
		mood: moodQuery[0],
	};
};
