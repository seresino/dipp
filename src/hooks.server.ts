import type { Handle } from "@sveltejs/kit";
import { eq } from "drizzle-orm";
import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { redirect } from "@sveltejs/kit";
import { decryptId } from "$lib/utils/helperFunctions";

export const handle: Handle = async ({ event, resolve }) => {
	const nonAuthRoutes = ["/", "/login", "/about"];
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

	if (user) {
		event.locals.user = user;
	}

	return await resolve(event);
};
