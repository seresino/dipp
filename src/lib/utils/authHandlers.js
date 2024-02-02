import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebase";
import { setUserID } from "$lib/utils/helperFunctions";

export const authHandlers = {
	signup: async (username, pass) => {
		const email = username + "@dipp.com";
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			pass
		);
	},
};
