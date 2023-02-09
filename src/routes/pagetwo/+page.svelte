<script lang="ts">
	import type { PageData } from "./$types";

	export let data: PageData;
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div
	id="g_id_onload"
	data-client_id="351607077506-ohra7t5mqadq6ao8up91j243j5sp66p4.apps.googleusercontent.com"
	data-context="signin"
	data-ux_mode="popup"
	data-login_uri="/login-callback"
	data-auto_prompt="false"
/>

<div
	class="g_id_signin"
	data-type="standard"
	data-shape="rectangular"
	data-theme="outline"
	data-text="signin_with"
	data-size="large"
	data-logo_alignment="left"
/>
