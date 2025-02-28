<script lang="ts">
	import { signIn } from "@auth/sveltekit/client";
	let { provider = "google" } = $props();
</script>

<button onclick={() => signIn(provider)}>Sign in</button>
