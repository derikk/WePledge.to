<script lang="ts">
	export let userdata:string;
</script>

<svelte:head>
	<script src="https://accounts.google.com/gsi/client" async defer></script>
</svelte:head>

<div id="user-footer">

{#if userdata?.session?.given_name == undefined}
	<div id="login-button">
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
	</div>
{:else}
	<p>Hello, {userdata.session?.given_name}!</p>
{/if}
</div>

<style>
	#user-footer {
		position: fixed;

		left: 0;
		bottom: 0;
		background-color: grey;
		width: 100%;
	}
	#login-button {
		max-width: 20%;
	}
</style>
