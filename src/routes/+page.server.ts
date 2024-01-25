import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import { authStore } from "$lib/utils/helperFunctions";

let username;
let userID;

// async function getUserIDByUsername(username) {
// 	const userQuery = await db
// 		.select()
// 		.from(users)
// 		.where(eq(users.username, username));
// 	return userQuery[0].id;
// }

authStore.subscribe((value) => {
	userID = value.userID;
	// username = "P1BGSM";
});

export const actions = {};

export const load = async () => {
	// Load in module name
	// Load in daily-task entry for that user for today

	const userQuery = await db
		// .select()
		// .from(users)
		// .where(eq(users.username, username));
		.select()
		.from(users)
		.where(eq(users.id, userID));

	// const userQuery = await db
	// 	.select()
	// 	.from(users)
	// 	.where(eq(users.id, userID));

	return {
		user: userQuery[0],
		// // @ts-ignore
		// ID: userID,
	};
};
