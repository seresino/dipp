import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import { authStore, getUserID } from "$lib/utils/helperFunctions";
import { validatePassword } from "firebase/auth";

let userID;
userID = getUserID();

export const load = async () => {
	const userQuery = await db.select().from(users).where(eq(users.id, userID));

	console.log("userQuery return: " + userQuery[0]);
	return {
		user: userQuery[0],
		// Should load the day in here too ----------------------------------------------------------------
	};
};
