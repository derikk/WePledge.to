import { SUPABASE_URL, SUPABASE_KEY } from "$env/static/private";
import { createClient } from "@supabase/supabase-js";
const db = createClient(SUPABASE_URL, SUPABASE_KEY);
import type { PledgeData } from "$lib/types/pledge.type";

export const getPledges = async () => {
	const now = new Date().toISOString();
	const { data: pledges, error } = await db.from("pledges").select().order("deadline", { ascending: true }).gt("deadline", now);

	if (error) throw new Error(error.message);
	if (!pledges) return [];

	return pledges.map((pledge) => ({ ...pledge, deadline: new Date(pledge.deadline) })) as PledgeData[];
};

export const getPledge = async (slug: string) => {
	const { data, error } = await db.from("pledges").select().eq("slug", slug).limit(1).maybeSingle();
	if (error) throw new Error(error.message);
	if (!data) return null;
	return { ...data, deadline: new Date(data.deadline) } as PledgeData;
};

export const slugExists = async (slug: string) => {
	return (await db.from("pledges").select("slug").eq("slug", slug).limit(1))?.data?.length === 1;
};

export const createPledge = async (
	name: string,
	slug: string,
	description: string | undefined,
	deadline: string,
	num_required: number
) => {
	return await db.from("pledges").insert({
		name,
		slug,
		description,
		deadline,
		num_required
	});
};

export const signPledge = async (slug: string, email: string, name: string) => {
	const pledge = await getPledge(slug);
	if (!pledge) throw new Error("Pledge does not exist");
	const current_committed = pledge.committed;
	const current_committed_names = pledge.committed_names;

	if (current_committed.includes(email)) return;

	console.log("Current committed")
	console.log(current_committed)
	console.log("Names:")
	console.log(current_committed_names)
	console.log("Type of names:")
	console.log(typeof current_committed_names)

	current_committed.push(email);
	current_committed_names.push(name);

	return await db
		.from("pledges")
		.update({
			committed: current_committed,
			committed_names: current_committed_names
		})
		.eq("slug", slug);
};

export const editPledge = async (slug: string, pledgeData: Partial<PledgeData>) => {
	const pledge = await getPledge(slug);
	if (!pledge) throw new Error("Pledge does not exist");

	return await db.from("pledges").update(pledgeData).eq("slug", slug);
};