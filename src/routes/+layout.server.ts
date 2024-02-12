// get `locals.user` and pass it to the page
export const load = async ({ locals }) => {
	return {
		user: locals.user,
	};
};
