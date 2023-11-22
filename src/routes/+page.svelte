<script lang="ts">
	import type { PageData } from "./$types";
	import Intro from "$lib/Intro.svelte";
	import Explore from "$lib/Explore.svelte";
	import Footer from "$lib/Footer.svelte";
	import Adverbily from "$lib/Adverbily.svelte";

	export let data: PageData;

	import { page } from "$app/stores";
	import SignInButton from "$lib/SignInButton.svelte";
	import { signOut } from "@auth/sveltekit/client";

	// get google user data
	$: session = $page.data.session;

</script>

{#if session}
	<p>Logged in as {session.user.name}</p>
	<button on:click={() => signOut("google")}>Sign out</button>
{:else}
	<SignInButton />
{/if}

<Intro />
<a href="/create">Create a pledge ›</a>
{#await data.pledges}
	<p>Loading pledges <Adverbily /></p>
{:then pledgesList}
	<Explore pledges={pledgesList ?? []} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
<Footer />
