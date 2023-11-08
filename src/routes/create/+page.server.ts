import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { insertRow, slugExists } from "$lib/server/supabase";

const generateSlug = async (name: string) => {
	const slugged = name
		.toLowerCase()
		.trim()
		.normalize("NFKD")
		.replace(/\p{Diacritic}/gu, "") // Remove accents
		.replace(/[^\w- ]+/g, "")       // Remove non-word chars
		.replace(/ +/g, "-")            // Replace spaces with dashes
		.replace(/-+/g, "-")            // Remove repeated dashes
		.substring(0, 40)               // Trim to 40 chars
		.replace(/-$/, "");             // Remove terminal dash
	if (await slugExists(slugged)) {
		return `${slugged}-${crypto.randomUUID().substring(24)}`;
	} else {
		return slugged;
	}
};

export const load = (async ({ locals }) => {
	const session = await locals.getSession();
	if (!session) {
		throw redirect(303, "/auth/signin");
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ locals, request }) => {
		const session = await locals.getSession();
		if (!session) {
			throw redirect(303, "/auth/signin");
		}

		const data = await request.formData();

		const name = data.get("evname")?.toString();

		// TODO: Proper form validation
		if (!name) {
			return fail(400, { error: "Name is required" });
		}

		const slug = await generateSlug(name);

		const description = data.get("description")?.toString();

		const deadline = data.get("deadline")?.toString();
		if (!deadline) {
			return fail(400, { name, description, error: "Deadline is required" });
		}

		const resolution = Math.floor(new Date(deadline).getTime() / 1000 + 59);
		if (resolution < Date.now() / 1000) {
			return fail(400, { name, description, error: "Deadline must be in the future" });
		}

		const num_required = Number(data.get("minNumber"));
		if (!num_required) {
			return fail(400, { name, description, deadline, error: "Min number is required" });
		} else if (num_required < 2) {
			return fail(400, { name, description, deadline, error: "Min number must be at least 2" });
		} else if (num_required > 999999) {
			return fail(400, {
				name,
				description,
				deadline,
				error: "Min number must be less than 1 million (contact sales to run a million-man march)"
			});
		}

		const { error } = await insertRow(name, slug, description, resolution, num_required);
		if (error) {
			return fail(400, { error });
		} else {
			throw redirect(303, `/${slug}`);
		}
	}
} satisfies Actions;
