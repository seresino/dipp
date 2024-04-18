// import db from "$lib/server/db";
// import { users } from "$lib/server/schema";
// import { fail } from "@sveltejs/kit";

// export const actions = {
//   add: async ({ request }) => {
//     const formData = await request.formData();

//     const username = formData.get("username");
//     const password = formData.get("password");
//     const start = formData.get("startDate");
//     const meditation = formData.get("meditation");

//     if (!username || !password || !start || !meditation) {
//       return fail(400, { message: "Input required" });
//     }

//     await db.insert(users).values({
//       username: username,
//       password: password,
//       start: start,
//       meditation: meditation,
//       high_dosage: true,
//     });

//     return { message: "Participant added successfully" };
//   },
// };

import { redirect } from "@sveltejs/kit";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { eq } from "drizzle-orm";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "$lib/firebase/firebase";

export const load = async ({ locals }) => {
	// redirect user if not logged in as admin
	if (locals.user[0].id !== 0) {
		throw redirect(302, "/login");
	}
};

export const actions = {
	add: async ({ cookies, request }) => {
		const data = await request.formData();
		const username = data.get("username");
		const pass = data.get("password");
		const startDate = data.get("startDate");
		const meditation = data.get("meditation");

		// const email = username + "@dipp.com";
		// const userCredential = await createUserWithEmailAndPassword(
		// 	auth,
		// 	email,
		// 	pass
		// );

		// Add new entry to the users table
		await db.insert(users).values({
			username: username,
			password: pass,
			meditation: meditation,
			high_dosage: true,
		});

		// // redirect the user
		// throw redirect(302, "/dashboard");
	},
};
