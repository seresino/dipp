import { redirect, fail } from "@sveltejs/kit";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth } from "$lib/firebase/firebase";
import { encryptId } from "$lib/utils/helperFunctions";

export const load = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
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

		// Validate form inputs
		if (!username || !pass) {
			return fail(400, { invalid: true });
		}

		try {
			const email = username + "@dipp.com";
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				pass
			);

			const userQuery = await db
				.select()
				.from(users)
				.where(eq(users.username, username.toString().toUpperCase()));

			if (!userQuery.length) {
				return fail(400, { credentials: true });
			}

			const user = userQuery[0];

			console.log("USER(login):", user);
			cookies.set("userID", encryptId(user.id.toString()), {
				path: "/",
				httpOnly: true,
				sameSite: "strict",
				secure: process.env.NODE_ENV === "production",
				maxAge: 60 * 60 * 24 * 30,
			});

			// redirect the user
			if (user.id === 0) {
				redirect(302, "/admin");
			}
			redirect(302, "/dashboard");
		} catch (error) {
			console.error("Login error:", error);

			if (error instanceof FirebaseError) {
				// Handle specific Firebase Auth errors
				switch (error.code) {
					case "auth/user-not-found":
					case "auth/invalid-credential":
						return fail(400, { credentials: true });
					default:
						return fail(500, { serverError: true });
				}
			}

			return redirect(302, "/login");
		}
	},
};
