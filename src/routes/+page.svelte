<script lang="ts">
	import Intro from "./Intro.svelte";
	import Explore from "./Explore.svelte";
	import Footer from "./Footer.svelte";
	import Create from "./Create.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Create />
<Intro />
<Explore pledges={data.pledges} />
<Footer />
