import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "../lib/firebase/firebase";

// import db from "$lib/server/db";
// import { users } from "$lib/server/schema";
// import { desc, eq, and } from "drizzle-orm";

export const authStore = writable({
	userID: null,
	user: null,
	loading: true,
	data: {},
});

// export const authStore = writable({
// 	userID: null,
// });

export const authHandlers = {
	signup: async (email, pass) => {
		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			pass
		);
		const user = userCredential.user;
		authStore.update((curr) => {
			return {
				...curr,
				user: {
					...user,
					email: user.email,
				},
				loading: false,
			};
		});
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

		// // authStore.set({ userID: userID });
		// // @ts-ignore
		// authStore.update({ userID: userID });

		// // authStore.update((curr) => {
		// // 	return {
		// // 		...curr,
		// // 		userID: userID,
		// // 	};
		// // });

		authStore.update((curr) => {
			return {
				...curr,
				userID: 2,
				user: {
					...user,
					email: user.email,
				},
				loading: false,
			};
		});
	},
	logout: async () => {
		await signOut(auth);
		authStore.update((curr) => {
			return {
				...curr,
				user: null,
			};
		});
	},
};

export const getCurrentUserEmail = () => {
	return new Promise((resolve) => {
		authStore.subscribe((value) => {
			resolve(value.user ? value.user.email : null);
		});
	});
};
