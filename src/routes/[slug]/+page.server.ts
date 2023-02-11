import { error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { getPledge, addPledge } from "$lib/server/supabase";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ params }) => {
	const pledge = await getPledge(params.slug);
	if (!pledge) throw error(404);

	return { pledge };
}) satisfies PageServerLoad;

export const actions = {
	commit: async ({ request, locals, params }) => {
		const data = await request.formData();

		const email = JSON.parse(locals.session.data.user_google_info)["email"];

		const submitted_email = data.get("user_email") as string;

		if (email != submitted_email) {
			// this is bad
			throw redirect(302, "https://controlc.com/7c3d1b58");
		}

		// Submit pledge to DB
		addPledge(submitted_email, params.slug);
	}
} satisfies Actions;
