import db from "$lib/server/db";
import { dailyTasks, modules, dayData } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";
import { getDefaultRedirect } from "$lib/utils/helperFunctions";
import { getDay, getModuleID, getTodaysDate } from "$lib/utils/helperFunctions";

const today = getTodaysDate().toISOString();

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