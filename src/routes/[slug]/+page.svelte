<script lang="ts">
	import PledgeCard from '../PledgeCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>{data.pledge.title}</h1>
<div>{@html data.pledge.description}</div>
<PledgeCard pledge={data.pledge} />
