import type { PageServerLoad } from "./$types";
import { getPledges } from "$lib/server/supabase";

export const load = (async () => {
	const pledges = getPledges();
	return { pledges };
}) satisfies PageServerLoad;
