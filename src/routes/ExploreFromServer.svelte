<script lang="ts">
	import Explore from "./Explore.svelte";
	import Adverbily from "./Adverbily.svelte";
	import type { PledgeData } from "../types/pledge.type";
	import { supabase } from './Supabase.svelte';
	
	console.log(supabase);

	async function getPledges() {
		console.log(supabase);

		let { data: pledges, error } = await supabase
			.from('pledges')
			.select('*');

			let pledgeDataSet = [];
		
			if (error) {
				console.log(error);
			} else {
				console.log(pledges);

				console.log("aaa");
				for (let pledge of pledges!) {  // TODO make this better
					console.log(pledge);
					let currPledge = {} as PledgeData;
					currPledge.title = pledge.name;
					currPledge.slug = pledge.slug;
					currPledge.description = pledge.description;
					currPledge.deadline = new Date(pledge.resolution * 1000);
					currPledge.nr = pledge.num_required;
					currPledge.nc = 0;
					currPledge.pledgers = [""] as string[];

					pledgeDataSet.push(currPledge);
				}
				console.log("bbb");

				console.log("ccc");
				console.log(pledges);
				console.log("ddd");

				return pledgeDataSet as PledgeData[];
			}
	}

	let pledgePromise = getPledges();

	let name = "";
	let slug = "go-running-at-7-am";

	getPledges();

	function updateSlug() {
		let fixed = name.toLowerCase().trim().replace(/[\W_]+/g,"-");
            
        for (let i = 0; i < 10; i++) {
            fixed = fixed.replace("--", "-");
        }
            
        while (fixed.slice(-1) == "-") {
            fixed = fixed.slice(0,-1);
        }
            
        while (fixed.slice(0, 1) == "-") {
            fixed = fixed.slice(1);
        }
            
        slug = fixed;
	}
</script>

{#await pledgePromise}
	<p>Loading pledges <Adverbily /></p>
{:then pledgesList}
	<Explore pledges={pledgesList ?? []} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
