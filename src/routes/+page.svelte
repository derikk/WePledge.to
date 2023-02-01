<script lang="ts">
	import Intro from "./Intro.svelte";
	import Explore from "./Explore.svelte";
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<Intro />
<Explore pledges={data.pledges} />
