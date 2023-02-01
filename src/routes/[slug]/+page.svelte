<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";

	export let data: PageData;
	const pledge = data.pledge;

	function share() {
		if (navigator.share) {
			navigator.share({
				title: pledge.title,
				text: `Join me and pledge to "${pledge.title}"!`,
				url: $page.url.toString()
			});
		} else {
			alert("Sharing not supported :(");
		}
	}
</script>

<h1>{pledge.title}</h1>
<p>{pledge.description}</p>

<meter value={pledge.nc} min="0" max={pledge.nr} />

<details>
	<summary><h3>People committed: {pledge.nc}/{pledge.nr}</h3></summary>
	<ol>
		{#each pledge.pledgers as pledger}
			<li>{pledger}</li>
		{/each}
	</ol>
</details>
<h3>
	Must commit by {pledge.deadline.toLocaleDateString()} at {pledge.deadline.toLocaleTimeString()}
</h3>

<form method="POST" action="?/commit">
	<fieldset>
		<legend>Commit to this event</legend>
		<input type="hidden" name="slug" value={pledge.slug} />
		<label>Email: <input type="email" name="email" required /></label>
		<button>Pledge</button>
	</fieldset>
</form>

<button on:click={share}>Share</button>

<style>
	meter {
		width: 100%;
	}

	summary h3 {
		display: inline-block;
	}
</style>
