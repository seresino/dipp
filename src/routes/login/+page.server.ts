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
async function getUserIDByUsername(username) {
	const userQuery = await db
		.select()
		.from(users)
		.where(eq(users.username, username));
	return userQuery[0].id;
}

export const actions = {
	login: async (username, pass) => {
		const email = username + "@dipp.com";
		const userCredential = await signInWithEmailAndPassword(
			auth,
			email,
			pass
		);
		const user = userCredential.user;
		const userID = getUserIDByUsername(username);

		setUserID(userID, false, user);
		// setUserID(2, false, user);
	},
};

export const load = async () => {};
