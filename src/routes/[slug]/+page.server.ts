import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { getPledge, signPledge } from "$lib/server/supabase";

export const load = (async ({ params, locals }) => {
	const pledge = await getPledge(params.slug);
	if (!pledge) throw error(404);

	// Get the current user's email if they are signed in
	const userEmail = await locals.auth().then((session) => session?.user?.email);

	// Redact the emails from the pledge data sent to client
	// Keep the current user's email if they are signed in
	// TODO: use `committed_count` instead of length of `committed` array
	pledge.committed = pledge.committed.map(email => email === userEmail ? userEmail : "")

	// Redact names from anonymous pledges
	if (pledge.anonymous && pledge.committed.length < pledge.num_required) {
		pledge.committed_names = [];
	}

	return { pledge };
}) satisfies PageServerLoad;

export const actions = {
	commit: async ({ locals, params }) => {
		const email = await locals.auth().then((session) => session?.user?.email);
		const name = await locals.auth().then((session) => session?.user?.name);

		if (email && name) {
			// Submit pledge to DB with the name <email> format
			await signPledge(params.slug, email, name);
		} else {
			// Redirect to login if email or name is missing
			throw redirect(303, "/auth/signin");
		}
	}
} satisfies Actions;
