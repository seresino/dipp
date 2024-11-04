import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { redirect } from "@sveltejs/kit";
import { getDay, decryptId } from "$lib/utils/helperFunctions";

export const handle: Handle = async ({ event, resolve }) => {
	const nonAuthRoutes = ["/", "/login", "/logout", "/about", "/welcome", "/complete", "/api/test-seed"];
	const encryptedUserId = event.cookies.get("userID");

	if (!encryptedUserId) {
		if (!nonAuthRoutes.includes(event.url.pathname)) {
			throw redirect(303, "/");
		}
		return await resolve(event);
	}

	// Decrypt the userID before using it
	const userID = decryptId(encryptedUserId);
	
	// If decryption failed, treat as unauthorized
	if (!userID) {
		if (!nonAuthRoutes.includes(event.url.pathname)) {
			throw redirect(303, "/");
		}
		return await resolve(event);
	}

	const user = await db
		.select()
		.from(users)
		.where(eq(users.id, Number(userID)));

	event.locals.user = user;

	const day = getDay(user[0].start_date);
	// Only redirect if trying to access a protected route
	if (!nonAuthRoutes.includes(event.url.pathname)) {
		if (day < 1) {
			throw redirect(303, "/welcome");
		} else if (day > 21) {
			throw redirect(303, "/complete");
		}
	}

	return await resolve(event);
};
