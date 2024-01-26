import db from "$lib/server/db";
import { dailyTasks, mood } from "$lib/server/schema";
import { eq, and } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { users } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { modules } from "$lib/server/schema";

import {
	getDay,
	getModuleID,
	getUserID,
	getTodaysDate,
} from "$lib/utils/helperFunctions";

const loggedInUserID = getUserID();
const day = getDay();
const moduleID = getModuleID();

export const actions = {
  add: async ({ request }) => {
    // Add blank entry to the database
		await db.insert(mood).values({
			q1: null,
			q2: null,
			q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
    });
	},
  update: async ({ request }) => {
    // Get the form data from the request
		const formData = await request.formData();

    // Get the question answer from the form data
		let answers = formData.get("answers[]");
    console.log("answers given to server: " + answers);
    answers = answers.split(" ,");
    console.log(answers[0], answers[1], answers[2], answers[3], answers[4], answers[5], answers[6], answers[7], answers[8], answers[9]);

    // Update message if array is empty/null or has less than 9 elements
		if (!answers || answers.length !== 9) {
      return fail(400, { message: "Error submitting questionnaire" });
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
			.update(mood)
			.set({
        q1: answers[0],
        q2: answers[1],
        q3: answers[2],
        q4: answers[3],
        q5: answers[4],
        q6: answers[5],
        q7: answers[6],
        q8: answers[7],
        q9: answers[8],
			})
			.where(eq(mood.id, userTasksQuery[0].mood_id));

		return { message: "Questionnaire updated successfully" };
	},
};

export const load = async () => {
	// Load in module name
	// Load in daily-task entry for that user for today
	const userQuery = await db
		.select()
		.from(users)
		.where(eq(users.id, loggedInUserID));

	let userTasksQuery = await db
		.select()
		.from(dailyTasks)
		.where(
			and(
				eq(dailyTasks.user_id, loggedInUserID),
				eq(dailyTasks.date, getTodaysDate().toISOString())
			)
		);

  // i need to check here whether userTasksQuery is empty or not and also check if the userTasksQuery[0].mood_id is null or not
  let moodQuery = await db
  .select()
  .from(mood)
  .where(
    and(
      eq(mood.id, userTasksQuery[0].mood_id),
    )
  );
  console.log("today's task: " + userTasksQuery[0])
	if (moodQuery.length === 0) {
    // i don't know if it's a problem with the seed data but this insert method is sometimes causing
    // an error because it will try to insert it where there is already an id in the seed data,
    // if you keep reloading the page, it will eventually find an id number it can take that is free
		moodQuery = await db.insert(mood).values({
			q1: null,
			q2: null,
			q3: null,
      q4: null,
      q5: null,
      q6: null,
      q7: null,
      q8: null,
      q9: null,
    });
	}

	return {
		user: userQuery[0],
		userTasks: userTasksQuery[0],
    mood: moodQuery[0],
		day: day,
	};
};
