import db from "$lib/server/db";
import { users, modules, tasks, weeklyTasks } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail, redirect } from "@sveltejs/kit";
import {
	getDay,
	getModuleID,
	getUserID,
	getTodaysDate,
} from "$lib/utils/helperFunctions";

const loggedInUserID = getUserID();
const moduleID = getModuleID();

export const actions = {
	add: async ({ request }) => {
		// Get the form data from the request
		const formData = await request.formData();

		// Get the timestamp and task_id from the form data
		// let timestamp = formData.get("timestamp");
		let timestamp = new Date();
		let taskID = formData.get("taskID");

		console.log("timestamp given to add fn in server: " + timestamp);
		console.log("taskID given to add fn in server: " + taskID);

		let weeklyTasksQuery = await db
		.select()
		.from(weeklyTasks)
		.where(
			and(
				eq(weeklyTasks.user_id, loggedInUserID),
				eq(weeklyTasks.task_id, taskID)
			)
		);

		if (weeklyTasksQuery.length === 0) {
			const entry = {
				start_timestamp: timestamp,
				task_id: taskID,
				user_id: loggedInUserID,
			};
			weeklyTasksQuery = await db.insert(weeklyTasks).values(entry).returning();
		}
		throw redirect(303, `module?view=tasks-${taskID}`);
	},
	update: async ({ request }) => {
		// Get the form data from the request
		const formData = await request.formData();

		// Get the timestamp and taskID from the form data
		// let timestamp = formData.get("timestamp");
		let timestamp = new Date();
		let taskID = formData.get("taskID");

		console.log("timestamp given to update fn in server: " + timestamp);
		console.log("taskID given to update fn in server: " + taskID);

		let weeklyTasksQuery = await db
		.select()
		.from(weeklyTasks)
		.where(
			and(
				eq(weeklyTasks.user_id, loggedInUserID),
				eq(weeklyTasks.task_id, taskID)
			)
		);

		if (weeklyTasksQuery.length === 0) {
			const entry = {
				start_timestamp: timestamp,
				complete_timestamp: timestamp,
				task_id: taskID,
				user_id: loggedInUserID,
			};
			weeklyTasksQuery = await db.insert(weeklyTasks).values(entry).returning();
		}
		else {
      weeklyTasksQuery = await db
        .update(weeklyTasks)
        .set({complete_timestamp: timestamp,})
        .where(
          and(
            eq(weeklyTasks.user_id, loggedInUserID),
            eq(weeklyTasks.task_id, taskID)
          )
        );
    }
		throw redirect(303, `module?view=tasks-${taskID}`);
	}
};

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

	const weeklyTasksQuery = await db
	  .select()
		.from(weeklyTasks)
		.where(
			and(
				eq(weeklyTasks.user_id, loggedInUserID)
			)
		);
	return {
		module: moduleQuery[0],
		tasks: tasksQuery,
		weeklyTasks: weeklyTasksQuery,
	};
};
