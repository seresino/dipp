import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

// Would acc import these in from somewhere else
const loggedInUserID = 3;
const startDate = new Date("2024-01-18");

function daysSince(date) {
	// Calculate the time difference in milliseconds
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	const differenceInMilliseconds = today.getTime() - date.getTime();

	// Convert milliseconds to days
	const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

	return differenceInDays;
}

const day = daysSince(startDate) + 1;
const moduleID = Math.floor((day - 1) / 7) + 1;

export const actions = {};

// // Date Segments
// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
// const day = currentDate.getDate().toString().padStart(2, '0');

// const formattedDate = `${year}-${month}-${day}`;
// const formattedDate2 = currentDate.toLocaleDateString()

//   // Need a default logged in user
//   // Set a start date
//   // See how many days off from it are we
//   //
//   // Use that to calculate module id - divide by 7
//   // Set Day
//   // Set Module Name
//   // get jorunal entry for user for today
//   // if no entry, only meditate is clickable
//   // if medidate == true, mood unlocked
//   // if mood is not null, journal unlocked
//   // fill in progress bar based on whether all these are complete too

export const load = async () => {
	// Load in module name
	// Load in daily-task entry for that user for today
	const moduleQuery = await db
		.select()
		.from(modules)
		.where(eq(modules.id, moduleID));

	const userTasksQuery = await db.select().from(dailyTasks).where(
		eq(dailyTasks.user_id, loggedInUserID)
		// eq(dailyTasks.date, loggedInUserID),
	); //and day is equal to today

	return {
		userTasks: userTasksQuery[0],
		module: moduleQuery[0],
		day: day,
	};
};

// export const load = async () => {
// 	return {
// 		users: await db.select().from(users).orderBy(desc(users.id)),
// 	};
// };

// const loggedInUser = db
// 	.select()
// 	.from(users)
// 	.where(eq(users.id, loggedInUserID));
