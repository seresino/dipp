import db from "$lib/server/db";
import { dailyTasks, modules } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { getDefaultRedirect } from "$lib/utils/helperFunctions";
import { getModuleID, getTodaysDate } from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();
const moduleID = getModuleID();

export const actions = {
	update: async ({ request, locals }) => {
		const userID = locals.user[0].id;
		// Get the form data from the request
		const formData = await request.formData();

		// Get the meditation status from the form data
		let meditation = formData.get("meditated");

		if (!meditation) {
			return fail(400, { message: "Error submitting meditation data" });
		}

		let userTasksQuery = await db
			.select()
			.from(dailyTasks)
			.where(
				and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today))
			);

		await db
			.update(dailyTasks)
			.set({
				meditation: meditation,
			})
			.where(eq(dailyTasks.id, userTasksQuery[0].id));
	},
};

export const load = async ({ locals }) => {
	const user = locals.user;
	const userID = user[0].id;

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today)));

	// redirects to day page if user goes straight to /meditate without daily task entry in table
	if (userTasksQuery.length === 0) {
		throw redirect(302, "/day");
	}

	return {
		user: user,
		module: moduleQuery[0],
	};
};
