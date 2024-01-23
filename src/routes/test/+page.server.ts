import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { journalPrompts } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { fail } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";

const insertUser = async (username: string, password: string) => {
	return db.insert(users).values({
		username: username,
		password: password,
		meditation: false,
		high_dosage: false,
	});
};

const insertPrompt = async (content: string) => {
	return db.insert(journalPrompts).values({
		content: content,
	});
};

export const actions = {
	add: async ({ request }) => {
		// Get the form data from the request
		const formData = await request.formData();

		// Get the username from the form data
		const username = formData.get("username");

		// Update message if username empty
		if (!username) {
			return fail(400, { message: "Title is required" });
		}

		// Finally, add entry to the database
		await db.insert(users).values({
			username: username,
			password: "pass",
			high_dosage: true,
		});

		return { message: "User added successfully" };
	},

	update: async ({ request }) => {
		const formData = await request.formData();
		const username = formData.get("username")?.toString();
		const password = formData.get("password")?.toString();
		const meditation = formData.get("meditation")?.toString();
		const high_dosage = formData.get("high_dosage")?.toString();
		const id = formData.get("id")?.toString();

		if (!username || !password || !id) {
			return fail(400, { message: "Error updating user" });
		}

		await db
			.update(users)
			.set({
				username,
				password,
				meditation: !!meditation,
				high_dosage: !!high_dosage,
			})
			.where(eq(users.id, +id));

		return { message: "User updated successfully" };
	},

	delete: async ({ request }) => {
		const formData = await request.formData();
		const id = formData.get("id")?.toString();

		if (!id) {
			return fail(400, { message: "Error deleting user" });
		}

		await db.delete(users).where(eq(users.id, +id));
		return { message: "User deleted successfully" };
	},

	seed: async ({}) => {
		await db.delete(users);
		await db.delete(journalPrompts);
		// await db.query(`ALTER SEQUENCE journal_prompts_id_seq RESTART WITH 1;`);

		for (let i = 1; i <= 10; i++) {
			const username = `user${i}`;
			await insertUser(username, "pass");
		}

		// const prompts = [
		// 	"Prompt 1",
		// 	"Prompt 2",
		// 	"Prompt 3",
		// 	"Prompt 4",
		// 	"Prompt 5",
		// ];

		// for (const prompt of prompts) {
		// 	await insertPrompt(prompt);
		// }

		const journalPromptsData = [
			{
				title: "Day 1 Initial Impressions",
				prompt: "Reflect on how you feel about your upcoming psychedelic journey.",
			},
			{
				title: "Day 2 Emotional Preparedness",
				prompt: "What are your expectations about the emotional depth of your upcoming psychedelic experience?",
			},
			{
				title: "Day 3 Exploring Your Reasons",
				prompt: "Why are you drawn to having this psychedelic experience at this time? Explore your motivations.",
			},
			{
				title: "Day 4 Insights from Research",
				prompt: "Reflect on the information you've gathered about the effects of psychedelics. What were the most important learning points for you?",
			},
			{
				title: "Day 5 Past Experiences and Influence",
				prompt: "Consider how your previous life experiences might shape this psychedelic journey.",
			},
			{
				title: "Day 6 Embracing the Unknown",
				prompt: "How do you feel about the unpredictable aspects of psychedelic experiences?",
			},
			{
				title: "Day 7 Therapeutic Insights",
				prompt: "Have you had emotionally significant and supportive conversations about the upcoming experience? What insights did you gain from these conversations?",
			},
			{
				title: "Day 8 Openness to the Journey",
				prompt: "How have you opened yourself to accepting whatever happens during the psychedelic experience?",
			},
			{
				title: "Day 9 Navigating Challenges",
				prompt: "Think about how you might deal with difficult moments during your upcoming psychedelic experience.",
			},
			{
				title: "Day 10 Ready to Let Go",
				prompt: "Reflect on your readiness to surrender to the psychedelic experience.",
			},
			{
				title: "Day 11 Psychological Readiness",
				prompt: "Describe the steps you're taking to mentally prepare for your psychedelic experience.",
			},
			{
				title: "Day 12 Physical Preparedness",
				prompt: "Describe your thoughts and feelings about how psilocybin might physically affect you during the experience, focusing on sensations, comfort, and any expected bodily changes.",
			},
			{
				title: "Day 13 Trust and Connection",
				prompt: "How are you building trust and connection with those who will be with you during the experience?",
			},
			{
				title: "Day 14 Safety and Trust",
				prompt: "Reflect on your knowledge and confidence in the safety of the substance and the environment.",
			},
			{
				title: "Day 15 Trusting Yourself",
				prompt: "Describe the things about you that give you confidence in your ability to navigate this experience?",
			},
			{
				title: "Day 16 Anticipating Change",
				prompt: "What changes do you anticipate this experience might bring in you?",
			},
			{
				title: "Day 17 Preparatory Practices",
				prompt: "Describe your experiences with preparatory practices like meditation, yoga, or journaling.",
			},
			{
				title: "Day 18 Planning Post-Experience",
				prompt: "Reflect on your plans and support system for after the psychedelic experience.",
			},
			{
				title: "Day 19 Developing Coping Strategies",
				prompt: "Reflect on the strategies you might use to manage challenging moments during the experience.",
			},
			{
				title: "Day 20 Involving Loved Ones",
				prompt: "How have you engaged or informed your family and friends about this journey?",
			},
			{
				title: "Day 21 Final Intentions",
				prompt: "Reflect on your past 20 days of journaling to define your clear, final intention for the psychedelic experience.",
			},
		];

		for (const promptData of journalPromptsData) {
			await db.insert(journalPrompts).values(promptData);
		}

		const moduleDataArray = [
			{
				name: "Module 1: Knowledge and expectation",
				instructions: "Instructions 1",
				tasks: "Tasks 1",
				audio: "Audio 1",
			},
			{
				name: "Module 2: Psycho-physical readiness",
				instructions: "Instructions 2",
				tasks: "Tasks 2",
				audio: "Audio 2",
			},
			{
				name: "Module 3: Safety planning",
				instructions: "Instructions 3",
				tasks: "Tasks 3",
				audio: "Audio 3",
			},
		];

		await db.insert(modules).values(moduleDataArray);

		const moodData = [
			{
				q1: 3,
				q2: 4,
				q3: 2,
				q4: 5,
				q5: 1,
				q6: 3,
				q7: 4,
				q8: "2,3",
				q9: 4,
			},
			{
				q1: 2,
				q2: 3,
				q3: 1,
				q4: 4,
				q5: 5,
				q6: 2,
				q7: 3,
				q8: "4,1",
				q9: 2,
			},
			{
				q1: 4,
				q2: 5,
				q3: 3,
				q4: 2,
				q5: 1,
				q6: 4,
				q7: 5,
				q8: "1,5",
				q9: 3,
			},
			{
				q1: 1,
				q2: 4,
				q3: 5,
				q4: 3,
				q5: 2,
				q6: 1,
				q7: 2,
				q8: "5,2",
				q9: 5,
			},
			{
				q1: 3,
				q2: 2,
				q3: 4,
				q4: 1,
				q5: 5,
				q6: 3,
				q7: 4,
				q8: "3,4",
				q9: 1,
			},
			{
				q1: 5,
				q2: 1,
				q3: 3,
				q4: 4,
				q5: 2,
				q6: 5,
				q7: 1,
				q8: "2,2",
				q9: 4,
			},
			{
				q1: 2,
				q2: 3,
				q3: 1,
				q4: 4,
				q5: 5,
				q6: 2,
				q7: 3,
				q8: "4,1",
				q9: 2,
			},
			{
				q1: 4,
				q2: 5,
				q3: 3,
				q4: 2,
				q5: 1,
				q6: 4,
				q7: 5,
				q8: "1,5",
				q9: 3,
			},
			{
				q1: 1,
				q2: 4,
				q3: 5,
				q4: 3,
				q5: 2,
				q6: 1,
				q7: 2,
				q8: "5,2",
				q9: 5,
			},
			{
				q1: 3,
				q2: 2,
				q3: 4,
				q4: 1,
				q5: 5,
				q6: 3,
				q7: 4,
				q8: "3,4",
				q9: 1,
			},
		];

		await db.insert(mood).values(moodData);

		const dailyData = [
			{
				day_number: 3,
				date: "2024-01-18",
				user_id: 1,
				journal: "Reflecting on the day's events.",
				meditation: true,
				mood_id: 5,
			},
			{
				day_number: 2,
				date: "2024-01-19",
				user_id: 2,
				journal: "Gratitude journaling.",
				meditation: false,
				mood_id: 8,
			},
			{
				day_number: 4,
				date: "2024-01-20",
				user_id: 3,
				journal: "Deep introspection today.",
				meditation: true,
				mood_id: 2,
			},
			{
				day_number: 1,
				date: "2024-01-21",
				user_id: 4,
				journal: "Enjoyed a peaceful meditation session.",
				meditation: true,
				mood_id: 6,
			},
			{
				day_number: 5,
				date: "2024-01-22",
				user_id: 5,
				journal: "Feeling energized and focused.",
				meditation: false,
				mood_id: 3,
			},
			// ... (add the rest of your data)
			{
				day_number: 3,
				date: "2024-02-01",
				user_id: 6,
				journal: "Reflecting on personal growth.",
				meditation: false,
				mood_id: 9,
			},
			{
				day_number: 2,
				date: "2024-02-02",
				user_id: 7,
				journal: "Mindful moments throughout the day.",
				meditation: true,
				mood_id: 4,
			},
			{
				day_number: 4,
				date: "2024-02-03",
				user_id: 8,
				journal: "Challenging but productive day.",
				meditation: true,
				mood_id: 7,
			},
			{
				day_number: 1,
				date: "2024-02-04",
				user_id: 9,
				journal: "Grateful for positive interactions.",
				meditation: false,
				mood_id: 1,
			},
			{
				day_number: 5,
				date: "2024-02-05",
				user_id: 10,
				journal: "Finding joy in small moments.",
				meditation: true,
				mood_id: 10,
			},
		];

		// Use this seedData array as needed in your application.
		await db.insert(dailyTasks).values(dailyData);
	},
};

export const load = async () => {
	return {
		users: await db.select().from(users).orderBy(desc(users.id)),
	};
};
