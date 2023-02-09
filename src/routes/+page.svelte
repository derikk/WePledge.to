<script lang="ts">
	import type { PageData } from "./$types";
	import Intro from "./Intro.svelte";
	import Explore from "./Explore.svelte";
	import Footer from "./Footer.svelte";
	import Adverbily from "./Adverbily.svelte";
	import Login from "./Login.svelte";

	export let data: PageData;

	import { page } from "$app/stores";
	$: session = $page.data.session;

	let sexporn = "69";
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
<!-- {#if data.session?.given_name == undefined} -->
<Login userdata={data}/>
<!-- {:else} -->
	<!-- <p>Hello, {data.session?.given_name}!</p> -->
<!-- {/if} -->
