import { handleSession } from 'svelte-kit-cookie-session';

// You can do it like this, without passing a own handle function
export const handle = handleSession({
	// Optional initial state of the session, default is an empty object {}
	// init: (event) => ({
	// 	views: 0
	// }),
	secret: 'pJw3vbviDuRuTXkezqbMyFVBSwuw7Sp3'
});
