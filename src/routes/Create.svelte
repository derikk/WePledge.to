<script lang="ts">
	let name = "";
	let slug = "go-running-at-7-am";
	
	function updateSlug() {
		let fixed = name.toLowerCase().trim().replace(/[\W_]+/g,"-");
            
        for (let i = 0; i < 10; i++) {
            fixed = fixed.replace("--", "-");
        }
            
        while (fixed.slice(-1) == "-") {
            fixed = fixed.slice(0,-1);
        }
            
        while (fixed.slice(0, 1) == "-") {
            fixed = fixed.slice(1);
        }
            
        slug = fixed;
	}
</script>

<h2>Create a pledge</h2>

<form method="post">
	<fieldset>
	<legend>Create an event</legend>

	<label for="evname">Name</label>
	<input type="text" id="evname" name="evname" bind:value={name} placeholder="Go running at 7 am" on:keydown="{updateSlug}" required>
	<br>
	
	<label for="description">Description</label>
	<textarea id="description" name="description" rows="7" placeholder="Let's run to Oakland Thursday morning! I'll do it if five people join me."></textarea>
	<br>
	
	<label for="resolution">Deadline</label>
	<input type="datetime-local" id="resolution"
		name="resolution" value="2023-02-08T23:59" required>
	<br>
	
	<input type="hidden" name="tz" id="tz" value="Unknown">
	
	<label for="minNumber">Min Number</label>
	<input type="number" id="minNumber" name="minNumber" placeholder="5" min=2 max=999999 required>
	<br>
	
	<label for="slug">Slug</label>
	<input type="text" id="slug" name="slug" placeholder="{slug}" required>
	<br>
	
	<input type="submit">
	</fieldset>
</form>