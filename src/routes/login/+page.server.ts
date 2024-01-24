// import db from "$lib/server/db";
// import { users } from "$lib/server/schema";
// import { eq } from "drizzle-orm";

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

import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { writable } from "svelte/store";
import { auth } from "$lib/firebase/firebase";

import db from "$lib/server/db";
import { users } from "$lib/server/schema";
import { desc, eq, and } from "drizzle-orm";

export const actions = {};

export const load = async () => {};
