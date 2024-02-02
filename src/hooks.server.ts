import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";

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

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const userID = event.cookies.get("userID");

	if (!userID) {
		// if there is no userID load page as normal
		return await resolve(event);
	}

	// find the user based on the userID
	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, Number(userID)));

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = user;
	}

	// load page as normal
	return await resolve(event);
};
