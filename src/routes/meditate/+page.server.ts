import db from "$lib/server/db";
import { dailyTasks, modules } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { users } from "$lib/server/schema";

import {
	getDay,
	getModuleID,
	getUserID,
	getTodaysDate,
} from "$lib/utils/helperFunctions";

const loggedInUserID = getUserID();
const day = getDay();
const moduleID = getModuleID();

export const actions = {
  update: async ({ request }) => {
    // Get the form data from the request
		const formData = await request.formData();

    // Get the question answer from the form data
		let meditation = formData.get("meditated");
    console.log("meditation status given to server: " + meditation);

		if (!meditation) {
      return fail(400, { message: "Error submitting meditation data" });
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
		console.log("today's task: " + userTasksQuery[0])

		await db
			.update(dailyTasks)
			.set({
        meditation: meditation,
      })
			.where(eq(dailyTasks.id, userTasksQuery[0].id));

		return { message: "Questionnaire updated successfully" };
	},
};



export const load = async () => {
	// Load in module name
	// Load in daily-task entry for that user for today
	const userQuery = await db
		.select()
		.from(users)
		.where(eq(users.id, loggedInUserID));

	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, loggedInUserID),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);
	console.log("today's task in load fn: " + userTasksQuery[0])

	// Check if userTasksQuery is empty or not (if it is create new task)
	if (userTasksQuery.length === 0) {
		// Create new task
		await db.insert(dailyTasks).values({
			user_id: loggedInUserID,
			date: getTodaysDate().toISOString(),
			mood_id: null,
			day_number: day,
		});
		// Refresh userTasksQuery
		userTasksQuery = await db
				.select()
				.from(dailyTasks)
				.where(
						and(
								eq(dailyTasks.user_id, loggedInUserID),
								eq(dailyTasks.date, getTodaysDate().toISOString())
						)
				);
	}

  console.log("data returned from load fn: " + userQuery[0] + " " + userTasksQuery[0] + " " + moduleQuery[0])
	return {
		user: userQuery[0],
    module: moduleQuery[0],
		userTasks: userTasksQuery[0],
		day: day,
	};
};
