import db from "$lib/server/db";
import { modules, tasks } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import { getDay, getModuleID } from "$lib/utils/helperFunctions";

const loggedInUserID = 2;
const moduleID = getModuleID();

export const load = async () => {
	// Load in module info
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	const tasksQuery = await db
		.select()
		.from(tasks)
		.where(eq(tasks.module_id, moduleID));

	return {
		module: moduleQuery[0],
		tasks: tasksQuery,
	};
};
