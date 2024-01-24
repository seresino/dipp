// import db from "$lib/server/db";
// import { users } from "$lib/server/schema";
import { desc, eq, and } from "drizzle-orm";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebase";
import { authStore, setUserID } from "$lib/utils/helperFunctions";

// import { authHandlers, authStore, getCurrentUserEmail } from "../store/store";

// import { authHandlers } from "$lib/utils/authHandlers";
// import { authStore, getCurrentUserEmail } from "$lib/utils/helperFunctions";

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

		// setUserID(userID, false, user);
		setUserID(2, false, user);

		// authStore.update((curr) => {
		// 	return {
		// 		...curr,
		// 		userID: userID,
		// 		user: {
		// 			...user,
		// 			email: user.email,
		// 		},
		// 		loading: false,
		// 	};
		// });

		// authStore.update((curr) => {
		//     return {
		//         userID: userID,
		//         user: {
		//             email: user.email,
		//             // Add other properties of `user` here
		//         },
		//         loading: loading,
		//         // Add other properties of `curr` here
		//     };
		// });
	},
	logout: async () => {
		await signOut(auth);
		setUserID(null);
		authStore.update((curr) => {
			return {
				...curr,
				user: null,
			};
		});
	},
};

// function getUserIDByUsername(username) {
//     const userQuery = await db
// 			.select()
// 			.from(users)
// 			.where(eq(users.username, username));
// 		return userQuery[0].id;
// }
