import db from "$lib/server/db";
import { dailyTasks, modules } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";

import {
	getModuleID,
	getUserID,
	getTodaysDate,
} from "$lib/utils/helperFunctions";

const loggedInUserID = getUserID();
const moduleID = getModuleID();

export const actions = {
  update: async ({ request }) => {
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
			and(
				eq(dailyTasks.user_id, loggedInUserID),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

		await db
			.update(dailyTasks)
			.set({
        meditation: meditation,
      })
			.where(eq(dailyTasks.id, userTasksQuery[0].id));
	},
};

export const load = async () => {
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, loggedInUserID),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

	return {
    userTasks: userTasksQuery,
		module: moduleQuery[0],
	};
};
