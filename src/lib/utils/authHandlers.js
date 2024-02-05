import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebase";

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
