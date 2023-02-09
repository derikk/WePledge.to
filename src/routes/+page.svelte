<script lang="ts">
	import Intro from "./Intro.svelte";
	import ExploreFromServer from "./ExploreFromServer.svelte";
	import Footer from "./Footer.svelte";
	import Create from "./Create.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;

	import { page } from '$app/stores';
	$: session = $page.data.session;
</script>

<span id="hi-user">Hello, {data.session?.given_name}!</span>

<Create />
<Intro />
<ExploreFromServer />
<Footer />
