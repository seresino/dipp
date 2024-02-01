import { redirect } from "@sveltejs/kit";
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

// export const actions = {
// 	login: async ({ request }) => {
// 		// Get the form data from the request
// 		const formData = await request.formData();

// 		// Get the username from the form data
// 		const username = formData.get("username");
// 		const pass = formData.get("password");

// 		// 	// Update message if username empty
// 		// 	if (!username) {
// 		// 		return fail(400, { message: "Title is required" });
// 		// 	}

// 		const email = username + "@dipp.com";
// 		const userCredential = await signInWithEmailAndPassword(
// 			auth,
// 			email,
// 			pass
// 		);
// 		// const user = userCredential.user;

// 		// REMOVE IN REAL THING --------------------------------
// 		const user = await getUserByUsername(username);
// 		console.log("login function user :", user);

// 		const userID = await getUserIDByUsername(username);
// 		console.log("login function UserID: ", userID);

// 		setUserID(userID);
// 		// setUserID(2);

// 		// 	return { message: "User added successfully" };
// 	},
// };

export const actions = {
	login: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get("username");
		const pass = data.get("password");

		const email = username + "@dipp.com";
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			pass
		);

		const userQuery = await db
			.select()
			.from(users)
			.where(eq(users.username, username.toUpperCase()));
		const user = userQuery[0];

		console.log("USER:", user);
		cookies.set("userID", user.id, {
			// send cookie for every page
			path: "/",
			// server side only cookie so you can't use `document.cookie`
			httpOnly: true,
			// only requests from same site can send cookies
			// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
			sameSite: "strict",
			// only sent over HTTPS in production
			secure: process.env.NODE_ENV === "production",
			// set cookie to expire after a month
			maxAge: 60 * 60 * 24 * 30,
		});

		// redirect the user
		throw redirect(302, "/dashboard");
	},
};
