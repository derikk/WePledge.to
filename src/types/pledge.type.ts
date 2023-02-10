export type PledgeData = {
	slug: string;
	name: string;
	description?: string;
	deadline: Date;
	num_required: number;
	pledgers: string[];
};
