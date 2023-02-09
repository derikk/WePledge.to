<script lang="ts">
	import type { PageData } from "./$types";
	import Intro from "./Intro.svelte";
	import ExploreFromServer from "./ExploreFromServer.svelte";
	import Footer from "./Footer.svelte";
	import Create from "./Create.svelte";
	import Login from "./Login.svelte";

	export let data: PageData;

	import { page } from "$app/stores";
	$: session = $page.data.session;
</script>

<Create />
<Intro />
<ExploreFromServer />
<Footer />
{#if data.session?.given_name == undefined}
	<Login />
{:else}
	<p>Hello, {data.session?.given_name}!</p>
{/if}
