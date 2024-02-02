import { redirect } from "@sveltejs/kit";

import { getDefaultRedirect } from "$lib/utils/helperFunctions";

export const load = async ({ locals }) => {
	// redirect user if not logged in
	if (!locals.user) {
		throw redirect(302, getDefaultRedirect());
	}

	return { user: locals.user };
};
