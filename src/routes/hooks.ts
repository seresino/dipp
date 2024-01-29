// // src/hooks.ts
// import { get } from "svelte/store";
// import { authStore } from "$lib/utils/helperFunctions";

// export async function handle({ event, resolve }) {
// 	const authData = get(authStore);
// 	event.cookies.set("userID", null);

// 	const response = await resolve(event);
// 	return response;
// }

import { get } from "svelte/store";
import { session } from "$app/stores";

export async function handle({ event, resolve }) {
	const sessionData = get(session);
	event.locals.res.setHeader(
		"Set-Cookie",
		`userID=${sessionData.userID}; HttpOnly; Path=/`
	);
	// event.locals.res.setHeader('Set-Cookie', `userID=${null}; HttpOnly; Path=/`);

	const response = await resolve(event);
	return response;
}

// // src/lib/routes/dashboard.svelte
// /** @type {import('./$types').LayoutServerLoad} */
// export const load = async ({ cookies }) => {
// const userID = cookies.get("userID");
// console.log("User ID: ", userID);

// authHandlers.js
// const userID = 2;
// const dev = process.env.NODE_ENV === "development";
// cookies.set("userID", userID, {
// 	path: "/",
// 	httpOnly: true,
// 	sameSite: "strict",
// 	secure: !dev,
// 	maxAge: 60 * 60 * 24 * 30,
// });

// // Sessions
// session.set({ authenticated: true, user: newUser });

// const userID = 2
// session.update(value => ({ ...value, userID: newUserID }));
