import db from "$lib/server/db";
import { modules, tasks, weeklyTasks } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { redirect } from "@sveltejs/kit";
import {
	getModuleID,
	getUserID,
} from "$lib/utils/helperFunctions";

const loggedInUserID = getUserID();
const moduleID = getModuleID();

async function fetchWeeklyTasksQuery(taskID: string): Promise<any[]> {
	return await db
			.select()
			.from(weeklyTasks)
			.where(
				and(
					eq(weeklyTasks.user_id, loggedInUserID),
					eq(weeklyTasks.task_id, taskID)
				)
			);
}

function createNewEntry(timestamp: Date, taskID: string): Record<string, unknown> {
	return {
			start_timestamp: timestamp,
			task_id: taskID,
			user_id: loggedInUserID,
	};
}

export const actions = {
	add: async ({ request }) => {
		// Get the form data from the request
		const formData = await request.formData();

		// Get the task_id from the form data
		let taskID = formData.get("taskID");
		let timestamp = new Date();

		let weeklyTasksQuery = await fetchWeeklyTasksQuery(taskID);

    if (weeklyTasksQuery.length === 0) {
      const entry = createNewEntry(timestamp, taskID);
      weeklyTasksQuery = await db.insert(weeklyTasks).values(entry).returning();
    }
		throw redirect(303, `module?view=tasks-${taskID}`);
	},
	update: async ({ request }) => {
		// Get the form data from the request
		const formData = await request.formData();

		// Get the timestamp and taskID from the form data
		let timestamp = new Date();
		let taskID = formData.get("taskID");

		let weeklyTasksQuery = await fetchWeeklyTasksQuery(taskID);

    if (weeklyTasksQuery.length === 0) {
      const entry = createNewEntry(timestamp, taskID);
      weeklyTasksQuery = await db.insert(weeklyTasks).values(entry).returning();
    } else {
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
