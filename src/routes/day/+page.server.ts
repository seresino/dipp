import { eq, and } from "drizzle-orm";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";

import { getDay, getModuleID, getTodaysDate } from "$lib/utils/helperFunctions";

const day = getDay();
const moduleID = getModuleID();

export const load = async ({ locals }) => {
	const user = locals.user;

	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, user.id),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

	if (userTasksQuery.length === 0) {
		const entry = {
			day_number: day,
			date: getTodaysDate().toISOString(),
			user_id: user.id,
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
