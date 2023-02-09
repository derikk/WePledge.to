/** @type {import('./$types').LayoutServerLoad} */
export const load = ({ locals }) => {
	return {
		session: locals.session.data // You can also use your old `getSession` function if you wish.
	};
};
