import type { PageServerLoad } from "./$types";
import type { PageData } from "@sveltejs/kit";
// import { pledges } from "./data.js";

// export const load = (async () => {
// 	return {
// 		// pledges
// 	};
// }) satisfies PageServerLoad;

export const load = (async( {parent} ) => {
	const { session } = await parent();
	// or
	// locals.session.data.session;


	// Already logged in:
	// if(session.userId) {
		// throw redirect(302, '/')
	// }

	return {};
}) satisfies PageServerLoad;
