import { eq, and } from "drizzle-orm";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { redirect } from "@sveltejs/kit";

import {
	getDay,
	getModuleID,
	getTodaysDate,
	getDefaultRedirect,
} from "$lib/utils/helperFunctions";

export const load = async ({ locals }) => {
	const user = locals.user;
	const userID = user[0].id;
	const startDate = user[0].start_date;
	const today = getTodaysDate().toISOString();
	const day = getDay(startDate);
	const moduleID = getModuleID(startDate);

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)));

	console.log("Adding daily entry");
	if (userTasksQuery.length === 0) {
		let entry = {
			day_number: day,
			date: today,
			user_id: userID,
		};

		// Set meditation to false instead of null if in meditation group
		console.log("Med Value:", user[0].meditation);
		if (user[0].meditation) {
			entry["meditation"] = false;
		}

		userTasksQuery = await db.insert(dailyTasks).values(entry).returning();
	}
	console.log("Daily entry added");

	return {
		title: 'Day '+ day,
		user: user,
		userTasks: userTasksQuery[0],
		module: moduleQuery[0],
		day: day,
	};
};
