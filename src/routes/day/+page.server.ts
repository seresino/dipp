import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { desc, eq, and } from "drizzle-orm";

import {
	getDay,
	getModuleID,
	getUserID,
	getTodaysDate,
} from "$lib/utils/helperFunctions";

// Would acc import these in from somewhere else --------------------------------
const loggedInUserID = getUserID();

const day = getDay();
const moduleID = getModuleID();

export const load = async () => {
	// Load in module name
	// Load in daily-task entry for that user for today
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	const userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, loggedInUserID),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

	return {
		userTasks: userTasksQuery[0],
		module: moduleQuery[0],
		day: day,
	};
};
