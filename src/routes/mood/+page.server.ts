import db from "$lib/server/db";
import { dailyTasks, mood } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { fail } from "@sveltejs/kit";
import { getUserID } from "$lib/utils/helperFunctions";

const loggedInUserID = getUserID();

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
		// if (!answers || answers.length !== 9) {
    //   return fail(400, { message: "Error submitting questionnaire" });
    // }

    // Finally, add entry to the database
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
			.where(eq(mood.id, 1));

		return { message: "Questionnaire updated successfully" };
	},
};
