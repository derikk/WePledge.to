const SUPABASE_URL = "https://dxxqsxgjhtktuubksoro.supabase.co";
const SUPABASE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4eHFzeGdqaHRrdHV1Ymtzb3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyODk5ODYsImV4cCI6MTk5MDg2NTk4Nn0.TbSwx-9fy_zVUOdP9xNgjGYkuOeGZFFXt5LB0PYL2uw";

import { createClient } from "@supabase/supabase-js";
const db = createClient(SUPABASE_URL, SUPABASE_KEY);
import type { PledgeData } from "../../types/pledge.type";

export const getPledges = async () => {
	let { data: pledges, error } = await db.from("pledges").select();

	if (error) throw new Error(error.message);
	if (!pledges) return [];

	return pledges.map((pledge) => ({ ...pledge, deadline: new Date(pledge.resolution * 1000) })) as PledgeData[];
};

export const getPledge = async (slug: string) => {
	const { data, error } = await db.from("pledges").select().eq("slug", slug).limit(1).maybeSingle();
	if (error) throw new Error(error.message);
	data.committed = eval(data.committed);
	return { ...data, deadline: new Date(data.resolution * 1000) } as PledgeData;
};

export const slugExists = async (slug: string) => {
	return (await db.from("pledges").select("slug").eq("slug", slug).limit(1))?.data?.length === 1;
};

export const insertRow = async (
	name: string,
	slug: string,
	description: string | undefined,
	resolution: number,
	num_required: number
) => {
	return await db.from("pledges").insert({
		name,
		slug,
		description,
		resolution,
		num_required,
		committed: []
	});
};

export const addPledge = async (email: string, slug: string) => {
	let pledge: PledgeData = await getPledge(slug);

	let current_committed: string[] = eval(pledge.committed);

	current_committed.push(email);

	return await db
		.from("pledges")
		.update({
			committed: current_committed
		})
		.eq("slug", slug);
};
