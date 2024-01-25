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

import { authStore } from "$lib/utils/helperFunctions";

let username;
let userID;

authStore.subscribe((value) => {
	userID = value.userID;
	username = "P1BGSM";
});

// $: {
// 	authStore.subscribe(async (value) => {
// 		userID = value.userID;
// 		username = "P1BGSM";
// 	});
// }

// let username;
// let userID: number | null;
// $: {
// 	authStore.subscribe(async (value) => {
// 		userID = value.userID;
// 		username = "P1BGSM";
// 	});
// }

// Would acc import these in from somewhere else --------------------------------
const loggedInUserID = getUserID();

const day = getDay();
const moduleID = getModuleID();

// export const load = async () => {
// 	// Load in module name
// 	// Load in daily-task entry for that user for today
// 	if (userID !== null) {
// 		const userQuery = await db
// 			.select()
// 			.from(users)
// 			.where(eq(users.id, userID));
// 		// Rest of your code...
// 	}

export const load = async () => {
	// Load in module name
	// Load in daily-task entry for that user for today

	const userQuery = await db
		.select()
		.from(users)
		.where(eq(users.username, username));

	// const userQuery = await db
	// 	.select()
	// 	.from(users)
	// 	.where(eq(users.username, username));

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
		user: userQuery[0],
		userTasks: userTasksQuery[0],
		module: moduleQuery[0],
		day: day,
		// @ts-ignore
		ID: userID,
	};
};
