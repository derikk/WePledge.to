import { error } from "@sveltejs/kit";
import type { PageServerLoad, Actions } from "./$types";
import { supabase } from "../Supabase.svelte";

export const load = (async ({ params }) => {
	let { data: pledge } = await supabase.from("pledges").select().eq("slug", params.slug).limit(1);

	pledge = pledge?.[0];
	if (!pledge) throw error(404);

	return {
		pledge
	};
}) satisfies PageServerLoad;

export const actions = {
	commit: async ({ request }) => {
		const data = await request.formData();

		console.log(data.get("user_id") + " is committing to this event!!!");
		const pledged = true;
		// TODO: submit pledge to DB
	}
} satisfies Actions;
