import db from "$lib/server/db";
import { dailyTasks, modules, dayData } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { getDefaultRedirect } from "$lib/utils/helperFunctions";
import { getDay, getModuleID, getTodaysDate } from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();


export const load = async ({ locals }) => {
	const user = locals.user;
	const userID = user[0].id;
	const startDate = user[0].start_date;
	const moduleID = getModuleID(startDate);

	// redirect user if not logged in
	if (!user) {
		throw redirect(302, getDefaultRedirect());
	}

	const dayDataQuery = await db
		.select()
		.from(dayData)
		.where(eq(dayData.id, getDay(startDate)));

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

	console.log(dayDataQuery[0].audio);

	let title = 'Meditation';
	let file = dayDataQuery[0].audio;

	if (!Boolean(user[0].meditation)) {
		title = 'Music';
		file = dayDataQuery[0].control;
	}

	return {
		title: title,
		user: user,
		file: file,
		meditated: userTasksQuery[0].meditation
	};
};
