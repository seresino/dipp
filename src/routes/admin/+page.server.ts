// import db from "$lib/server/db";
// import { users } from "$lib/server/schema";
// import { fail } from "@sveltejs/kit";

// export const actions = {
//   add: async ({ request }) => {
//     const formData = await request.formData();

//     const username = formData.get("username");
//     const password = formData.get("password");
//     const start = formData.get("startDate");
//     const meditation = formData.get("meditation");

//     if (!username || !password || !start || !meditation) {
//       return fail(400, { message: "Input required" });
//     }

//     await db.insert(users).values({
//       username: username,
//       password: password,
//       start: start,
//       meditation: meditation,
//       high_dosage: true,
//     });

//     return { message: "Participant added successfully" };
//   },
// };
