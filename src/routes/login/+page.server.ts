import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { desc, eq, and } from "drizzle-orm";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebase";
import { authStore, setUserID, authHandlers } from "$lib/utils/helperFunctions";

// export async function load({ session }) {
//   const email = session.user?.email;
//   if (email) {
//     const dbUser = await db
//       .select()
//       .from(users)
//       .where(eq(users.username, email));

//      if (dbUser) {
//        return {
//          dbUser: dbUser[0],
//        };
//      }
//   }
// };

async function getUserByUsername(username) {
	const userQuery = await db
		.select()
		.from(users)
		.where(eq(users.username, username));
	return userQuery[0];
}
async function getUserIDByUsername(username) {
	return getUserByUsername(username).id;
}

export const actions = {
	login: async ({ request }) => {
		// Get the form data from the request
		const formData = await request.formData();

		// Get the username from the form data
		const username = formData.get("username");
		const pass = formData.get("password");

		const email = username + "@dipp.com";
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			pass
		);
		// const user = userCredential.user;

		const user = await getUserByUsername(username);
		console.log("login function user :", user);

		const userID = await getUserIDByUsername(username);

		console.log("login function UserID: ", userID);

		setUserID(userID, false, user);
		// setUserID(2, false, user);
	},

	// add: async ({ request }) => {
	// 	// Get the form data from the request
	// 	const formData = await request.formData();

	// 	// Get the username from the form data
	// 	const username = formData.get("username");

	// 	// Update message if username empty
	// 	if (!username) {
	// 		return fail(400, { message: "Title is required" });
	// 	}

	// 	// Finally, add entry to the database
	// 	await db.insert(users).values({
	// 		username: username,
	// 		password: "pass",
	// 		high_dosage: true,
	// 	});

	// 	return { message: "User added successfully" };
	// },

	// login: async (username, pass) => {
	// 	const email = username + "@dipp.com";
	// 	const userCredential = await signInWithEmailAndPassword(
	// 		auth,
	// 		email,
	// 		pass
	// 	);
	// 	const user = userCredential.user;
	// 	const userID = getUserIDByUsername(username);

	// 	setUserID(userID, false, user);
	// 	// setUserID(2, false, user);
	// },
};

export const load = async () => {};
