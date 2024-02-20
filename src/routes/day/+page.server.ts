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

const moduleID = getModuleID();

export const load = async ({ locals }) => {
	const user = locals.user;
	const userID = user[0].id;
	const startDate = user[0].start_date;
	const today = getTodaysDate().toISOString();
	const day = getDay(startDate);

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

	if (userTasksQuery.length === 0) {
		const entry = {
			day_number: day,
			date: today,
			user_id: userID,
		};
		userTasksQuery = await db.insert(dailyTasks).values(entry).returning();
	}

	return {
		user: user,
		userTasks: userTasksQuery[0],
		module: moduleQuery[0],
		day: day,
	};
};
