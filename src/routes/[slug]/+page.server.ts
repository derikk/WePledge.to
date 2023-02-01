import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { pledges } from '../data.js';

export const load = (async ({ params }) => {
	const pledge = pledges.find((pledge) => pledge.slug === params.slug);

	if (!pledge) throw error(404);
	return {
		pledge
	};
}) satisfies PageServerLoad;
