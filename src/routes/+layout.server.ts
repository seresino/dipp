// get `locals.user` and pass it to the page
export const load = async ({ locals }) => {
  console.log("load fn run");
  return {
    user: locals.user,
  };
};
