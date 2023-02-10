<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	$: session = $page.data.session;
	import Login from "../Login.svelte";

	export let data: PageData;
	const pledge = data.pledge;
	export let pledged: boolean = false;

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

	let sexporn = "69";

	let senddata = "";

	if (data.session?.user_google_info == undefined) {
		senddata = JSON.parse("{}");
	} else {
		senddata = JSON.parse(data.session.user_google_info);
	}
</script>

<Login userdata={senddata}/>

<h1>{pledge.name}</h1>
{#if pledge.description}
	<p>{pledge.description}</p>
{/if}

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

{#if data.session?.user_google_info == undefined}
	<p>gotta llog in to pledge</p>
{:else}
	<form method="POST" action="?/commit">
		<fieldset>
			<legend>Commit to this event</legend>
			<input type="hidden" name="slug" value={pledge.slug} />
			<input type="hidden" name="user_id" value={data.session?.given_name} />
			{#if !pledged}
				<button>Pledge</button>
			{:else}
				<p>alredy pledged!</p>
			{/if}
		</fieldset>
	</form>
{/if}


<button on:click={share}>Share</button>

<style>
	meter {
		width: 100%;
	}

	summary h3 {
		display: inline-block;
	}
</style>
