<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";

	export let data: PageData;
	const pledge = data.pledge;

	function share() {
		if (navigator.share) {
			navigator.share({
				title: pledge.name,
				text: `Join me and pledge to "${pledge.name}"!`,
				url: $page.url.toString()
			});
		} else {
			alert("Sharing not supported :(");
		}
	}
</script>

<h1>{pledge.name}</h1>
<p>{pledge.description}</p>

<meter value={pledge.committed.length} min="0" max={pledge.num_required} />

<details>
	<summary>
		<h3>People committed: {pledge.committed.length}/{pledge.num_required}</h3>
	</summary>
	<ol>
		{#each pledge.committed as pledger}
			<li>{pledger}</li>
		{/each}
	</ol>
</details>
<h3>
	Must commit by {new Date(pledge.resolution * 1000).toLocaleDateString()}
	at {new Date(pledge.resolution * 1000).toLocaleTimeString()}
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
