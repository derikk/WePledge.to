<script lang="ts">
	const SUPABASE_URL = "https://dxxqsxgjhtktuubksoro.supabase.co";
	const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4eHFzeGdqaHRrdHV1Ymtzb3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyODk5ODYsImV4cCI6MTk5MDg2NTk4Nn0.TbSwx-9fy_zVUOdP9xNgjGYkuOeGZFFXt5LB0PYL2uw";


	import Explore from "./Explore.svelte";
	import type { PledgeData } from "../types/pledge.type";
	
	import { createClient } from '@supabase/supabase-js'
	import { dataset_dev } from 'svelte/internal';

	
	const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

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
					currPledge.deadline = new Date('December 17, 1995 03:24:00');//new Date(pledge.resolution);
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

<h2>Create a pledge</h2>

{#await pledgePromise}
	<p>...waiting</p>
{:then pledgesList}
	<b>{pledgesList}</b>
	<Explore pledges={pledgesList ?? []} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}

<form method="post">
	<fieldset>
	<legend>Create an event</legend>

	<label for="evname">Name</label>
	<input type="text" id="evname" name="evname" bind:value={name} placeholder="Go running at 7 am" on:keydown="{updateSlug}" required>
	<br>
	
	<label for="description">Description</label>
	<textarea id="description" name="description" rows="7" placeholder="Let's run to Oakland Thursday morning! I'll do it if five people join me."></textarea>
	<br>
	
	<label for="resolution">Deadline</label>
	<input type="datetime-local" id="resolution"
		name="resolution" value="2023-02-08T23:59" required>
	<br>
	
	<input type="hidden" name="tz" id="tz" value="Unknown">
	
	<label for="minNumber">Min Number</label>
	<input type="number" id="minNumber" name="minNumber" placeholder="5" min=2 max=999999 required>
	<br>
	
	<label for="slug">Slug</label>
	<input type="text" id="slug" name="slug" placeholder="{slug}" required>
	<br>
	
	<input type="submit">
	</fieldset>
</form>