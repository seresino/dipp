import db from "$lib/server/db";
import { dailyTasks, modules, dayData } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { getDefaultRedirect } from "$lib/utils/helperFunctions";
import { getDay, getModuleID, getTodaysDate } from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();

// export const actions = {
// 	update: async ({ request, locals }) => {
// 		const userID = locals.user[0].id;
// 		// Get the form data from the request
// 		const formData = await request.formData();

// 		// Get the meditation status from the form data
// 		let meditation = formData.get("meditated");

// 		if (!meditation) {
// 			return fail(400, { message: "Error submitting meditation data" });
// 		}

// 		let userTasksQuery = await db
// 			.select()
// 			.from(dailyTasks)
// 			.where(
// 				and(eq(dailyTasks.user_id, userID), eq(dailyTasks.date, today))
// 			);

// 		await db
// 			.update(dailyTasks)
// 			.set({
// 				meditation: meditation,
// 			})
// 			.where(eq(dailyTasks.id, userTasksQuery[0].id));
// 	},
// };

export const actions = {
	update: async ({ request, locals }) => {
		try {
			// Log the start of the update function
			console.log("Starting update action");

			// Log local user data
			const userID = locals.user[0].id;
			console.log("User ID:", userID);

			// Retrieve form data and log it
			const formData = await request.formData();
			console.log("Form data received:", formData);

			// Retrieve meditation status and log it
			let meditation = formData.get("meditated");
			console.log("Meditation status:", meditation);

			// Check if meditation data exists and return error if missing
			if (!meditation) {
				console.log("Meditation status missing, returning error");
				return fail(400, {
					message: "Error submitting meditation data",
				});
			}

			// Query the daily tasks for the specific user and log the result
			let userTasksQuery = await db
				.select()
				.from(dailyTasks)
				.where(
					and(
						eq(dailyTasks.user_id, userID),
						eq(dailyTasks.date, today)
					)
				);

			console.log("User tasks query result:", userTasksQuery);

			// Log before updating database
			if (userTasksQuery[0]) {
				console.log(
					"Updating dailyTasks entry with ID:",
					userTasksQuery[0].id
				);

				// Update the meditation status in the dailyTasks table
				await db
					.update(dailyTasks)
					// .set({ meditation: meditation }) // If errors - LLOOK HERE----------------------------------------------------------------
					.set({ meditation: true })
					.where(eq(dailyTasks.id, userTasksQuery[0].id));

				console.log("Meditation status updated successfully");
			} else {
				console.log("No daily tasks entry found for user and date.");
				return fail(404, { message: "No daily tasks found for user" });
			}
		} catch (err) {
			console.error("Error during update action:", err);
			return fail(500, { message: "Internal server error" });
		}
	},
};

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

	if (!user[0].meditation) {
		title = 'Music';
	}

	return {
		title: title,
		user: user,
		file: dayDataQuery[0].audio,
		meditated: userTasksQuery[0].meditation
	};
};
