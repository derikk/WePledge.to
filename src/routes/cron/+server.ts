import type { RequestHandler } from './$types';
import { getPledges, editPledge } from '$lib/server/supabase';
import { Resend } from 'resend';
import { RESEND_KEY } from '$env/static/private';

export const GET: RequestHandler = async () => {
	const pledges = await getPledges();
	const now = new Date();
	const resend = new Resend(RESEND_KEY);

	for (const pledge of pledges.filter((pledge) => !pledge.completed)) {
		const num_committed = pledge.committed.length;
		const num_required = pledge.num_required;

		if (num_committed >= num_required) {
			editPledge(pledge.slug, { completed: true })

			for (const email of pledge.committed) {
				resend.emails.send({
					from: "WePledge.to <noreply@wepledge.to>",
					to: email,
					subject: `[${pledge.name}] IT'S HAPPENING!!!`,
					text: `Hi! The event "${pledge.name}" is happening—${num_committed} people committed to it!!!!!

					Details: https://wepledge.to/${pledge.slug}

					Now you have to do it :)
									
					Thank you,
					Derik + Andrew ♥`.replace('\t', '')
				});
			}
		} else if (pledge.deadline < now) { // If deadline has passed without enough pledges
			editPledge(pledge.slug, { completed: true })

			if (num_committed === 1) {
				resend.emails.send({
					from: "WePledge.to <noreply@wepledge.to>",
					to: pledge.committed[0],
					subject: `[${pledge.name}] You're off the hook!`,
					text: `Hi! The event "${pledge.name}" is not happening—you were the only one who pledged to do it 😞

					Details: https://wepledge.to/${pledge.slug}
														
					Thank you,
					Derik + Andrew ♥`.replace('\t', '')
				});
			} else {
				for (const email of pledge.committed) {
					resend.emails.send({
						from: "WePledge.to <noreply@wepledge.to>",
						to: email,
						subject: `[${pledge.name}] You're off the hook!`,
						text: `Hi! The event "${pledge.name}" is not happening—only ${num_committed} people pledged to do it, out of ${num_required} required for it to happen.

						Details: https://wepledge.to/${pledge.slug}
															
						Thank you,
						Derik + Andrew ♥`.replace('\t', '')
					});
				}
			}
		}
	}

	return new Response();
};