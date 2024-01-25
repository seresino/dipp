import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import { authStore } from "$lib/utils/helperFunctions";

let username;
let userID;

authStore.subscribe((value) => {
	console.log("AuthStore Value:" + value);
	for (const prop in value) {
		console.log(`obj.${prop} = ${value[prop]}`);
	}

	userID = value.userID;
	// userID = 2;
	console.log("userID (serverside): " + userID);
});

export const load = async () => {
	const userQuery = await db.select().from(users).where(eq(users.id, userID));

	console.log("userQuery return: " + userQuery[0]);
	return {
		user: userQuery[0],
		// // @ts-ignore
		// ID: userID,
	};
};
