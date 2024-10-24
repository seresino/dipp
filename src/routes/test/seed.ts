import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { dayData } from "$lib/server/schema";
import { modules } from "$lib/server/schema";
import { mood } from "$lib/server/schema";
import { tasks } from "$lib/server/schema";
import { dailyTasks } from "$lib/server/schema";
import { weeklyTasks } from "$lib/server/schema";

const generatePassword = () => {
	return "pass";
};

function getRandomCoordinates() {
	const x = getRandomNumberInRange(-5, 5);
	const y = getRandomNumberInRange(-5, 5);
	return `${x},${y}`;
}

function getRandomNumberInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Dev start date
const startDate = new Date("2024-04-01").toDateString();

const seed = async ({}) => {
	const usersData = [
		{
			id: 0,
			username: "ADMIN",
			start_date: startDate,
			meditation: false,
			high_dosage: false,
		},
		{
			username: "PI5AKN",
			start_date: startDate,
			meditation: true,
			high_dosage: true,
		},
		{
			username: "P1BGSM",
			start_date: startDate,
			meditation: false,
			high_dosage: true,
		},
		{
			username: "PBZ6BA",
			start_date: startDate,
			meditation: true,
			high_dosage: false,
		},
		{
			username: "P8B45Q",
			start_date: startDate,
			meditation: false,
			high_dosage: false,
		},
		{
			username: "USER1",
			start_date: startDate,
			meditation: false,
			high_dosage: false,
		},
		{
			username: "USER2",
			start_date: startDate,
			meditation: true,
			high_dosage: true,
		},
	];

	const dayDataData = [
		{
			title: "Day 1 Initial Impressions",
			prompt: "Reflect on how you feel about your upcoming psychedelic journey.",
			audio: "meditation-1.mp3",
		},
		{
			title: "Day 2 Emotional Preparedness",
			prompt: "What are your expectations about the emotional depth of your upcoming psychedelic experience?",
			audio: "meditation-2.mp3",
		},
		{
			title: "Day 3 Exploring Your Reasons",
			prompt: "Why are you drawn to having this psychedelic experience at this time? Explore your motivations.",
			audio: "meditation-3.mp3",
		},
		{
			title: "Day 4 Insights from Research",
			prompt: "Reflect on the information you've gathered about the effects of psychedelics. What were the most important learning points for you?",
			audio: "meditation-4.mp3",
		},
		{
			title: "Day 5 Past Experiences and Influence",
			prompt: "Consider how your previous life experiences might shape this psychedelic journey.",
			audio: "meditation-5.mp3",
		},
		{
			title: "Day 6 Embracing the Unknown",
			prompt: "How do you feel about the unpredictable aspects of psychedelic experiences?",
			audio: "meditation-6.mp3",
		},
		{
			title: "Day 7 Therapeutic Insights",
			prompt: "Have you had emotionally significant and supportive conversations about the upcoming experience? What insights did you gain from these conversations?",
			audio: "meditation-7.mp3",
		},
		{
			title: "Day 8 Openness to the Journey",
			prompt: "How have you opened yourself to accepting whatever happens during the psychedelic experience?",
			audio: "meditation-8.mp3",
		},
		{
			title: "Day 9 Navigating Challenges",
			prompt: "Think about how you might deal with difficult moments during your upcoming psychedelic experience.",
			audio: "meditation-9.mp3",
		},
		{
			title: "Day 10 Ready to Let Go",
			prompt: "Reflect on your readiness to surrender to the psychedelic experience.",
			audio: "meditation-10.mp3",
		},
		{
			title: "Day 11 Psychological Readiness",
			prompt: "Describe the steps you're taking to mentally prepare for your psychedelic experience.",
			audio: "meditation-11.mp3",
		},
		{
			title: "Day 12 Physical Preparedness",
			prompt: "Describe your thoughts and feelings about how psilocybin might physically affect you during the experience, focusing on sensations, comfort, and any expected bodily changes.",
			audio: "meditation-12.mp3",
		},
		{
			title: "Day 13 Trust and Connection",
			prompt: "How are you building trust and connection with those who will be with you during the experience?",
			audio: "meditation-13.mp3",
		},
		{
			title: "Day 14 Safety and Trust",
			prompt: "Reflect on your knowledge and confidence in the safety of the substance and the environment.",
			audio: "meditation-14.mp3",
		},
		{
			title: "Day 15 Trusting Yourself",
			prompt: "Describe the things about you that give you confidence in your ability to navigate this experience?",
			audio: "meditation-15.mp3",
		},
		{
			title: "Day 16 Anticipating Change",
			prompt: "What changes do you anticipate this experience might bring in you?",
			audio: "meditation-16.mp3",
		},
		{
			title: "Day 17 Preparatory Practices",
			prompt: "Describe your experiences with preparatory practices like meditation, yoga, or journaling.",
			audio: "meditation-17.mp3",
		},
		{
			title: "Day 18 Planning Post-Experience",
			prompt: "Reflect on your plans and support system for after the psychedelic experience.",
			audio: "meditation-18.mp3",
		},
		{
			title: "Day 19 Developing Coping Strategies",
			prompt: "Reflect on the strategies you might use to manage challenging moments during the experience.",
			audio: "meditation-19.mp3",
		},
		{
			title: "Day 20 Involving Loved Ones",
			prompt: "How have you engaged or informed your family and friends about this journey?",
			audio: "meditation-20.mp3",
		},
		{
			title: "Day 21 Final Intentions",
			prompt: "Reflect on your past 20 days of journaling to define your clear, final intention for the psychedelic experience.",
			audio: "meditation-21.mp3",
		},
	];

	const modulesData = [
		{
			name: "Knowledge and Expectation",
			description: `Welcome to Module 1 of the DIPP course. This module, titled "Knowledge and Expectation," is designed to help build a foundational understanding of psilocybin, its effects, and how to navigate the experience so you get the most out of it. You will be equipped with essential information to set realistic expectations and prepare mentally for your journey.
			
			This module consists of one reading task for you to complete in your own time this week.`,
		},
		{
			name: "Psycho-Physical Readiness",
			description: `In this module called ‘Psychophysical-Readiness’, we introduce two grounding techniques that you might find useful before, during and after your psychedelic experience: the 4-6 Breathing Technique and the use of Simple Mantras. These practices are designed to help you maintain a sense of calm and presence, especially during moments that might feel challenging or overwhelming. You can try these out in your own time to see if they resonate with you.
			This module consists of two tasks for you to complete in your own time this week:
			1.	4-6 Breathing Technique (15 minutes)
			2.	Simple Mantra Affirmation Technique (15 minutes)`,
		},
		{
			name: "Safety Planning",
			description: `In Module 3, titled "Safety-Planning," our focus shifts to creating a secure and supportive environment for your psychedelic session. This module is designed to emphasise the importance of safety, trust, and preparedness, both during and after your psychedelic experience.
			This module consists of two tasks for you to complete in your own time this week:
			1.	Developing Coping Strategies (30 min)
			2.	Planning Integration (30 min)
			`,
		},
	];

	const moodData = [
		{
			id: 1,
			q1: 3,
			q2: 4,
			q3: 2,
			q4: 5,
			q5: 1,
			q6: 3,
			q7: 4,
			q8: getRandomCoordinates(),
			q9: 4,
		},
		{
			id: 11,
			q1: 2,
			q2: 3,
			q3: 1,
			q4: 4,
			q5: 5,
			q6: 2,
			q7: 3,
			q8: getRandomCoordinates(),
			q9: 2,
		},
		{
			id: 21,
			q1: 4,
			q2: 5,
			q3: 3,
			q4: 2,
			q5: 1,
			q6: 4,
			q7: 5,
			q8: getRandomCoordinates(),
			q9: 3,
		},
		{
			id: 31,
			q1: 1,
			q2: 4,
			q3: 5,
			q4: 3,
			q5: 2,
			q6: 1,
			q7: 2,
			q8: getRandomCoordinates(),
			q9: 5,
		},
		{
			id: 41,
			q1: 3,
			q2: 2,
			q3: 4,
			q4: 1,
			q5: 5,
			q6: 3,
			q7: 4,
			q8: getRandomCoordinates(),
			q9: 1,
		},
		{
			id: 51,
			q1: 5,
			q2: 1,
			q3: 3,
			q4: 4,
			q5: 2,
			q6: 5,
			q7: 1,
			q8: getRandomCoordinates(),
			q9: 4,
		},
		{
			id: 61,
			q1: 2,
			q2: 3,
			q3: 1,
			q4: 4,
			q5: 5,
			q6: 2,
			q7: 3,
			q8: getRandomCoordinates(),
			q9: 2,
		},
		{
			id: 71,
			q1: 4,
			q2: 5,
			q3: 3,
			q4: 2,
			q5: 1,
			q6: 4,
			q7: 5,
			q8: getRandomCoordinates(),
			q9: 3,
		},
		{
			id: 81,
			q1: 1,
			q2: 4,
			q3: 5,
			q4: 3,
			q5: 2,
			q6: 1,
			q7: 2,
			q8: getRandomCoordinates(),
			q9: 5,
		},
		{
			id: 91,
			q1: 3,
			q2: 2,
			q3: 4,
			q4: 1,
			q5: 5,
			q6: 3,
			q7: 4,
			q8: getRandomCoordinates(),
			q9: 1,
		},
	];

	const dailyData = [
		{
			day_number: 1,
			date: "2024-01-15",
			user_id: 1,
			journal:
				"Today was a great day! I spent time with friends and enjoyed a nice dinner.",
			meditation: true,
			mood_id: 1,
		},
		{
			day_number: 2,
			date: "2024-01-16",
			user_id: 1,
			journal:
				"Worked on a challenging project today. Feeling accomplished!",
			meditation: true,
			mood_id: 11,
		},
		{
			day_number: 3,
			date: "2024-01-17",
			user_id: 1,
			journal:
				"Had a relaxing day at home. Watched a movie and read a good book.",
			meditation: true,
			mood_id: 21,
		},
		{
			day_number: 4,
			date: "2024-01-18",
			user_id: 1,
			journal:
				"Met with a friend for coffee. It's always nice catching up.",
			meditation: true,
			mood_id: 31,
		},
		{
			day_number: 5,
			date: "2024-01-19",
			user_id: 1,
			journal:
				"Started a new hobby today – painting. It's so therapeutic!",
			meditation: true,
			mood_id: 41,
		},
		{
			day_number: 6,
			date: "2024-01-20",
			user_id: 1,
			journal:
				"Busy day at work. Feeling a bit stressed, but managed to stay focused.",
			meditation: true,
			mood_id: 51,
		},
		{
			day_number: 7,
			date: "2024-01-21",
			user_id: 1,
			journal: "Attended a yoga class in the morning. Feeling refreshed!",
			meditation: true,
			mood_id: 61,
		},
		{
			day_number: 8,
			date: "2024-01-22",
			user_id: 1,
			journal: "Spent the day outdoors hiking. Nature is so beautiful.",
			meditation: true,
			mood_id: 71,
		},
		{
			day_number: 9,
			date: "2024-01-23",
			user_id: 1,
			journal:
				"Celebrated a friend's birthday. Lots of laughter and good times.",
			meditation: true,
			mood_id: 81,
		},
		{
			day_number: 10,
			date: "2024-01-24",
			user_id: 1,
			journal:
				"Reflecting on the past 10 days. Grateful for the positive experiences.",
			meditation: true,
			mood_id: 91,
		},
	];

	// const dailyData = [
	// 	{
	// 		day_number: 3,
	// 		date: "2024-01-18",
	// 		user_id: 1,
	// 		journal: "Reflecting on the day's events.",
	// 		meditation: true,
	// 		mood_id: 5,
	// 	},
	// 	{
	// 		day_number: 2,
	// 		date: "2024-01-19",
	// 		user_id: 2,
	// 		journal: "Gratitude journaling.",
	// 		meditation: false,
	// 		mood_id: 8,
	// 	},
	// 	{
	// 		day_number: 4,
	// 		date: "2024-01-20",
	// 		user_id: 3,
	// 		journal: "Deep introspection today.",
	// 		meditation: true,
	// 		mood_id: 2,
	// 	},
	// 	{
	// 		day_number: 1,
	// 		date: "2024-01-21",
	// 		user_id: 4,
	// 		journal: "Enjoyed a peaceful meditation session.",
	// 		meditation: true,
	// 		mood_id: 6,
	// 	},
	// 	{
	// 		day_number: 5,
	// 		date: "2024-01-22",
	// 		user_id: 5,
	// 		journal: "Feeling energized and focused.",
	// 		meditation: false,
	// 		mood_id: 3,
	// 	},
	// 	// ... (add the rest of your data)
	// 	{
	// 		day_number: 3,
	// 		date: "2024-02-01",
	// 		user_id: 6,
	// 		journal: "Reflecting on personal growth.",
	// 		meditation: false,
	// 		mood_id: 9,
	// 	},
	// 	{
	// 		day_number: 2,
	// 		date: "2024-02-02",
	// 		user_id: 7,
	// 		journal: "Mindful moments throughout the day.",
	// 		meditation: true,
	// 		mood_id: 4,
	// 	},
	// 	{
	// 		day_number: 4,
	// 		date: "2024-02-03",
	// 		user_id: 8,
	// 		journal: "Challenging but productive day.",
	// 		meditation: true,
	// 		mood_id: 7,
	// 	},
	// 	{
	// 		day_number: 1,
	// 		date: "2024-02-04",
	// 		user_id: 9,
	// 		journal: "Grateful for positive interactions.",
	// 		meditation: false,
	// 		mood_id: 1,
	// 	},
	// 	{
	// 		day_number: 5,
	// 		date: "2024-02-05",
	// 		user_id: 10,
	// 		journal: "Finding joy in small moments.",
	// 		meditation: true,
	// 		mood_id: 10,
	// 	},
	// ];

	await db.insert(users).values(usersData);
	await db.insert(dayData).values(dayDataData);
	await db.insert(modules).values(modulesData);
	await db.insert(mood).values(moodData);
	await db.insert(dailyTasks).values(dailyData);

	for (let i = 2; i < 7; i++) {
		const user2MoodData = Array.from({ length: 10 }, (_, index) => {
			const id = index * 10 + i; // Starting id from 2
			return {
				id,
				q1: getRandomNumberInRange(1, 5),
				q2: getRandomNumberInRange(1, 5),
				q3: getRandomNumberInRange(1, 5),
				q4: getRandomNumberInRange(1, 5),
				q5: getRandomNumberInRange(1, 5),
				q6: getRandomNumberInRange(1, 5),
				q7: getRandomNumberInRange(1, 5),
				q8: getRandomCoordinates(),
				q9: getRandomNumberInRange(1, 5),
			};
		});

		const user2DailyData = Array.from({ length: 10 }, (_, index) => {
			const dayNumber = index + 1;
			const date = new Date("2024-01-15");
			date.setDate(date.getDate() + dayNumber - 1); // Increment date for each entry
			const formattedDate = date.toISOString().split("T")[0];

			return {
				day_number: dayNumber,
				date: formattedDate,
				user_id: i,
				journal: `Journal entry for day ${dayNumber}.`,
				meditation: null,
				mood_id: index * 10 + i, // Starting mood_id from 2, 12, 22, ...
			};
		});

		await db.insert(mood).values(user2MoodData);
		await db.insert(dailyTasks).values(user2DailyData);
	}

	// const taskData = [
	// 	{
	// 		task: "Reading",
	// 		time: 30,
	// 		goal: JSON.stringify({
	// 			goal: "To gain comprehensive knowledge about psilocybin – its nature, effects, and the experience it induces.",
	// 		}),
	// 		materials: [
	// 			"The reading materials provided below",
	// 			"Pen and paper or a digital device for note-taking",
	// 		],
	// 		instructions:
	// 			"Reading:\nGoal: To gain comprehensive knowledge about psilocybin – its nature, effects, and the experience it induces.\n\nMaterials Needed:\nThe reading materials provided below \nPen and paper or a digital device for note-taking\n\nInstructions:\nReading:\nPlease set aside about 30 minutes to read the provided material. Pay special attention to aspects like setting intentions, navigating challenging moments, and the importance of integration post-experience.\nNote-Taking:\nAs you read, you might find it helpful to take notes on key points, especially those that resonate with your personal interests or concerns.",
	// 		module_id: 1,
	// 	},
	// 	{
	// 		task: "4-6 Breathing Technique",
	// 		time: 15,
	// 		goal: JSON.stringify({
	// 			goal: "To practise the 4-6 Breathing Technique for inducing a state of calm.",
	// 		}),
	// 		materials: [
	// 			"A quiet and comfortable space.",
	// 			"Optional: Calming meditation music.",
	// 		],
	// 		instructions:
	// 			"Preparation: Find a quiet, comfortable place to sit or lie down where you won't be disturbed.\nBreathing Practice:\nInhale slowly through your nose for a count of 4, allowing your chest and lower abdomen to expand.\nExhale slowly through your mouth for a count of 6, releasing the air gradually.\nContinue this pattern for about 5-10 minutes, focusing on maintaining the rhythm of 4-second inhalation and 6-second exhalation. Try to notice the sense of calmness that accompanies this practice.\nNote: Some individuals may experience dizziness. If you’re sitting or lying down, don’t get up too quickly after the practice. Adjust the breathing duration if necessary. Regular practice enhances relaxation skills.",
	// 		module_id: 2,
	// 	},
	// 	{
	// 		task: "Simple Mantra Affirmation Technique",
	// 		time: 15,
	// 		goal: JSON.stringify({
	// 			goal: "To develop and practise a personal mantra for use during intense moments in a psychedelic experience. A mantra is just a word or short phrase that is repeated.",
	// 		}),
	// 		materials: ["Pen and paper or a digital device for note-taking."],
	// 		instructions:
	// 			'Choose Your Mantra: Reflect and select a personal mantra that is comforting and reassuring. Examples include "I am at peace," or "I trust in this journey."\nMantra Practice:\nRepeat your chosen mantra aloud or in your mind, focusing on the words, their rhythm, and meaning.\nPractise this for about 10-15 minutes.\nIf you find your thoughts straying, gently guide your focus back to your mantra.',
	// 		module_id: 2,
	// 	},
	// ];
	// await db.insert(tasks).values(taskData);

	const task1 = {
		task: "Reading: (30 minutes)",
		time: 30,
		goal: "To gain comprehensive knowledge about psilocybin – its nature, effects, and the experience it induces.",
		background: "",
		materials: [
			"The reading materials provided below",
			"Pen and paper or a digital device for note-taking",
		],
		instructions: JSON.stringify({
			Reading:
				"Please set aside about 30 minutes to read the provided material. Pay special attention to aspects like setting intentions, navigating challenging moments, and the importance of integration post-experience.",
			"Note Taking":
				"As you read, you might find it helpful to take notes on key points, especially those that resonate with your personal interests or concerns.",
		}),
		module_id: 1,
	};

	const task2 = {
		task: "4-6 Breathing Technique (15 minutes)",
		time: 15,
		goal: "To practise the 4-6 Breathing Technique for inducing a state of calm.",
		background:
			"This simple method, involving a four-second inhale followed by a six-second exhale, helps regulate the autonomic nervous system, which is responsible for the body's stress responses. By consciously slowing down the breath, the technique shifts the body from a state of alertness and anxiety to one of relaxation and calm, making it an excellent practice before the session begins. What's even more valuable is knowing that you can return to this breathing technique during the psychedelic experience if things become challenging.",
		materials: [
			"A quiet and comfortable space.",
			"Optional: Calming meditation music.",
		],
		instructions: JSON.stringify({
			Preparation:
				"Find a quiet, comfortable place to sit or lie down where you won't be disturbed.",
			"Breathing Practice":
				"Inhale slowly through your nose for a count of 4, allowing your chest and lower abdomen to expand. Exhale slowly through your mouth for a count of 6, releasing the air gradually. Continue this pattern for about 5-10 minutes, focusing on maintaining the rhythm of 4-second inhalation and 6-second exhalation. Try to notice the sense of calmness that accompanies this practice.",
			note: "Some individuals may experience dizziness. If you’re sitting or lying down, don’t get up too quickly after the practice. Adjust the breathing duration if necessary. Regular practice enhances relaxation skills.",
		}),
		module_id: 2,
	};

	const task3 = {
		task: "Simple Mantra Affirmation Technique (15 minutes)",
		time: 15,
		goal: "To develop and practise a personal mantra for use during intense moments in a psychedelic experience. A mantra is just a word or short phrase that is repeated.",
		background:
			'The Simple Mantra Affirmation Technique is a valuable practice for maintaining calm and grounding during intense moments in a psychedelic experience. It involves developing a personal mantra, such as "I am at peace" or "I trust in this journey," which can provide comfort and reassurance. By repeating your chosen mantra and integrating it into your daily routine, you can establish a deep connection with the words, rhythm, and meaning of the mantra. This familiarity allows you to turn to your mantra for support during the psychedelic experience, helping you navigate challenging moments and maintain composure, ultimately contributing to a more peaceful and manageable journey.',
		materials: ["Pen and paper or a digital device for note-taking."],
		instructions: JSON.stringify({
			"Choose Your Mantra":
				'Reflect and select a personal mantra that is comforting and reassuring. Examples include "I am at peace," or "I trust in this journey."',
			"Mantra Practice":
				"Repeat your chosen mantra aloud or in your mind, focusing on the words, their rhythm, and meaning. Practise this for about 10-15 minutes. If you find your thoughts straying, gently guide your focus back to your mantra.",
		}),
		module_id: 2,
	};

	const task4 = {
		task: "Developing Coping Strategies (30 minutes)",
		time: 30,
		goal: "To create a personalized set of coping strategies that can be utilized during challenging moments in a psychedelic experience.",
		background:
			"This task serves as a proactive preparation step, allowing you to create a personalized plan to manage potential challenges you might encounter during the experience. By reflecting on past stressors and developing strategies to address specific triggers, you can approach your psychedelic session with increased confidence and a sense of control. These strategies can act as a safety net, providing support and guidance for you in navigating challenging moments, ultimately enhancing the overall quality and safety of your psychedelic journey.",
		materials: [
			"Pen and paper",
			"Digital device for note-taking",
			"Quiet, comfortable space for reflection",
		],
		instructions: JSON.stringify({
			"Self Reflection":
				"Find a quiet space where you won't be disturbed. Reflect on past experiences where you faced stress or anxiety. Write down how you felt and what helped you overcome those feelings (e.g., deep breathing, mantras, talking to someone, focusing on a particular thought or object). Identify Potential Psychedelic Triggers.",
			"Develop Coping Strategies":
				"For each identified trigger, develop a specific coping strategy. Strategies can be based on your past effective methods or new ones you think might be helpful. Example strategies: If feeling overwhelmed by visuals: Close your eyes and focus on your breath. If confronting challenging emotions: Remind yourself that the experience is temporary and you are in a safe place. You are free to express your emotions without fear of being judged. Remind yourself that your sitter is there to help. If feeling lost or disconnected: Recall a grounding mantra or affirmation. Summarize Your Plan",
		}),
		module_id: 3,
	};

	const task5 = {
		task: "Planning Integration (30 minutes)",
		time: 30,
		goal: "To develop a personalized integration plan outlining activities and practices you will undertake after your psychedelic session to process and incorporate the experience into your daily life.",
		background:
			"Your integration plan could include various activities like journaling, meditation, therapy sessions, or creative pursuits like art or music, chosen based on what resonates with you and supports your growth. You'll schedule these activities realistically and establish a support network, involving friends, family, therapists, or support groups. Remember to review, stay flexible, and commit to your plan.",
		materials: [
			"Pen and paper",
			"Digital device for note-taking",
			"Calendar or planner to schedule post-session activities",
		],
		instructions: JSON.stringify({
			"Reflect on Goals and Insights":
				"Take some time to contemplate what you hope to achieve or learn from your psychedelic experience. Write down key areas of personal growth or understanding you wish to focus on post-session (e.g., emotional processing, spiritual development, behavioural changes). Identify Integration Activities.",
			"Create an Integration Schedule":
				"Using your calendar or planner, schedule regular times for these activities in the days and weeks following your session. Ensure the schedule is realistic and manageable, allowing enough time for rest and reflection. Establish Support Networks.",
		}),
		module_id: 3,
	};

	await db.insert(tasks).values([task1, task2, task3, task4, task5]);
};

export default seed;
