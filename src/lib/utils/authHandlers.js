import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebase";
import { authStore, setUserID } from "$lib/utils/helperFunctions";

export const authHandlers = {
	signup: async (username, pass) => {
		const email = username + "@dipp.com";
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			pass
		);
		const user = userCredential.user;
		setUserID(2);
	},
	login: async (username, pass) => {
		const email = username + "@dipp.com";
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			pass
		);
		const user = userCredential.user;
		// const userQuery = await db
		// 	.select()
		// 	.from(users)
		// 	.where(eq(users.username, username));
		// const userID = userQuery[0].id;

		// setUserID(userID, false, user);
		// setUserID(null); // null user
		console.log("login");
		setUserID(2);
	},
	logout: async () => {
		await signOut(auth);
		console.log("logout");
		setUserID(null);
	},
};
