import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { desc, eq, and } from "drizzle-orm";

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { auth } from "$lib/firebase/firebase";
import { authStore, setUserID, authHandlers } from "$lib/utils/helperFunctions";

// export async function load({ session }) {
//   const email = session.user?.email;
//   if (email) {
//     const dbUser = await db
//       .select()
//       .from(users)
//       .where(eq(users.username, email));

//      if (dbUser) {
//        return {
//          dbUser: dbUser[0],
//        };
//      }
//   }
// };

export const actions = {
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
		const userQuery = await db
			.select()
			.from(users)
			.where(eq(users.username, username));
		const userID = userQuery[0].id;

		// // authStore.set({ userID: userID });
		// // @ts-ignore
		// authStore.update({ userID: userID });

		// // authStore.update((curr) => {
		// // 	return {
		// // 		...curr,
		// // 		userID: userID,
		// // 	};
		// // });

		setUserID(userID, false);

		authStore.update((curr) => {
			return {
				...curr,
				userID: userID,
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
		setUserID(null);
		authStore.update((curr) => {
			return {
				...curr,
				user: null,
			};
		});
	},
};

export const load = async () => {};
