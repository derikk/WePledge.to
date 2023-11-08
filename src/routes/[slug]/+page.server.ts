import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { getPledge, addPledge } from "$lib/server/supabase";

export const load = (async ({ params }) => {
	const pledge = await getPledge(params.slug);
	if (!pledge) throw error(404);

	return { pledge };
}) satisfies PageServerLoad;

export const actions = {
	commit: async ({ locals, params }) => {
		const email = await locals.getSession().then((session) => session?.user?.email);

		if (email) {
			// Submit pledge to DB
			addPledge(email, params.slug);
		} else {
			// Redirect to login
			throw redirect(303, "/auth/signin");
		}
	}
} satisfies Actions;
