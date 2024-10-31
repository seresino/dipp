import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import type { HandleServerError } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

/*
	You can use a custom redirect if you want...

	function redirect(location: string) {
		return new Response(undefined, {
			status: 303,
			headers: { location },
		})
	}

	...and redirect pages inside hooks.server.ts

	if (!userID) {
		if (event.url.pathname === '/admin') {
			return redirect('/')
		}

		return await resolve(event)
	}

	...but doing it inside `load` for the protected
	routes you can invalidate the data on the page
*/

// export const handleError: HandleServerError = ({ error, event }) => {
// 	throw redirect(303, "/");
// };

// // Original ----------------------------------------------------------------
// export const handle: Handle = async ({ event, resolve }) => {
// 	// get cookies from browser
// 	const userID = event.cookies.get("userID");

// 	if (!userID) {
// 		// if there is no userID load page as normal
// 		return await resolve(event);
// 	}

// 	// find the user based on the userID
// 	const user = await db
// 		.select()
// 		.from(users)
// 		.where(eq(users.id, Number(userID)));

// 	// if `user` exists set `events.local`
// 	if (user) {
// 		event.locals.user = user;
// 	}

// 	// load page as normal
// 	return await resolve(event);
// };

// const nonAuthRoutes = ["/", "/login", "/about"];

// // ----------------------------------------------------------------

// Doesn't trigger when going to a page using redirects ----------------------------------------------------------------
// onMount (() => {
//   const unsubscribe = auth.onAuthStateChanged(async (user) => {
//     const currentPath = $page.url.pathname;

//     if (!user && !nonAuthRoutes.includes(currentPath)) {
//       // window.location.href = "/login";
//       goto("/login");
//       return;
//     }

//     if (!user && currentPath == "/login") {
//       // window.location.href = "/dashboard";
//       goto("/dashboard");
//       return;
//     }

//     if (!user) {
//       return;
//     }
//   });
// });

export const handle: Handle = async ({ event, resolve }) => {
	// Define routes that don’t require authentication
	const nonAuthRoutes = ["/", "/login", "/about"];
	const userID = event.cookies.get("userID");

	// If userID does not exist, check if the route is protected
	if (!userID) {
		// Redirect to home page if trying to access a protected route
		if (!nonAuthRoutes.includes(event.url.pathname)) {
			throw redirect(303, "/"); // redirect to the home page
		}
		// Allow access to non-auth routes without userID
		return await resolve(event);
	}

	// UserID exists; find the user in the database
	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, Number(userID)));

	// If user exists, set it to locals
	// if (user.length > 0) {
	// 	event.locals.user = user[0];
	// }

	if (user) {
		event.locals.user = user;
	}

	// Load page as normal for authenticated users
	return await resolve(event);
};
