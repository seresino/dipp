import db from "$lib/server/db";
import { modules } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import { getDefaultRedirect } from "$lib/utils/helperFunctions.js";

export const load = async ({ locals }) => {
	const user = locals.user;

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}
	// Load in module name
	// Load in daily-task entry for that user for today
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	return {
		user: user,
		module: moduleQuery[0],
	};
};
