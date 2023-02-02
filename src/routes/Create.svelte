<script lang="ts">
	let name: string = "";
	let description: string = "";
	let slug: string = "go-running-at-7-am";
	let resolutionRaw: string = "2023-02-08T23:59";
	let nr: number = 2;

	function hash(s: string) {
		var hash = 0,
			i,
			chr;
		if (s.length === 0) return hash;
		for (i = 0; i < s.length; i++) {
			chr = s.charCodeAt(i);
			hash = (hash << 5) - hash + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	function updateSlug() {
		let fixed = name
			.toLowerCase()
			.trim()
			.replace(/[\W_]+/g, "-");

		for (let i = 0; i < 10; i++) {
			fixed = fixed.replace("--", "-");
		}

		while (fixed.slice(-1) == "-") {
			fixed = fixed.slice(0, -1);
		}

		while (fixed.slice(0, 1) == "-") {
			fixed = fixed.slice(1);
		}

		slug = fixed;
	}

	import { supabase } from "./Supabase.svelte";

	async function insertRow(
		name: string,
		slug: string,
		uid: string,
		description: string,
		resolution: number,
		nr: number
	) {
		const { data, error } = await supabase.from("pledges").insert([
			{
				uid: uid,
				name: name,
				slug: slug,
				description: description,
				resolution: resolution,
				num_required: nr
			}
		]);

		if (error) {
			console.log(error);
		}
	}

	// let createPromise = insertRow("Test name", "test-slug", "testid", "test description", 12345, 1);

	function handleOnSubmit() {
		console.log("I'll handle it!");

		let uid = hash(name).toString();
		let resolution = Math.floor(new Date().getTime() / 1000);

		let resultPromise = insertRow(name, slug, uid, description, resolution, nr);

		resultPromise.then(function () {
			window.location.reload();
		});
	}
</script>

<h2>Create a pledge</h2>

<form on:submit={handleOnSubmit}>
	<fieldset>
		<legend>Create an event</legend>

		<label for="evname">Name</label>
		<input
			type="text"
			id="evname"
			name="evname"
			bind:value={name}
			placeholder="Go running at 7 am"
			on:keydown={updateSlug}
			required
		/>
		<br />

		<label for="description">Description</label>
		<textarea
			id="description"
			name="description"
			bind:value={description}
			rows="7"
			placeholder="Let's run to Oakland Thursday morning! I'll do it if five people join me."
		/>
		<br />

		<label for="resolution">Deadline</label>
		<input
			type="datetime-local"
			id="resolution"
			name="resolution"
			bind:value={resolutionRaw}
			required
		/>
		<br />

		<input type="hidden" name="tz" id="tz" value="Unknown" />

		<label for="minNumber">Min Number</label>
		<input
			type="number"
			id="minNumber"
			name="minNumber"
			placeholder="5"
			min="2"
			max="999999"
			bind:value={nr}
			required
		/>
		<br />

		<label for="slug">Slug</label>
		<input type="text" id="slug" name="slug" placeholder={slug} bind:value={slug} required />
		<br />

		<input type="submit" />
	</fieldset>
</form>
