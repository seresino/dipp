import { redirect } from "@sveltejs/kit";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "$lib/firebase/firebase";

export const load = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		console.log("Admin ID Check:", locals.user[0].id);
		if (locals.user[0].id === 0) {
			throw redirect(302, "/admin");
		}
		throw redirect(302, "/dashboard");
	}
};

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

		console.log("USER(login):", user);
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
		if (user.id === 0) {
			throw redirect(302, "/admin");
		}
		throw redirect(302, "/dashboard");
	},
};
