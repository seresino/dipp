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
	await db.delete(dailyTasks);
	await db.delete(weeklyTasks);
	await db.delete(mood);
	await db.delete(users);
	await db.delete(dayData);
	await db.delete(tasks);
	await db.delete(modules);

	// Dev start date
	const startDate = new Date().toDateString();

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

	const dayDataData = [
		{
			id: 1,
			title: "Initial Feelings",
			prompt: "Reflect on your initial feelings about your upcoming psychedelic experience.",
			audio: "meditation-1.ogg",
			control: "control-1.ogg"
		},
		{
			id: 2,
			title: "Motivations",
			prompt: "Explore your motivations for choosing to have this psychedelic experience at this time.",
			audio: "meditation-2.ogg",
			control: "control-2.ogg"
		},
		{
			id: 3,
			title: "Emotional Expectations",
			prompt: "What expectations do you have about the emotional depth of your upcoming experience?",
			audio: "meditation-3.ogg",
			control: "control-3.ogg"
		},
		{
			id: 4,
			title: "Life Influence",
			prompt: "Consider how your past life experiences might influence this psychedelic journey.",
			audio: "meditation-4.ogg",
			control: "control-4.ogg"
		},
		{
			id: 5,
			title: "Psychedelic Understanding",
			prompt: "Describe your current understanding of the effects of psychedelics. What aspects intrigue you most?",
			audio: "meditation-5.ogg",
			control: "control-5.ogg"
		},
		{
			id: 6,
			title: "Physical Effects",
			prompt: "Reflect on your thoughts about how psilocybin might physically affect you during the experience.",
			audio: "meditation-6.ogg",
			control: "control-6.ogg"
		},
		{
			id: 7,
			title: "Unpredictability",
			prompt: "How do you feel about the unpredictable nature of psychedelic experiences?",
			audio: "meditation-7.ogg",
			control: "control-7.ogg"
		},
		{
			id: 8,
			title: "Safety Knowledge",
			prompt: "Assess your current knowledge about the safety of the substance and the environment for your experience.",
			audio: "meditation-8.ogg",
			control: "control-8.ogg"
		},
		{
			id: 9,
			title: "Personal Strengths",
			prompt: "What personal strengths do you believe will help you navigate this experience?",
			audio: "meditation-9.ogg",
			control: "control-9.ogg"
		},
		{
			id: 10,
			title: "Mindfulness Practices",
			prompt: "Describe any meditation, yoga, or mindfulness practices you've been exploring in preparation.",
			audio: "meditation-10.ogg",
			control: "control-10.ogg"
		},
		{
			id: 11,
			title: "Journaling Reflection",
			prompt: "Reflect on your journaling experience so far. How has it contributed to your preparation?",
			audio: "meditation-11.ogg",
			control: "control-11.ogg"
		},
		{
			id: 12,
			title: "Mental Preparation",
			prompt: "What specific steps are you taking to mentally prepare for your psychedelic experience?",
			audio: "meditation-12.ogg",
			control: "control-12.ogg"
		},
		{
			id: 13,
			title: "Building Trust",
			prompt: "How are you building trust with those who will be present during your experience?",
			audio: "meditation-13.ogg",
			control: "control-13.ogg"
		},
		{
			id: 14,
			title: "Insightful Conversations",
			prompt: "Describe any significant conversations you've had about your upcoming experience. What insights did you gain?",
			audio: "meditation-14.ogg",
			control: "control-14.ogg"
		},
		{
			id: 15,
			title: "Involving Others",
			prompt: "How have you involved your close friends or family in your preparation process?",
			audio: "meditation-15.ogg",
			control: "control-15.ogg"
		},
		{
			id: 16,
			title: "Openness",
			prompt: "Reflect on your current level of openness to whatever may unfold during the experience.",
			audio: "meditation-16.ogg",
			control: "control-16.ogg"
		},
		{
			id: 17,
			title: "Surrender",
			prompt: "Explore your thoughts on the concept of 'surrender' in the context of your upcoming experience.",
			audio: "meditation-17.ogg",
			control: "control-17.ogg"
		},
		{
			id: 18,
			title: "Challenging Moments",
			prompt: "What strategies are you considering for managing potentially challenging moments?",
			audio: "meditation-18.ogg",
			control: "control-18.ogg"
		},
		{
			id: 19,
			title: "Grounding Plan",
			prompt: "How do you plan to ground yourself if you feel overwhelmed during the experience?",
			audio: "meditation-19.ogg",
			control: "control-19.ogg"
		},
		{
			id: 20,
			title: "Desired Insights",
			prompt: "What potential changes or insights are you hoping this experience might bring?",
			audio: "meditation-20.ogg",
			control: "control-20.ogg"
		},
		{
			id: 21,
			title: "Final Intention",
			prompt: "Based on your journey of preparation, reflect on your final intention for the psychedelic experience.",
			audio: "meditation-21.ogg",
			control: "control-21.ogg"
		},
	];

	await db.insert(dayData).values(dayDataData);

	const modulesData = [
		{
			id: 1,
			name: "Knowledge and Expectation",
			description:
				"Welcome to the first module of the DIPP course! This week, the aim is to lay a solid foundation of knowledge about psilocybin and what to expect during your psilocybin session.",
		},
		{
			id: 2,
			name: "Psychophysical Readiness",
			description:
				"In this module, we introduce two grounding techniques that you might find useful before, during and after your psychedelic experience: the 4–6 Breathing Technique and the use of simple mantras. These practices are designed to help you maintain a sense of calm and presence, especially during moments that might feel challenging or overwhelming. You can try these out in your own time to see if they resonate with you.",
		},
		{
			id: 3,
			name: "Safety Planning",
			description:
				"This module is designed to emphasise the importance of safety and trust, both during and after your psychedelic experience. Please make sure that you are completing these sections in a calm, quiet and comfortable environment without any distractions.",
		},
	];

	await db.insert(modules).values(modulesData);

	await db.insert(tasks).values([
		{
			task: "Reading Task 1 - Psilocybin Basics",
			time: 15,
			goal: "The purpose of this task is to enhance your understanding of psilocybin, its origins, effects, and potential benefits and risks. By the end of this task, you should have a clear grasp of psilocybin’s role in mental health research, its neurobiological mechanisms, and considerations for its safe use.",
			materials: [
				"Text: 'Psilocybin Basics'",
				"Notebook or digital note-taking tool",
			],
			instructions: [
				"Read the provided text on psilocybin.",
				"Take notes on key points that cover the basics of psilocybin, including its origins, brain effects, safety, and potential benefits.",
				"Consider any follow-up questions or areas you wish to explore further after reading.",
			],
			specifics:
				"Psilocybin is a naturally occurring psychoactive compound found in certain species of mushrooms, commonly known as 'magic mushrooms'. When consumed, psilocybin is converted into psilocin, which interacts with serotonin receptors in the brain, particularly the 5-HT2A receptor. This causes changes in perception, mood, and thought patterns. Psilocybin has therapeutic potential in mental health research, especially for depression, anxiety disorders, and addiction.",
			module_id: 1,
		},
		{
			task: "Reading Task 2 - Practical Concerns Regarding the Session",
			time: 15,
			goal: "This task aims to familiarise you with the practical aspects of participating in a psilocybin study, including how psilocybin will be administered, what to expect during the session, and how to navigate challenging moments. By the end of this task, you should have a clear understanding of the psilocybin session’s phases, safety measures, and the importance of integration post-experience.",
			materials: [
				"Text: 'Practical Concerns Regarding the Session'",
				"Notebook or digital tool for note-taking",
			],
			instructions: [
				"Read the provided text on the practical concerns of a psilocybin session.",
				"Take notes on key topics such as psilocybin administration, phases of the experience, and guidance on handling challenging moments.",
				"Reflect on any questions or concerns you have about the session.",
			],
			specifics:
				"Psilocybin will be administered orally in capsule form during the study. This ensures precise dosing and consistency, providing a safer and more predictable experience. Capsules are prepared under strict pharmaceutical conditions, ensuring purity. This method allows participants to receive the same dosage in a non-invasive and discreet manner, enhancing comfort and maintaining the study's scientific integrity.",
			module_id: 1,
		},
		{
			task: "4–6 Breathing Technique",
			time: 15,
			goal: "The aim of this task is to teach you the 4–6 Breathing Technique, a method designed to help you relax and reduce stress. By the end of this session, you will have practised a tool that can calm your mind and body, particularly useful for preparing yourself for intense experiences like a psychedelic session.",
			materials: [
				"A quiet, comfortable space",
				"Optional: calming music or ambient sounds",
				"Timer (optional)",
			],
			instructions: [
				"Find a quiet, comfortable space to sit or lie down undisturbed. Optionally, you can play calming music or ambient sounds.",
				"Begin by inhaling through your nose for a count of 4, allowing your chest and abdomen to expand.",
				"Slowly exhale through your mouth for a count of 6, gently releasing the air.",
				"Continue this breathing pattern for 5–10 minutes, focusing on the rhythm of your breath and noticing the calming effect.",
				"If you feel dizzy or lightheaded, pause and adjust the duration as necessary. Once the session is over, get up slowly if you're seated or lying down.",
			],
			specifics:
				"The 4–6 Breathing Technique is a simple and powerful way to calm your body and mind. This slow, controlled breathing helps shift your body from a state of stress to one of relaxation by regulating the autonomic nervous system. Practice for about 5–10 minutes, focusing on the rhythm of your breath and observing the sense of calm that grows with each cycle. This technique can be particularly helpful before a psychedelic session.",
			module_id: 2,
		},
		{
			task: "Simple Mantra Affirmation Technique",
			time: 15,
			goal: "The goal of this task is to familiarise you with the Simple Mantra Affirmation Technique, which can help ground you during intense experiences. By the end, you will have practised repeating a personal mantra to develop a sense of calm and reassurance, especially useful during challenging moments in a psychedelic session.",
			materials: ["A quiet, comfortable space", "A personal mantra"],
			instructions: [
				"Reflect on and choose a personal mantra that resonates with you, such as 'I am at peace' or 'I trust in this journey.'",
				"Find a quiet space where you can sit comfortably and won’t be disturbed.",
				"Repeat your chosen mantra, either aloud or silently in your mind, for about 10–15 minutes. Focus on the rhythm and meaning of the words.",
				"If your mind starts to wander, gently bring your attention back to the mantra.",
			],
			specifics:
				"The Simple Mantra Affirmation Technique is a powerful method for grounding yourself, especially during moments of intensity. Regular practice will help this mantra become a familiar and calming anchor that you can turn to during challenging moments in a psychedelic experience.",
			module_id: 2,
		},
		{
			task: "Developing Coping Strategies",
			time: 30,
			goal: "The goal of this task is to help you create a personalised set of coping strategies for managing challenging moments during your psychedelic experience. By reflecting on past experiences and potential triggers, you will feel more prepared and confident during the session.",
			materials: [
				"Notebook or digital tool for journaling",
				"The Resource Bank provided",
				"A quiet, comfortable space for reflection",
			],
			instructions: [
				"This task is broken down into steps designed to guide you in developing effective strategies. Please follow each step carefully, reflecting on your personal experiences as you go.",
			],
			specifics:
				"This task is designed to help you create a personalised set of coping strategies that can be used during challenging moments in your psychedelic experience. By proactively preparing for potential challenges, you can approach your session with increased confidence and a sense of control.",
			module_id: 3,
		},
		{
			task: "Planning Integration",
			time: 30,
			goal: "The goal of this task is to help you develop a practical and personalised plan for integrating your psychedelic experience into your daily life. Integration ensures that the insights and growth you experience during your session are transformed into meaningful, long-term changes. By creating a structured integration plan, you’ll feel more prepared to apply the lessons from your journey and continue your personal development in the weeks and months ahead.",
			materials: [
				"Notebook or digital tool for journaling",
				"The Integration Resource Bank provided",
				"Calendar or planner for scheduling activities",
				"A quiet, comfortable space for reflection",
			],
			instructions: [
				"This task is broken down into steps designed to guide you in developing an integration plan. Please follow each step carefully, reflecting on your personal experiences as you go.",
			],
			specifics:
				"Integration is a crucial step in your psychedelic journey. Think of integration as a bridge: On one side is your psychedelic experience, full of insights, emotions and new perspectives. On the other side is your daily life. Integration is how you cross that bridge, carrying the valuable parts of your experience with you. Remember, integration involves not only processing the experience afterwards, but also preparing for, and handling the psychedelic journey itself.",
			module_id: 3,
		},
	]);
}
