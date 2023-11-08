<script lang="ts">
	const today = new Date();
	export const nextWeek = new Date();
	nextWeek.setDate(today.getDate() + 7);

	export let form: any;
</script>

<h2>Create an event</h2>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<form method="POST">
	<label for="evname">Name</label>
	<input
		type="text"
		id="evname"
		name="evname"
		value={form?.name ?? ""}
		placeholder="Go running at 7 am"
		required
	/>
	<br />

	<label for="description">Description</label>
	<textarea
		id="description"
		name="description"
		value={form?.description ?? ""}
		rows="7"
		placeholder="Let's run to Oakland Thursday morning! I'll do it if five people join me."
	/>
	<br />

	<label for="deadline">Deadline</label>
	<input
		type="datetime-local"
		id="deadline"
		name="deadline"
		step="60"
		value={form?.deadline ?? nextWeek.toISOString().split("T")[0] + "T23:59"}
		required
	/>
	<br />

	<label for="minNumber">Min Number</label>
	<input
		type="number"
		id="minNumber"
		name="minNumber"
		placeholder="5"
		min="2"
		max="999999"
		value={form?.num_required ?? ""}
		required
	/>
	<br />

	<button>Create</button>
</form>

<style>
	input[type="text"] {
		width: 100%;
	}
	.error {
		color: red;
	}
</style>
