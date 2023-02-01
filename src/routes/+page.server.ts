import type { PageServerLoad } from "./$types";
import { pledges } from "./data.js";

export const load = (async () => {
	return {
		pledges
	};
}) satisfies PageServerLoad;
