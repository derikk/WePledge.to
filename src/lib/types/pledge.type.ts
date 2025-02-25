export type PledgeData = {
	slug: string;
	name: string;
	description?: string;
	deadline: Date;
	num_required: number;
	committed: string[];
	committed_names: string[];
	completed: boolean;
	anonymous: boolean;
	manifold_id: string;
	manifold_slug: string;
};
