import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { dayData } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { tasks } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { weeklyTasks } from "$lib/server/schema";

export async function seed() {
	// Clear existing data
	await db.delete(users);
	await db.delete(dayData);
	await db.delete(modules);

	// Dev start date
	const startDate = new Date("2024-04-01").toDateString();

	const usersData = [
		{
			id: 0,
			username: "ADMIN",
			start_date: startDate,
			meditation: false,
			high_dosage: false,
		},
	];
	await db.insert(users).values(usersData);

	await db.insert(dayData).values([
		{
			id: 1,
			title: "Initial Feelings",
			prompt: "Reflect on your initial feelings about your upcoming psychedelic experience.",
			audio: "meditation-1.mp3",
		},
		{
			id: 2,
			title: "Motivations",
			prompt: "Explore your motivations for choosing to have this psychedelic experience at this time.",
			audio: "meditation-2.mp3",
		},
		{
			id: 3,
			title: "Emotional Expectations",
			prompt: "What expectations do you have about the emotional depth of your upcoming experience?",
			audio: "meditation-3.mp3",
		},
		{
			id: 4,
			title: "Life Influence",
			prompt: "Consider how your past life experiences might influence this psychedelic journey.",
			audio: "meditation-4.mp3",
		},
		{
			id: 5,
			title: "Psychedelic Understanding",
			prompt: "Describe your current understanding of the effects of psychedelics. What aspects intrigue you most?",
			audio: "meditation-5.mp3",
		},
		{
			id: 6,
			title: "Physical Effects",
			prompt: "Reflect on your thoughts about how psilocybin might physically affect you during the experience.",
			audio: "meditation-6.mp3",
		},
		{
			id: 7,
			title: "Unpredictability",
			prompt: "How do you feel about the unpredictable nature of psychedelic experiences?",
			audio: "meditation-7.mp3",
		},
		{
			id: 8,
			title: "Safety Knowledge",
			prompt: "Assess your current knowledge about the safety of the substance and the environment for your experience.",
			audio: "meditation-8.mp3",
		},
		{
			id: 9,
			title: "Personal Strengths",
			prompt: "What personal strengths do you believe will help you navigate this experience?",
			audio: "meditation-9.mp3",
		},
		{
			id: 10,
			title: "Mindfulness Practices",
			prompt: "Describe any meditation, yoga, or mindfulness practices you've been exploring in preparation.",
			audio: "meditation-10.mp3",
		},
		{
			id: 11,
			title: "Journaling Reflection",
			prompt: "Reflect on your journaling experience so far. How has it contributed to your preparation?",
			audio: "meditation-11.mp3",
		},
		{
			id: 12,
			title: "Mental Preparation",
			prompt: "What specific steps are you taking to mentally prepare for your psychedelic experience?",
			audio: "meditation-12.mp3",
		},
		{
			id: 13,
			title: "Building Trust",
			prompt: "How are you building trust with those who will be present during your experience?",
			audio: "meditation-13.mp3",
		},
		{
			id: 14,
			title: "Insightful Conversations",
			prompt: "Describe any significant conversations you've had about your upcoming experience. What insights did you gain?",
			audio: "meditation-14.mp3",
		},
		{
			id: 15,
			title: "Involving Others",
			prompt: "How have you involved your close friends or family in your preparation process?",
			audio: "meditation-15.mp3",
		},
		{
			id: 16,
			title: "Openness",
			prompt: "Reflect on your current level of openness to whatever may unfold during the experience.",
			audio: "meditation-16.mp3",
		},
		{
			id: 17,
			title: "Surrender",
			prompt: "Explore your thoughts on the concept of 'surrender' in the context of your upcoming experience.",
			audio: "meditation-17.mp3",
		},
		{
			id: 18,
			title: "Challenging Moments",
			prompt: "What strategies are you considering for managing potentially challenging moments?",
			audio: "meditation-18.mp3",
		},
		{
			id: 19,
			title: "Grounding Plan",
			prompt: "How do you plan to ground yourself if you feel overwhelmed during the experience?",
			audio: "meditation-19.mp3",
		},
		{
			id: 20,
			title: "Desired Insights",
			prompt: "What potential changes or insights are you hoping this experience might bring?",
			audio: "meditation-20.mp3",
		},
		{
			id: 21,
			title: "Final Intention",
			prompt: "Based on your journey of preparation, reflect on your final intention for the psychedelic experience.",
			audio: "meditation-21.mp3",
		},
	]);

	const modulesData = [
		{
			id: 1,
			name: "Knowledge and Expectation",
			description: `Welcome to Module 1 of the DIPP course. This module, titled "Knowledge and Expectation," is designed to help build a foundational understanding of psilocybin, its effects, and how to navigate the experience so you get the most out of it. You will be equipped with essential information to set realistic expectations and prepare mentally for your journey.
			
			This module consists of one reading task for you to complete in your own time this week.`,
		},
		{
			id: 2,
			name: "Psycho-Physical Readiness",
			description: `In this module called ‘Psychophysical-Readiness’, we introduce two grounding techniques that you might find useful before, during and after your psychedelic experience: the 4-6 Breathing Technique and the use of Simple Mantras. These practices are designed to help you maintain a sense of calm and presence, especially during moments that might feel challenging or overwhelming. You can try these out in your own time to see if they resonate with you.
			This module consists of two tasks for you to complete in your own time this week:
			1.	4-6 Breathing Technique (15 minutes)
			2.	Simple Mantra Affirmation Technique (15 minutes)`,
		},
		{
			id: 3,
			name: "Safety Planning",
			description: `In Module 3, titled "Safety-Planning," our focus shifts to creating a secure and supportive environment for your psychedelic session. This module is designed to emphasise the importance of safety, trust, and preparedness, both during and after your psychedelic experience.
			This module consists of two tasks for you to complete in your own time this week:
			1.	Developing Coping Strategies (30 min)
			2.	Planning Integration (30 min)
			`,
		},
	];

	await db.insert(modules).values(modulesData);
}
