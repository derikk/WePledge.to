import { error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { getPledge } from "$lib/server/supabase";

export const load = (async ({ params }) => {
	const pledge = await getPledge(params.slug);
	if (!pledge) throw error(404);

	return { pledge };
}) satisfies PageServerLoad;

export const actions = {
	commit: async ({ request }) => {
		const data = await request.formData();

		console.log(data.get('user_id') + " is committing to this event!!!");
		const pledged = true;
		// TODO: submit pledge to DB
	}
} satisfies Actions;
