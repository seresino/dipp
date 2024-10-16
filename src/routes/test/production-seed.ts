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
const startDate = new Date("2024-04-01");

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
			description:
				"<p>Welcome to the first module of the DIPP course! This week, the aim is to lay a solid foundation of knowledge about psilocybin and what to expect during your psilocybin session.</p>",
			task1: 1,
			task3: 2,
		},
		{
			name: "Psycho-Physical Readiness",
			description:
				"<p>In this module, we introduce two grounding techniques that you might find useful before, during and after your psychedelic experience: the <b>4–6 Breathing Technique</b> and the use of <b>simple mantras</b>. These practices are designed to help you maintain a sense of calm and presence, especially during moments that might feel challenging or overwhelming. You can try these out in your own time to see if they resonate with you.</p>",
			task1: 3,
			task3: 4,
		},
		{
			name: "Safety Planning",
			description:
				"<p>This module is designed to emphasise the importance of safety and trust, both during and after your psychedelic experience. Please make sure that you are completing these sections in a calm, quiet and comfortable environment without any distractions.<br><br>You will need a notebook in which to brainstorm and to write down your final integration plan.<br><b>Please bring this notebook to the dosing session as well.</b></p>",
			task1: 5,
			task3: 6,
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
		task: "Reading Task 1 - Psilocybin Basics",
		time: 15,
		goal: "To gain comprehensive knowledge about psilocybin – its nature, effects, and the experience it induces.",
		text: `<h3 id="what-is-psilocybin-">What is psilocybin?</h3>
		<p><strong>Psilocybin</strong> is a naturally occurring psychoactive compound found in certain species of mushrooms, commonly known as <strong>‘magic mushrooms’</strong>.<a href="https://paperpile.com/c/vYc7Bd/RNy77">1</a> When consumed, psilocybin is converted in the body into <strong>psilocin</strong>, a substance that interacts with <strong>serotonin</strong> receptors in the brain, particularly the <strong>5-HT2A receptor</strong>.<a href="https://paperpile.com/c/vYc7Bd/UCoUl">2</a> This interaction causes changes in perception, mood, and thought patterns, resulting in the psychedelic effects often associated with psilocybin use. These effects can include altered <strong>sensory experiences</strong>, changes in the <strong>perception of time and space</strong>, increased <strong>introspection</strong>, and sometimes a sense of <strong>spiritual or emotional connection</strong>.<a href="https://paperpile.com/c/vYc7Bd/jVka8">3</a> In recent years, scientific interest in psilocybin has grown due to its potential therapeutic applications in the treatment of various mental health conditions, such as depression <a href="https://paperpile.com/c/vYc7Bd/7CbcT+du6zi">4,5</a>, anxiety disorders, and addiction.<a href="https://paperpile.com/c/vYc7Bd/7CbcT+du6zi">4,5</a> </p>
		<h3 id="where-does-psilocybin-come-from-">Where does psilocybin come from?</h3>
		<p>Psilocybin occurs primarily in mushrooms of the <strong>genus Psilocybe</strong>, although it has been detected in over 200 other mushroom species.<a href="https://paperpile.com/c/vYc7Bd/RNy77">1</a> These mushrooms can be found in various habitats, particularly in tropical and subtropical regions of the Americas, Europe and Asia. The concentration of psilocybin varies between species and even between mushrooms of the <em>same</em> species, depending on factors such as growth conditions, stage of development, and genetics.<a href="https://paperpile.com/c/vYc7Bd/nHCqK">6</a> Psilocybin can also be synthesised in laboratories for research or potential therapeutic purposes.<a href="https://paperpile.com/c/vYc7Bd/APeIY">7</a> </p>
		<h3 id="how-does-psilocybin-affect-the-brain-">How does psilocybin affect the brain?</h3>
		<p>Psilocybin creates its psychedelic effects through a fascinating interaction with the brain&#39;s chemical messengers and networks.<a href="https://paperpile.com/c/vYc7Bd/UCoUl">2</a> </p>
		<p>As mentioned in the ‘What is psilocybin’ section, when you take psilocybin, your body quickly converts it into another substance called <strong>psilocin</strong>. Psilocin interacts with the brain&#39;s <strong>serotonin</strong> system, particularly the <strong>5-HT2A receptors</strong>.<a href="https://paperpile.com/c/vYc7Bd/pLcqm+G4mGq+P3x09+Usjx5+P5uyG">8–12</a> Serotonin is a chemical messenger that allows nerve cells to communicate between brain areas involved in mood, perception and cognition. By stimulating the 5-HT2A receptors, psilocin causes a cascade of changes in brain chemistry and function that give rise to the typical psychedelic effects.<a href="https://paperpile.com/c/vYc7Bd/4oAlU">13</a></p>
		<p>One of the most striking effects of psilocybin is the <strong>alteration of neural networks</strong>. Under psilocybin, the brain areas that don&#39;t typically communicate become increasingly connected, leading to a more integrated state. At the same time, networks such as the <strong>default mode network (DMN)</strong>, a brain system associated with self-focused thought and rumination, becomes less active. This temporary disruption of the DMN might contribute to the dissolution of the ego and the sense of unity often reported during psychedelic experiences.<a href="https://paperpile.com/c/vYc7Bd/qfQiB+QAPSk">14,15</a></p>
		<p>Research has also shown that psilocybin can increase the brain&#39;s capacity to change and create new connections.<a href="https://paperpile.com/c/vYc7Bd/4Ra6q">16</a> This <strong>heightened plasticity</strong> may underlie some of the lasting positive changes that people report, as it allows for new perspectives and patterns of thought to emerge.<a href="https://paperpile.com/c/vYc7Bd/jVka8">3</a></p>
		<p>It&#39;s important to note that while psilocybin causes significant changes in brain function, these effects are temporary. As your body metabolises and eliminates the psilocybin, your brain gradually returns to its normal state. However, the insights, emotional shifts, and changes in perspective that can occur during a psilocybin experience often persist, potentially leading to benefits for mental health and well-being that outlast the brief psilocybin session.<a href="https://paperpile.com/c/vYc7Bd/GSQD9+fvaKm+TTmeY">17–19</a></p>
		<p>Is taking psilocybin safe?</p>
		<p>Psilocybin is generally considered safe when used in controlled research settings under the supervision of trained professionals. In these contexts, psilocybin has a <strong>low toxicity profile</strong>, doesn&#39;t cause physical damage to the brain or other organs, and carries a <strong>low risk of addiction or overdose</strong>.<a href="https://paperpile.com/c/vYc7Bd/QqUix+3NyuT">20,21</a></p>
		<p>However, the safety of psilocybin use is dependent on context. In uncontrolled environments and without proper preparation and support, the powerful psychological effects of psilocybin can be unpredictable and potentially distressing, particularly for those with a history of mental health issues.<a href="https://paperpile.com/c/vYc7Bd/Nfr7P+cMG7w">22,23</a> Psilocybin can also exacerbate pre-existing psychiatric conditions and impair judgement, leading to potential behavioural risks.</p>
		<p>In this research study, there are integral safety measures in place to mitigate these risks. These include <strong>participant screening, controlled dosing</strong>, a supportive team and environment, and post-session <strong>integration</strong>.</p>
		<h3 id="what-are-the-potential-benefits-of-psilocybin-">What are the potential benefits of psilocybin?</h3>
		<p>Although it is not a licensed treatment in the UK, research suggests that psilocybin may offer several therapeutic and personal-growth benefits, such as:</p>
		<ul>
		<li><strong>Alleviating depression and anxiety</strong>, including in cases resistant to conventional treatments.<a href="https://paperpile.com/c/vYc7Bd/7CbcT+eSlBF+U5s9V">4,24,25</a>  </li>
		<li>Aiding in the <strong>cessation of smoking</strong> and potentially <strong>other forms of addiction</strong> when combined with therapy.<a href="https://paperpile.com/c/vYc7Bd/tmRJl+du6zi">5,26</a>  </li>
		<li>Increasing <strong>openness, self-awareness</strong> and <strong>perspectival shifts</strong> that can lead to positive life changes.<a href="https://paperpile.com/c/vYc7Bd/g7u4M+HjNFB+wSBeS">27–29</a>  </li>
		<li>Enhancing overall <strong>psychological well-being</strong>, including feelings of connectedness and life satisfaction.<a href="https://paperpile.com/c/vYc7Bd/ATD33+uFm8J">30,31</a>  </li>
		<li>Promoting  <strong>neuroplasticity</strong> and <strong>cognitive flexibility</strong> with potentially long-term underlying benefits.<a href="https://paperpile.com/c/vYc7Bd/ydAYV+Q9hRy">32,33</a></li>
		</ul>
		<p>These promising potential benefits are most evident when psilocybin is used in controlled, supportive settings and integrated into a therapeutic or personal-growth framework. More research is needed to fully understand who benefits from psilocybin, the range of its therapeutic effects, and its mechanisms of action.</p>
		<h3 id="who-should-avoid-using-psilocybin-">Who should avoid using psilocybin?</h3>
		<p>Psilocybin is not appropriate for everyone. The following individuals should avoid using psilocybin:</p>
		<ul>
		<li>Those with a personal or family history of <strong>psychotic disorders</strong>, as psilocybin may trigger or worsen psychotic symptoms.  </li>
		<li>People with severe <strong>cardiovascular conditions</strong>, as psilocybin can temporarily increase heart rate and blood pressure.  </li>
		<li><strong>Pregnant</strong> and <strong>breastfeeding women</strong>, due to the lack of research on psilocybin&#39;s effects in these populations.  </li>
		<li>Individuals with <strong>severe anxiety disorders</strong> or a history of <strong>psychological trauma</strong> should only use psilocybin under the guidance of a mental health professional. In the UK, this could only happen if you were part of a clinical trial.  </li>
		<li>People taking certain medications, particularly <strong>psychiatric medications</strong>, should consult a medical professional before using psilocybin.</li>
		</ul>
		<p>Psychological readiness and current life circumstances should also be considered, as those in vulnerable or unstable periods may be at higher risk for adverse reactions.  </p>
		`,
	};

	const task1 = {
		task: "Reading Task 1 - Psilocybin Basics",
		time: 15,
		goal: "To gain comprehensive knowledge about psilocybin – its nature, effects, and the experience it induces.",
		text: `<h3 id="what-is-psilocybin-">What is psilocybin?</h3>
		<p><strong>Psilocybin</strong> is a naturally occurring psychoactive compound found in certain species of mushrooms, commonly known as <strong>‘magic mushrooms’</strong>.<a href="https://paperpile.com/c/vYc7Bd/RNy77">1</a> When consumed, psilocybin is converted in the body into <strong>psilocin</strong>, a substance that interacts with <strong>serotonin</strong> receptors in the brain, particularly the <strong>5-HT2A receptor</strong>.<a href="https://paperpile.com/c/vYc7Bd/UCoUl">2</a> This interaction causes changes in perception, mood, and thought patterns, resulting in the psychedelic effects often associated with psilocybin use. These effects can include altered <strong>sensory experiences</strong>, changes in the <strong>perception of time and space</strong>, increased <strong>introspection</strong>, and sometimes a sense of <strong>spiritual or emotional connection</strong>.<a href="https://paperpile.com/c/vYc7Bd/jVka8">3</a> In recent years, scientific interest in psilocybin has grown due to its potential therapeutic applications in the treatment of various mental health conditions, such as depression <a href="https://paperpile.com/c/vYc7Bd/7CbcT+du6zi">4,5</a>, anxiety disorders, and addiction.<a href="https://paperpile.com/c/vYc7Bd/7CbcT+du6zi">4,5</a> </p>
		<h3 id="where-does-psilocybin-come-from-">Where does psilocybin come from?</h3>
		<p>Psilocybin occurs primarily in mushrooms of the <strong>genus Psilocybe</strong>, although it has been detected in over 200 other mushroom species.<a href="https://paperpile.com/c/vYc7Bd/RNy77">1</a> These mushrooms can be found in various habitats, particularly in tropical and subtropical regions of the Americas, Europe and Asia. The concentration of psilocybin varies between species and even between mushrooms of the <em>same</em> species, depending on factors such as growth conditions, stage of development, and genetics.<a href="https://paperpile.com/c/vYc7Bd/nHCqK">6</a> Psilocybin can also be synthesised in laboratories for research or potential therapeutic purposes.<a href="https://paperpile.com/c/vYc7Bd/APeIY">7</a> </p>
		<h3 id="how-does-psilocybin-affect-the-brain-">How does psilocybin affect the brain?</h3>
		<p>Psilocybin creates its psychedelic effects through a fascinating interaction with the brain&#39;s chemical messengers and networks.<a href="https://paperpile.com/c/vYc7Bd/UCoUl">2</a> </p>
		<p>As mentioned in the ‘What is psilocybin’ section, when you take psilocybin, your body quickly converts it into another substance called <strong>psilocin</strong>. Psilocin interacts with the brain&#39;s <strong>serotonin</strong> system, particularly the <strong>5-HT2A receptors</strong>.<a href="https://paperpile.com/c/vYc7Bd/pLcqm+G4mGq+P3x09+Usjx5+P5uyG">8–12</a> Serotonin is a chemical messenger that allows nerve cells to communicate between brain areas involved in mood, perception and cognition. By stimulating the 5-HT2A receptors, psilocin causes a cascade of changes in brain chemistry and function that give rise to the typical psychedelic effects.<a href="https://paperpile.com/c/vYc7Bd/4oAlU">13</a></p>
		<p>One of the most striking effects of psilocybin is the <strong>alteration of neural networks</strong>. Under psilocybin, the brain areas that don&#39;t typically communicate become increasingly connected, leading to a more integrated state. At the same time, networks such as the <strong>default mode network (DMN)</strong>, a brain system associated with self-focused thought and rumination, becomes less active. This temporary disruption of the DMN might contribute to the dissolution of the ego and the sense of unity often reported during psychedelic experiences.<a href="https://paperpile.com/c/vYc7Bd/qfQiB+QAPSk">14,15</a></p>
		<p>Research has also shown that psilocybin can increase the brain&#39;s capacity to change and create new connections.<a href="https://paperpile.com/c/vYc7Bd/4Ra6q">16</a> This <strong>heightened plasticity</strong> may underlie some of the lasting positive changes that people report, as it allows for new perspectives and patterns of thought to emerge.<a href="https://paperpile.com/c/vYc7Bd/jVka8">3</a></p>
		<p>It&#39;s important to note that while psilocybin causes significant changes in brain function, these effects are temporary. As your body metabolises and eliminates the psilocybin, your brain gradually returns to its normal state. However, the insights, emotional shifts, and changes in perspective that can occur during a psilocybin experience often persist, potentially leading to benefits for mental health and well-being that outlast the brief psilocybin session.<a href="https://paperpile.com/c/vYc7Bd/GSQD9+fvaKm+TTmeY">17–19</a></p>
		<p>Is taking psilocybin safe?</p>
		<p>Psilocybin is generally considered safe when used in controlled research settings under the supervision of trained professionals. In these contexts, psilocybin has a <strong>low toxicity profile</strong>, doesn&#39;t cause physical damage to the brain or other organs, and carries a <strong>low risk of addiction or overdose</strong>.<a href="https://paperpile.com/c/vYc7Bd/QqUix+3NyuT">20,21</a></p>
		<p>However, the safety of psilocybin use is dependent on context. In uncontrolled environments and without proper preparation and support, the powerful psychological effects of psilocybin can be unpredictable and potentially distressing, particularly for those with a history of mental health issues.<a href="https://paperpile.com/c/vYc7Bd/Nfr7P+cMG7w">22,23</a> Psilocybin can also exacerbate pre-existing psychiatric conditions and impair judgement, leading to potential behavioural risks.</p>
		<p>In this research study, there are integral safety measures in place to mitigate these risks. These include <strong>participant screening, controlled dosing</strong>, a supportive team and environment, and post-session <strong>integration</strong>.</p>
		<h3 id="what-are-the-potential-benefits-of-psilocybin-">What are the potential benefits of psilocybin?</h3>
		<p>Although it is not a licensed treatment in the UK, research suggests that psilocybin may offer several therapeutic and personal-growth benefits, such as:</p>
		<ul>
		<li><strong>Alleviating depression and anxiety</strong>, including in cases resistant to conventional treatments.<a href="https://paperpile.com/c/vYc7Bd/7CbcT+eSlBF+U5s9V">4,24,25</a>  </li>
		<li>Aiding in the <strong>cessation of smoking</strong> and potentially <strong>other forms of addiction</strong> when combined with therapy.<a href="https://paperpile.com/c/vYc7Bd/tmRJl+du6zi">5,26</a>  </li>
		<li>Increasing <strong>openness, self-awareness</strong> and <strong>perspectival shifts</strong> that can lead to positive life changes.<a href="https://paperpile.com/c/vYc7Bd/g7u4M+HjNFB+wSBeS">27–29</a>  </li>
		<li>Enhancing overall <strong>psychological well-being</strong>, including feelings of connectedness and life satisfaction.<a href="https://paperpile.com/c/vYc7Bd/ATD33+uFm8J">30,31</a>  </li>
		<li>Promoting  <strong>neuroplasticity</strong> and <strong>cognitive flexibility</strong> with potentially long-term underlying benefits.<a href="https://paperpile.com/c/vYc7Bd/ydAYV+Q9hRy">32,33</a></li>
		</ul>
		<p>These promising potential benefits are most evident when psilocybin is used in controlled, supportive settings and integrated into a therapeutic or personal-growth framework. More research is needed to fully understand who benefits from psilocybin, the range of its therapeutic effects, and its mechanisms of action.</p>
		<h3 id="who-should-avoid-using-psilocybin-">Who should avoid using psilocybin?</h3>
		<p>Psilocybin is not appropriate for everyone. The following individuals should avoid using psilocybin:</p>
		<ul>
		<li>Those with a personal or family history of <strong>psychotic disorders</strong>, as psilocybin may trigger or worsen psychotic symptoms.  </li>
		<li>People with severe <strong>cardiovascular conditions</strong>, as psilocybin can temporarily increase heart rate and blood pressure.  </li>
		<li><strong>Pregnant</strong> and <strong>breastfeeding women</strong>, due to the lack of research on psilocybin&#39;s effects in these populations.  </li>
		<li>Individuals with <strong>severe anxiety disorders</strong> or a history of <strong>psychological trauma</strong> should only use psilocybin under the guidance of a mental health professional. In the UK, this could only happen if you were part of a clinical trial.  </li>
		<li>People taking certain medications, particularly <strong>psychiatric medications</strong>, should consult a medical professional before using psilocybin.</li>
		</ul>
		<p>Psychological readiness and current life circumstances should also be considered, as those in vulnerable or unstable periods may be at higher risk for adverse reactions.  </p>
		`,
	};

	const task2 = {
		task: "Reading Task 2 - Practical concerns regarding the session",
		time: 15,
		goal: "To gain comprehensive knowledge about psilocybin – its nature, effects, and the experience it induces.",
		text: `<h3 id="what-is-psilocybin-">What is psilocybin?</h3>
		<p><strong>Psilocybin</strong> is a naturally occurring psychoactive compound found in certain species of mushrooms, commonly known as <strong>‘magic mushrooms’</strong>.<a href="https://paperpile.com/c/vYc7Bd/RNy77">1</a> When consumed, psilocybin is converted in the body into <strong>psilocin</strong>, a substance that interacts with <strong>serotonin</strong> receptors in the brain, particularly the <strong>5-HT2A receptor</strong>.<a href="https://paperpile.com/c/vYc7Bd/UCoUl">2</a> This interaction causes changes in perception, mood, and thought patterns, resulting in the psychedelic effects often associated with psilocybin use. These effects can include altered <strong>sensory experiences</strong>, changes in the <strong>perception of time and space</strong>, increased <strong>introspection</strong>, and sometimes a sense of <strong>spiritual or emotional connection</strong>.<a href="https://paperpile.com/c/vYc7Bd/jVka8">3</a> In recent years, scientific interest in psilocybin has grown due to its potential therapeutic applications in the treatment of various mental health conditions, such as depression <a href="https://paperpile.com/c/vYc7Bd/7CbcT+du6zi">4,5</a>, anxiety disorders, and addiction.<a href="https://paperpile.com/c/vYc7Bd/7CbcT+du6zi">4,5</a> </p>
		<h3 id="where-does-psilocybin-come-from-">Where does psilocybin come from?</h3>
		<p>Psilocybin occurs primarily in mushrooms of the <strong>genus Psilocybe</strong>, although it has been detected in over 200 other mushroom species.<a href="https://paperpile.com/c/vYc7Bd/RNy77">1</a> These mushrooms can be found in various habitats, particularly in tropical and subtropical regions of the Americas, Europe and Asia. The concentration of psilocybin varies between species and even between mushrooms of the <em>same</em> species, depending on factors such as growth conditions, stage of development, and genetics.<a href="https://paperpile.com/c/vYc7Bd/nHCqK">6</a> Psilocybin can also be synthesised in laboratories for research or potential therapeutic purposes.<a href="https://paperpile.com/c/vYc7Bd/APeIY">7</a> </p>
		<h3 id="how-does-psilocybin-affect-the-brain-">How does psilocybin affect the brain?</h3>
		<p>Psilocybin creates its psychedelic effects through a fascinating interaction with the brain&#39;s chemical messengers and networks.<a href="https://paperpile.com/c/vYc7Bd/UCoUl">2</a> </p>
		<p>As mentioned in the ‘What is psilocybin’ section, when you take psilocybin, your body quickly converts it into another substance called <strong>psilocin</strong>. Psilocin interacts with the brain&#39;s <strong>serotonin</strong> system, particularly the <strong>5-HT2A receptors</strong>.<a href="https://paperpile.com/c/vYc7Bd/pLcqm+G4mGq+P3x09+Usjx5+P5uyG">8–12</a> Serotonin is a chemical messenger that allows nerve cells to communicate between brain areas involved in mood, perception and cognition. By stimulating the 5-HT2A receptors, psilocin causes a cascade of changes in brain chemistry and function that give rise to the typical psychedelic effects.<a href="https://paperpile.com/c/vYc7Bd/4oAlU">13</a></p>
		<p>One of the most striking effects of psilocybin is the <strong>alteration of neural networks</strong>. Under psilocybin, the brain areas that don&#39;t typically communicate become increasingly connected, leading to a more integrated state. At the same time, networks such as the <strong>default mode network (DMN)</strong>, a brain system associated with self-focused thought and rumination, becomes less active. This temporary disruption of the DMN might contribute to the dissolution of the ego and the sense of unity often reported during psychedelic experiences.<a href="https://paperpile.com/c/vYc7Bd/qfQiB+QAPSk">14,15</a></p>
		<p>Research has also shown that psilocybin can increase the brain&#39;s capacity to change and create new connections.<a href="https://paperpile.com/c/vYc7Bd/4Ra6q">16</a> This <strong>heightened plasticity</strong> may underlie some of the lasting positive changes that people report, as it allows for new perspectives and patterns of thought to emerge.<a href="https://paperpile.com/c/vYc7Bd/jVka8">3</a></p>
		<p>It&#39;s important to note that while psilocybin causes significant changes in brain function, these effects are temporary. As your body metabolises and eliminates the psilocybin, your brain gradually returns to its normal state. However, the insights, emotional shifts, and changes in perspective that can occur during a psilocybin experience often persist, potentially leading to benefits for mental health and well-being that outlast the brief psilocybin session.<a href="https://paperpile.com/c/vYc7Bd/GSQD9+fvaKm+TTmeY">17–19</a></p>
		<p>Is taking psilocybin safe?</p>
		<p>Psilocybin is generally considered safe when used in controlled research settings under the supervision of trained professionals. In these contexts, psilocybin has a <strong>low toxicity profile</strong>, doesn&#39;t cause physical damage to the brain or other organs, and carries a <strong>low risk of addiction or overdose</strong>.<a href="https://paperpile.com/c/vYc7Bd/QqUix+3NyuT">20,21</a></p>
		<p>However, the safety of psilocybin use is dependent on context. In uncontrolled environments and without proper preparation and support, the powerful psychological effects of psilocybin can be unpredictable and potentially distressing, particularly for those with a history of mental health issues.<a href="https://paperpile.com/c/vYc7Bd/Nfr7P+cMG7w">22,23</a> Psilocybin can also exacerbate pre-existing psychiatric conditions and impair judgement, leading to potential behavioural risks.</p>
		<p>In this research study, there are integral safety measures in place to mitigate these risks. These include <strong>participant screening, controlled dosing</strong>, a supportive team and environment, and post-session <strong>integration</strong>.</p>
		<h3 id="what-are-the-potential-benefits-of-psilocybin-">What are the potential benefits of psilocybin?</h3>
		<p>Although it is not a licensed treatment in the UK, research suggests that psilocybin may offer several therapeutic and personal-growth benefits, such as:</p>
		<ul>
		<li><strong>Alleviating depression and anxiety</strong>, including in cases resistant to conventional treatments.<a href="https://paperpile.com/c/vYc7Bd/7CbcT+eSlBF+U5s9V">4,24,25</a>  </li>
		<li>Aiding in the <strong>cessation of smoking</strong> and potentially <strong>other forms of addiction</strong> when combined with therapy.<a href="https://paperpile.com/c/vYc7Bd/tmRJl+du6zi">5,26</a>  </li>
		<li>Increasing <strong>openness, self-awareness</strong> and <strong>perspectival shifts</strong> that can lead to positive life changes.<a href="https://paperpile.com/c/vYc7Bd/g7u4M+HjNFB+wSBeS">27–29</a>  </li>
		<li>Enhancing overall <strong>psychological well-being</strong>, including feelings of connectedness and life satisfaction.<a href="https://paperpile.com/c/vYc7Bd/ATD33+uFm8J">30,31</a>  </li>
		<li>Promoting  <strong>neuroplasticity</strong> and <strong>cognitive flexibility</strong> with potentially long-term underlying benefits.<a href="https://paperpile.com/c/vYc7Bd/ydAYV+Q9hRy">32,33</a></li>
		</ul>
		<p>These promising potential benefits are most evident when psilocybin is used in controlled, supportive settings and integrated into a therapeutic or personal-growth framework. More research is needed to fully understand who benefits from psilocybin, the range of its therapeutic effects, and its mechanisms of action.</p>
		<h3 id="who-should-avoid-using-psilocybin-">Who should avoid using psilocybin?</h3>
		<p>Psilocybin is not appropriate for everyone. The following individuals should avoid using psilocybin:</p>
		<ul>
		<li>Those with a personal or family history of <strong>psychotic disorders</strong>, as psilocybin may trigger or worsen psychotic symptoms.  </li>
		<li>People with severe <strong>cardiovascular conditions</strong>, as psilocybin can temporarily increase heart rate and blood pressure.  </li>
		<li><strong>Pregnant</strong> and <strong>breastfeeding women</strong>, due to the lack of research on psilocybin&#39;s effects in these populations.  </li>
		<li>Individuals with <strong>severe anxiety disorders</strong> or a history of <strong>psychological trauma</strong> should only use psilocybin under the guidance of a mental health professional. In the UK, this could only happen if you were part of a clinical trial.  </li>
		<li>People taking certain medications, particularly <strong>psychiatric medications</strong>, should consult a medical professional before using psilocybin.</li>
		</ul>
		<p>Psychological readiness and current life circumstances should also be considered, as those in vulnerable or unstable periods may be at higher risk for adverse reactions.  </p>
		`,
	};

	const task3 = {
		task: "4-6 Breathing Technique",
		time: 15,
		goal: "To practise the 4-6 Breathing Technique for inducing a state of calm.",
		text: `<p>The <strong>4–6 Breathing Technique</strong> is a simple method for inducing a <strong>state of calm and relaxation</strong>. This technique involves inhaling slowly through your nose for a count of 4, allowing your chest and lower abdomen to expand, followed by exhaling slowly through your mouth for a count of 6, releasing the air gradually. </p>
			<p>To practise this technique, find a quiet and comfortable space where you can sit or lie down without being disturbed. You may choose to play some ambient sounds or calming meditation music if you find it helpful. Once you&#39;re settled, begin the breathing practice by focusing on maintaining the rhythm of a <strong>4-second inhalation followed by a 6-second exhalation</strong>. Continue this pattern for about 5–10 minutes, noticing the increasing calmness that accompanies the practice.</p>
			<p>This technique helps regulate the <strong>autonomic nervous system</strong>, which is responsible for the <strong>body&#39;s stress responses</strong>. By consciously slowing down your breath, you can shift your body from a state of alertness and anxiety to one of relaxation and calm. Practising this technique before your psychedelic session can help you enter the experience in a more grounded and centred state of mind. Additionally, knowing that you can return to this breathing technique during the experience itself can provide a valuable tool for navigating any challenging moments that may arise.</p>
			<p>Please note that some individuals may experience dizziness during this breathing practice. To reduce the odds of this happening, if you&#39;re sitting or lying down to practise, take care not to get up too quickly afterwards. If necessary, adjust the duration to suit your comfort level. With regular practice, you can enhance your relaxation skills and ability to access a state of calm when needed.</p>
			`,
	};

	const task4 = {
		task: "Simple Mantra Affirmation Technique (15 minutes)",
		time: 15,
		goal: "To develop and practise a personal mantra for use during intense moments in a psychedelic experience. A mantra is just a word or short phrase that is repeated.",
		text: `<p>The <strong>Simple Mantra Affirmation Technique</strong> is a valuable practice for <strong>‘grounding’</strong> and maintaining calm during intense moments of a psychedelic experience. This technique involves <strong>selecting a personal mantra</strong>, which is a word or short phrase that you repeat to yourself, such as ’I am at peace’, ’I trust in this journey’ or ‘In and through’.</p>
		<p>To begin, take some time to reflect and choose a mantra that resonates with you and provides a sense of comfort and reassurance. Once you have selected your mantra, find a quiet space where you can practise repeating it, either aloud or silently in your mind, for about 10–15 minutes each time. As you repeat the mantra, focus on the words, their rhythm and their meaning, allowing yourself to develop a deep connection with the phrase. If you find your thoughts wandering, gently guide your attention back to the mantra.</p>
		<p>By regularly practising your chosen mantra and integrating it into your daily routine, you can establish a strong familiarity with the words and their associated sense of calm. This familiarity will allow you to more easily turn to your mantra for support during the psychedelic experience, helping you to navigate challenging moments and maintain a sense of peace and composure.</p>
		<p>Remember, the goal is not to stop your thoughts or emotions with the mantra, but rather for it to provide a gentle anchor that you can return to when needed. With consistent practice, your mantra can become a valuable tool for promoting a more manageable and peaceful psychedelic journey.</p>
		`,
	};

	const task5 = {
		task: "Developing Coping Strategies (30 minutes)",
		time: 30,
		goal: "To create a personalized set of coping strategies that can be utilized during challenging moments in a psychedelic experience.",
		text: `<p>This task is designed to help you create a personalised set of <strong>coping strategies</strong> that can be used during challenging moments in your psychedelic experience. By proactively preparing for potential challenges, you can approach your session with increased confidence and a sense of control.</p>
		<p><strong>1. Reflect on past experiences (5 minutes)</strong><br>Find a quiet, comfortable place where you won&#39;t be disturbed. Spend 5 minutes journaling about times when you felt stressed or anxious. Consider what happened, how you felt, and what helped you feel better. Write down the specific techniques that helped you cope, such as deep breathing, self-talk, seeking support from others, or focusing on calming objects. There are no wrong answers; the aim is to identify personal strategies that have worked for you in the past. These reflections will serve as a valuable resource for managing future challenges.</p>
		<p><strong>2. Identify potential psychedelic experience triggers (5 minutes)</strong><br>Take 5 minutes to list possible sources of discomfort or anxiety during a psychedelic experience. Consider things like intense visual phenomena, feelings of losing or having lost control, or encounters with emotionally charged memories or entities. Be honest and specific with yourself about what might unsettle you. This exercise helps to prepare you mentally, allowing you to develop coping strategies in advance. Remember, awareness of potential triggers is a key step in managing them effectively.</p>
		<p><strong>3. Review the resource bank (5 minutes)</strong><br>Carefully read through the Resource Bank provided below. It contains three main categories of methods, or tools, that can be used alone or in combination with others: <strong>environmental adjustment, body-oriented, and mental</strong>. As you review them, consider which tools might work best for you when handling challenging experiences.</p>
		<ul>
		<li><p><strong>Environmental adjustment tools</strong> focus on external changes that can influence your internal state, by <strong>altering your surroundings and immediate physical circumstances</strong> to create a more supportive or comfortable experience. You can use these tools before dosing and also during the session. They include:  </p>
		<ul>
		<li>Adjusting your <strong>location within the designated space</strong>: relocating to a different part of the room, moving to another piece of furniture, standing up briefly, or using the bathroom when necessary.  </li>
		<li>Modifying <strong>audio experience</strong>: adjusting volume, pausing or resuming the preset playlist, removing or replacing headphones, or opting for silence.  </li>
		<li>Adjusting <strong>lighting</strong>: turning side lamps on or off, activating, dimming or deactivating overhead lights as needed.  </li>
		<li>Modifying <strong>temperature</strong>: adjusting room thermostat, opening/closing windows, adding or removing layers of clothing such as blankets or sweaters.  </li>
		<li>Modifying <strong>level of interpersonal interaction:</strong> requesting assistance from session sitters, asking for reduced interaction or privacy when needed.  </li>
		<li>Changing your <strong>visual input</strong>: opening or closing your eyes, using eye shades.</li>
		</ul>
		</li>
		<li><p><strong>Body-oriented tools</strong> help you to become more present and to be in touch with your emotional state by <strong>actively engaging with your body</strong>. These include:  </p>
		<ul>
		<li><strong>Breathing exercise</strong>: focusing on slow, stable breathing or trying deeper, longer breaths. Think back to the breathing exercise you learned in Module 2.  </li>
		<li><strong>Body awareness</strong>: grounding yourself by scanning each body part, noticing how each  feels and how they support you. This can involve conscious movements or non-movements.  </li>
		<li><strong>Posture changes</strong>: adjusting your shoulders, adjusting the sitting position, performing any movement that feels good, even dancing.  </li>
		<li><strong>Creative expression</strong>: drawing or painting.  </li>
		<li><strong>Touch:</strong> this can include self-touch (e.g., hugging, touching or holding yourself for comfort and grounding), or holding hands with one of your sitters (which will be pre-discussed and consented to before the session).</li>
		</ul>
		</li>
		<li><p><strong>Mental tools</strong> offer various cognitive strategies that help you to be present in the experience while not being overwhelmed by the challenges. These include:  </p>
		<ul>
		<li><strong>Emotional awareness</strong>: Pause and notice your feelings without judgement. Describe the emotion to yourself: ‘I&#39;m feeling anxiety in my chest.’ Remind yourself that emotions are temporary: ‘This feeling will pass.’ To get an idea of how to relate differently to your thoughts while still accepting their presence, you can check out <a href="https://www.youtube.com/watch?v=Z29ptSuoWRc">this</a> short video.  </li>
		<li><strong>Thought separation</strong>: Imagine your thoughts as separate entities and let them &#39;talk&#39;. Remind yourself that you are not these thoughts, but a witness to them. To get an idea of how to see yourself and your thoughts ‘as context’, you can check out <a href="https://portlandpsychotherapy.com/wp-content/uploads/sites/28/act_observer_exercise.mp3">this</a> exercise  </li>
		<li><strong>Active visualisation</strong>: Imagine a safe, peaceful place in detail (e.g. a beach or a forest, etc.). Visualise difficult emotions as shapes or colours, then watch them change or dissolve. Picture yourself successfully navigating the challenge they present. Create a mental &#39;control room&#39; where you can adjust dials for intensities of feeling.</li>
		</ul>
		</li>
		</ul>
		<p>Remember, the effectiveness of different tools and strategies varies between individuals. Reflect on your preferences and past experiences to identify those that resonate most with you. This preparation will help you to more effectively navigate challenges during your psychedelic experience.</p>
		<p><strong>4. Developing and organising coping strategies (15 minutes)</strong><br>Take about 15 minutes to create a personal reference guide for managing challenges during your psychedelic experience. This task involves two main steps:</p>
		<ol>
		<li><strong>Develop strategies</strong> (10 minutes): For each trigger you identified earlier, think about which coping strategies might help you to manage the challenge. Draw from past experiences or consider new approaches that might work for you, including but not limited to those listed above. For example, for difficult emotions, you could remind yourself that the experience is temporary and that it&#39;s safe to express your feelings, e.g. through speech, active visualisation or creative outputs.  </li>
		<li><strong>Create a reference guide</strong> (5 minutes): Organise your triggers and strategies into a concise table for easy reference. Keep it brief and clear so you can easily remember or refer to it during your session. Remember, your sitter is there to support you, so include their assistance in your strategies if helpful. Use the following format:</li>
		</ol>
		<table>
		<thead>
		<tr>
		<th align="left">Trigger</th>
		<th align="left">Feelings</th>
		<th align="left">Thoughts</th>
		<th align="left">Acceptance</th>
		<th align="left">Action</th>
		</tr>
		</thead>
		<tbody><tr>
		<td align="left">What situation or event might trigger the problem</td>
		<td align="left">What uncomfortable emotions or physical sensations might you notice?</td>
		<td align="left">What unhelpful or distressing thoughts might you get caught up in?</td>
		<td align="left">What can you do to disentangle your thoughts and allow yourself to feel them?</td>
		<td align="left">What action can you take to reduce the unpleasantness?</td>
		</tr>
		<tr>
		<td align="left"></td>
		<td align="left"></td>
		<td align="left"></td>
		<td align="left"></td>
		<td align="left"></td>
		</tr>
		<tr>
		<td align="left"></td>
		<td align="left"></td>
		<td align="left"></td>
		<td align="left"></td>
		<td align="left"></td>
		</tr>
		</tbody></table>
		<p>You&#39;ve now created a personalised plan to help you navigate your psychedelic experience. This preparation is a valuable step towards ensuring it is safe and meaningful. Remember, if you have any questions or concerns about potential triggers, don&#39;t hesitate to contact the experimenters before your session. We&#39;ll set aside time before dosing to review your coping strategies and address any remaining questions. Your trained sitter will be present throughout your experience to provide guidance and support.  </p>
		`,
	};

	const task6 = {
		task: "Planning Integration (30 minutes)",
		time: 30,
		goal: "To develop a personalized integration plan outlining activities and practices you will undertake after your psychedelic session to process and incorporate the experience into your daily life.",
		text: `<p><strong>Integration</strong> is a crucial step in your psychedelic journey. Think of integration as a bridge: On one side is your psychedelic experience, full of insights, emotions and new perspectives. On the other side is your daily life. Integration is how you cross that bridge, carrying the valuable parts of your experience with you. Remember, integration involves not only processing the experience afterwards, but also  preparing for, and handling the psychedelic journey itself. This is why it is especially important to diligently complete all the preparatory steps. In the previous task and in Module 1 we have addressed integration before and during the session. This is what integration involves after the experience:</p>
		<ol>
		<li><strong>Reflection</strong>: Taking time to think about what happened during your experience. What did you feel? What ideas came to you?  </li>
		<li><strong>Processing:</strong> Working through the emotions and thoughts that came up, whether they were challenging or inspiring.  </li>
		<li><strong>Application:</strong> Using your new insights in your daily life. This might mean changing habits, seeing things differently, or solving problems in new ways.  </li>
		<li><strong>Growth:</strong> Taking active steps towards personal development based on what you learned.</li>
		</ol>
		<p>Focusing on integration is an important step towards ensuring that your psychedelic experience has a lasting, positive impact on your life. It&#39;s not just about having a powerful experience – it&#39;s about using that experience to create meaningful, long-term changes in your life. Remember, integration is a personal process. What works best for you might be different from what works for others. The key is to approach it with openness, patience and commitment.</p>
		<p><strong>1. Reflections (5 minutes):</strong><br>Find a quiet space and relax. Reflect on your goals for your psychedelic experience. Write down your thoughts on:</p>
		<ul>
		<li>Personal growth areas (e.g. overcoming fear, increasing empathy)  </li>
		<li>Values you want to connect with (e.g. authenticity, compassion)  </li>
		<li>Things you&#39;d like to accept about yourself or your life  </li>
		<li>Insights or understandings you&#39;re seeking</li>
		</ul>
		<p>There&#39;s no right or wrong way to do this. Your reflections will help to guide your experience.</p>
		<p><strong>2. Integration resources (5 minutes):</strong><br>As you prepare for your psychedelic experience, it&#39;s important to consider how you&#39;ll integrate your insights into your daily life afterwards. Remember that integration is a personal journey, and what works best varies from person to person. Let&#39;s explore some effective methods you might find helpful.</p>
		<ul>
		<li><strong>Self-care</strong> forms the foundation of good integration. In the days following your session, prioritise rest and relaxation. Aim for a full night&#39;s sleep and consider taking some time off work if possible. Nature can be a powerful ally in processing your experience – try spending time in a park, garden or wilderness area each day. You might also benefit from spending less time online during these days, limiting social media use to give yourself space to reflect.  </li>
		<li><strong>Reflection and processing</strong> are key to integration. Many find journaling to be a valuable tool, spending time each day writing about their insights and experiences. Meditation can help you to stay grounded and to continue accessing the mindset from your session. Don&#39;t underestimate the power of sharing – talking with trusted friends or support group members can provide new perspectives and emotional support.  </li>
		<li><strong>Creative expression</strong> often opens new channels for integration. You might feel drawn to visual arts, like drawing or painting, as ways to express what words can&#39;t capture. Music can be deeply moving during this time, whether you&#39;re listening or creating your own. Movement practices like dance or yoga can help you to process emotions and insights too.   </li>
		<li>Other <strong>practices that connect body and mind</strong> can also be particularly powerful for integration. Yoga, tai chi, or simple stretching routines can help you stay present and grounded. Breathwork techniques, from basic deep breathing to more advanced practices, can be calming and insightful. A daily body scan meditation before bed can improve your sleep and body awareness.  </li>
		<li>Lastly, remember that <strong>connection and community</strong> play a vital role in integration. Sharing your experience with understanding friends or family can be profoundly healing. You might consider joining an in-person or a remote integration circle, where you can connect with others on similar journeys. You can also seek the help of a therapist or counsellor. Some people find that acts of kindness or volunteer work help them embody the insights they&#39;ve gained.</li>
		</ul>
		<p>As you read through these suggestions, notice which ones resonate with you. There&#39;s no need to do everything – choose a few practices that feel meaningful and manageable within your daily life. Remember, integration is an ongoing process, so select activities you can sustain over time. Your journey of growth and self-discovery continues long after the dosing day itself.</p>
		<p><strong>3. Integration schedule (10 minutes):</strong><br>Let&#39;s take some time now to create a practical schedule for your integration activities. This plan will help you maintain the insights and benefits you gained from your psilocybin experience over time. We&#39;ll break this down into three phases: the first week, the first month, and the next three months.</p>
		<ol>
		<li>Start by thinking about <strong>the week immediately following your session</strong>. This is a crucial time for integration, so consider planning daily activities. You might want to set aside 15 minutes each morning for meditation and another 15 minutes in the evening for journaling. Write down these <strong>daily commitments</strong>.  </li>
		<li>Next, let&#39;s look at <strong>the first month</strong>. Think about activities you can realistically do <strong>each week</strong>. Maybe you&#39;d like to take a nature walk every Sunday, or attend an integration support group meeting every Thursday evening. Jot down these weekly plans.  </li>
		<li>Finally, consider the <strong>next three months</strong>. What activities can you commit to on a <strong>monthly basis</strong> to keep your integration process going? Perhaps you&#39;d like to schedule a monthly art therapy session, or set aside time at the end of each month to review your integration progress.</li>
		</ol>
		<p>As you&#39;re making this schedule, remember to include a variety of activities. Mix reflection (like journaling) with creative expression (like art), physical activities (like nature walks), and social support (like group meetings). Be realistic about what you can commit to, considering your other life responsibilities. Remember, it&#39;s okay to start small – consistency is more important than quantity. And don&#39;t worry – your plan isn&#39;t set in stone. As you go through your integration journey, feel free to adjust your schedule based on what you find most helpful and manageable.</p>
		<p><strong>4. Support network (5 minutes):</strong><br>As you prepare for your psychedelic experience, it&#39;s important to create a network of people who can support you during your integration journey. This network doesn&#39;t need to include professionals, though it can if you choose. The most crucial aspect is having trusted individuals you can turn to for support and understanding.</p>
		<ol>
		<li>Start by identifying close friends or family members who are open to and supportive of your experience. Plan regular times to connect with them, like weekly walks or video calls, when you can openly discuss your thoughts and feelings.  </li>
		<li>You might also want to explore community support options. Look for psychedelic integration circles or support groups, either in your local area or online. These groups can provide a space in which to share experiences with others who are on similar journeys.  </li>
		<li>If you have access to and are interested in professional support, consider scheduling occasional sessions with a therapist who has experience with psychedelic integration. This is entirely optional but can be helpful for some people.  </li>
		<li>Lastly, it&#39;s wise to <strong>designate an emergency contact</strong> – someone you can reach out to if you need immediate support at any point.</li>
		</ol>
		<p>Remember, the goal is to create a support system that feels right for you. Be open about your needs and plans with your chosen supporters, and make sure they&#39;re comfortable with their role in your integration process. Having this network in place will provide you with understanding, encouragement and a safety net as you navigate your journey.  </p>
		`,
	};

	await db.insert(tasks).values([task1, task2, task3, task4, task5, task5]);
};

export default seed;
