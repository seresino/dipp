import db from "$lib/server/db";
import { modules } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";

import {
	getDay,
	getModuleID,
	getDefaultRedirect,
} from "$lib/utils/helperFunctions";

const day = getDay();
const moduleID = getModuleID();

export const load = async ({ locals }) => {
	const user = locals.user;

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	// Load in module name
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	console.log(user);
	return {
		// user: userQuery[0],
		user: user,
		module: moduleQuery[0],
		day: day,
	};
};
