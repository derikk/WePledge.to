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
		maxlength="100"
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
		min={today.toLocaleDateString("sv") + "T00:00"}
		value={form?.deadline ?? nextWeek.toLocaleDateString("sv") + "T23:59"}
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

	<label for="anonymous">Keep pledges anonymous until threshold met:</label>
	<select id="anonymous" name="anonymous">
		<option value="no" selected={form?.anonymous !== 'yes'}>No</option>
		<option value="yes" selected={form?.anonymous === 'yes'}>Yes</option>
	</select>
	<br />

	<label for="manifoldMarket">Create Manifold Market:</label>
	<select id="manifoldMarket" name="manifoldMarket">
		<option value="no" selected={form?.manifoldMarket !== 'yes'}>No</option>
		<option value="yes" selected={form?.manifoldMarket === 'yes'}>Yes</option>
	</select>
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
