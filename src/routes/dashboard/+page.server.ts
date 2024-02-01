import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { get } from "svelte/store";
import { desc, eq, and } from "drizzle-orm";
import { authStore } from "$lib/utils/helperFunctions";
import { redirect } from "@sveltejs/kit";

import {
	getDay,
	getModuleID,
	getUserID,
	getTodaysDate,
} from "$lib/utils/helperFunctions";

const day = getDay();
const moduleID = getModuleID();

export const load = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, "/");
	}

	let userID;
	userID = await getUserID();
	console.log("USER ID: " + userID);

	const username = "P1BGSM"; // HARDCODED ----------------------------------------------------------------

	// Load in module name
	// Load in daily-task entry for that user for today

	// const userQuery = await db.select().from(users).where(eq(users.id, userID));

	// This will always load user 2
	let userQuery = await db
		.select()
		.from(users)
		.where(eq(users.username, username));
	console.log(userQuery[0]);

	userQuery = await db
		.select()
		.from(users)
		.where(eq(users.username, username)); // USING HARD CODE ----------------------------------------------------------------
	console.log(userQuery[0].username);

	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, userQuery[0].id),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

	return {
		// user: userQuery[0],
		user: locals.user,
		userTasks: userTasksQuery[0],
		module: moduleQuery[0],
		day: day,
		// @ts-ignore
		ID: userID,
	};
};
