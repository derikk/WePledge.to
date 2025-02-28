<script lang="ts">
	import PledgeCard from "$lib/PledgeCard.svelte";
	import type { PledgeData } from "$lib/types/pledge.type";

	let { pledges }: { pledges: PledgeData[] } = $props();
</script>

<h2>Explore pledges</h2>
{#each pledges as pledge}
	<PledgeCard {pledge} />
{/each}
