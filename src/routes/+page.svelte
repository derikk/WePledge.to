<script lang="ts">
	import Intro from "./Intro.svelte";
	import Explore from "./Explore.svelte";
	import Footer from "./Footer.svelte";
	import Adverbily from "./Adverbily.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

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
