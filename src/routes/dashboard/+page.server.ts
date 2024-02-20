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

export const load = async ({ locals }) => {
	const user = locals.user;
	const userID = user[0].id;
	const startDate = user[0].start_date;
	const moduleID = getModuleID(startDate);

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	// Load in module name
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	const userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(eq(dailyTasks.user_id, userID));

	let daysCompleted = [];
	userTasksQuery.forEach((day) => {
		daysCompleted.push(day.day_number);
	});

	const today = new Date();
	today.setHours(0, 0, 0, 0);
	// Format the day and month separately
	const dayFormatter = new Intl.DateTimeFormat(undefined, { day: "numeric" });
	const monthFormatter = new Intl.DateTimeFormat(undefined, {
		month: "short",
	});
	const dateDay = dayFormatter.format(today);
	const dateMonth = monthFormatter.format(today);

	console.log(user);
	return {
		// user: userQuery[0],
		user: user,
		day: getDay(startDate),
		dateDay: dateDay,
		dateMonth: dateMonth,
		module: moduleQuery[0],
		daysCompleted: daysCompleted,
	};
};
