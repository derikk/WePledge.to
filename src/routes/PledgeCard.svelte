<script lang="ts">
	import type { PledgeData } from "../types/pledge.type";

	export let pledge: PledgeData;
</script>

<fieldset>
	<legend>{pledge.name}</legend>
	{#if pledge.description}
		<p class="description">{pledge.description}</p>
	{/if}
	<p>
		Pledges: <b>{pledge.committed.length}/{pledge.num_required}</b>
		<meter value={pledge.committed.length} min="0" max={pledge.num_required} />
	</p>
	<p>Deadline: {pledge.deadline.toLocaleDateString()}</p>
	<a href="/{pledge.slug}">More ›</a>
</fieldset>

<style>
	fieldset p {
		font-weight: normal;
	}
	.description {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	meter {
		width: 100%;
	}
</style>
