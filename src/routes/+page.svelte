<script lang="ts">
	import Intro from "./Intro.svelte";
	import Explore from "./Explore.svelte";
	import Footer from "./Footer.svelte";
	import Adverbily from "./Adverbily.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	import { page } from '$app/stores';
	$: session = $page.data.session;
</script>

{#if data.session?.given_name == undefined}
	<p><a href="pagetwo/">log in!</a></p>
{:else}
	<p>Hello, {data.session?.given_name}!</p>
{/if}

<Create />
<Intro />
<a href="/create">Create a pledge</a>
{#await data.pledges}
	<p>Loading pledges <Adverbily /></p>
{:then pledgesList}
	<Explore pledges={pledgesList ?? []} />
{:catch error}
	<p style="color: red">{error.message}</p>
{/await}
<Footer />
