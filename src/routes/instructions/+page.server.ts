import db from "$lib/server/db";
import { modules } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import { getDay, getModuleID } from "$lib/utils/helperFunctions";

// Would acc import these in from somewhere else --------------------------------
const loggedInUserID = 2;

export const load = async () => {
	// Load in module name
	// Load in daily-task entry for that user for today
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	return {
		module: moduleQuery[0],
	};
};
