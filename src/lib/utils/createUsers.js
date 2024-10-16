import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebase";

export const authHandlers = {
	signup: async (username, pass) => {
		const email = username + "@dipp.com";
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			pass
		);
	},
	test: async (u) => {
		console.log("test");
	},
};

export function processCSV() {
	// Get the input element
	var fileInput = document.getElementById("csvFileInput");

	// Check if a file is selected
	if (fileInput.files.length > 0) {
		// Get the selected file
		var file = fileInput.files[0];

		// Create a new FileReader
		var reader = new FileReader();

		let highMeditation;
		let high;
		let lowMeditation;
		let low;
		// Set up the onload event to handle the file reading
		reader.onload = function (e) {
			// Get the content of the CSV file
			var csvContent = e.target.result;

			// Split the content into lines
			var lines = csvContent.split("\n").slice(2);

			// Process each line
			let usernames;
			lines.forEach(function (line) {
				// Do something with each line (e.g., save it, process it, etc.)
				usernames = line.split(",");
				highMeditation.push(usernames[0])
				high.push(usernames[1])
				lowMeditation.push(usernames[2])
				low.push(usernames[3])
				
				console.log(line);

				// You can perform additional actions with each line here

				// For example, you may want to save each line to a server
				// using an AJAX request or perform other processing tasks.
			});
		};

		// Read the file as text
		reader.readAsText(file);
	} else {
		alert("Please select a CSV file");
	}
}

function add(username) {
	// Finally, add entry to the database
	await db.insert(users).values({
		username: username,
		password: "pass",
		meditation: true,
		high_dosage: true,
	});

	await db.insert(users).values({
		username: username,
		password: "pass",
		high_dosage: true,
	});

	await db.insert(users).values({
		username: username,
		password: "pass",
		meditation: true,
		high_dosage: false,
	});

	await db.insert(users).values({
		username: username,
		password: "pass",
		high_dosage: false,
	});

	return { message: "User added successfully" };
},

export function test() {
	console.log("hello");
}
