import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { redirect } from "@sveltejs/kit";

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
