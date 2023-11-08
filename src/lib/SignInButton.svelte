<script lang="ts">
	import { signIn } from "@auth/sveltekit/client";
	export let provider = "google";
</script>

<button on:click={() => signIn(provider)}>Sign in</button>
