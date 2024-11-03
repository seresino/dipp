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