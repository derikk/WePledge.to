<script lang="ts">
	import type { PageData } from "./$types";
	import { page } from "$app/stores";
	$: session = $page.data.session;
	import Login from "../Login.svelte";

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

	const senddata = JSON.parse(data.session?.user_google_info || "{}");
</script>

<Login userdata={senddata} />

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
	Must commit by {pledge.deadline.toLocaleDateString()}
	at {pledge.deadline.toLocaleTimeString()}
</h3>

{#if data.session?.user_google_info == undefined}
	<p>gotta log in to pledge!</p>
{:else}
	<form method="POST" action="?/commit">
		<fieldset>
			<legend>Commit to this event</legend>
			<input type="hidden" name="slug" value={pledge.slug} />
			<input type="hidden" name="user_id" value={senddata["name"]} />
			<input type="hidden" name="user_email" value={senddata["email"]} />
			{#if !pledge.committed.includes(senddata["email"])}
				<p style="font-weight: normal;">
					By committing to this event, you promise to actually do the collective action if {pledge.num_required}
					people pledge to as well.
				</p>

				<p style="font-weight: normal;">Don't commit to something you're not willing to do!!</p>

				<details>
					<summary>Agree to terms and pledge</summary>
					<button>Pledge</button>
				</details>
			{:else}
				<p>You've already pledged!</p>
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
