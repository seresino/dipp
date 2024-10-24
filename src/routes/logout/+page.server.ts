import { redirect } from "@sveltejs/kit";
import { signOut } from "firebase/auth";
import { auth } from "$lib/firebase/firebase";

export const load = async () => {
	// we only use this endpoint for the api
	// and don't need to see the page
	throw redirect(302, "/");
};

export const actions = {
	default: async ({ cookies }) => {
		cookies.delete("userID", { path: "/" });
		await signOut(auth);

		// redirect the user
		throw redirect(302, "/login");
	},
};
