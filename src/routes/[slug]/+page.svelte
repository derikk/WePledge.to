<script lang="ts">
	import { page } from "$app/stores";

	import SignInButton from "$lib/SignInButton.svelte";

	export let data;
	const pledge = data.pledge;

	$: session = $page.data.session;

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

<a href="/">back</a>

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
		{#each pledge.committed_names as pledger}
			<li>{pledger}</li>
		{/each}
	</ol>
</details>
<h3>
	Must commit by {pledge.deadline.toLocaleDateString()}
	at {pledge.deadline.toLocaleTimeString([], { timeStyle: "short" })}
</h3>

{#if session}
	<form method="POST" action="?/commit">
		<fieldset>
			<legend>Commit to this event</legend>
			<input type="hidden" name="slug" value={pledge.slug} />
			{#if !pledge.committed.includes(session.user.email)}
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
{:else}
	<p>Sign in to pledge!</p>
	<SignInButton />
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
