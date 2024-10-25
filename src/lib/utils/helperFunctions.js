import { authHandlers } from "$lib/utils/authHandlers";

// // Start date for testing purposes --------------------------------
// const startDate = new Date("2024-04-12");
// // Todays date for testing purposes --------------------------------
// const today = new Date("2024-02-01");

function subtractDatesInDays(date1, date2) {
	date1.setUTCHours(0, 0, 0, 0);
	date2.setUTCHours(0, 0, 0, 0);
	// Calculate the time difference in milliseconds
	const differenceInMilliseconds = date1.getTime() - date2.getTime();

	// Convert milliseconds to days
	const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

	return differenceInDays;
}

function daysSince(date) {
	const today = new Date();

	// Todays date for testing purposes --------------------------------
	// const today = new Date("2024-11-11");

	return subtractDatesInDays(today, date);
}

function daysSinceStart() {
	// Live site will use todays date like below - uncomment this lines --------------------------------
	// return daysSince(startDate)

	return subtractDatesInDays(today, startDate);
}

export function getDay(startDate) {
	return daysSince(new Date(startDate)) + 1;
	// return daysSinceStart() + 1;
}

export function getModuleID(startDate) {
	return Math.floor(daysSince(new Date(startDate)) / 7) + 1;
}

export function getTodaysDate() {
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);
	return today;
}

// // Date Segments
// const currentDate = new Date();
// const year = currentDate.getFullYear();
// const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
// const day = currentDate.getDate().toString().padStart(2, '0');

// const formattedDate = `${year}-${month}-${day}`;
// const formattedDate2 = currentDate.toLocaleDateString()

export function truncateWords(str, numWords) {
	return str.split(" ").splice(0, numWords).join(" ");
}

export function retrieveAnswers(questionnaire) {
	let answers = [];
	questionnaire.forEach((question, index) => {
		if (question.type === "graph") {
			answers.push(`${question.answer.x},${question.answer.y} `);
		} else if (question.type === "scale") {
			answers.push(`${question.answer} `);
		}
	});
	return answers;
}

export { authHandlers };

export function getDefaultRedirect() {
	return "/login";
}
