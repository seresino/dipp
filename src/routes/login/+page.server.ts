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
