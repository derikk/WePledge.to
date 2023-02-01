<script lang="ts">
	import type { PledgeData } from '../types/pledge.type';

	export let pledge: PledgeData;
</script>

<fieldset>
	<legend>{pledge.title}</legend>
	<p class="description">{pledge.description}</p>
	<p>
		Pledges: <b>{pledge.nc}/{pledge.nr}</b>
		<meter value={pledge.nc} min="0" max={pledge.nr} />
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
