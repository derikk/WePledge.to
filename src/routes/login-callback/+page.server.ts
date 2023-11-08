import type { PageServerLoad, Actions } from "./$types";
import jwt_decode from "jwt-decode";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import type { ServerLoad } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

const CLIENT_ID = "351607077506-ohra7t5mqadq6ao8up91j243j5sp66p4.apps.googleusercontent.com";

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const { given_name = "" } = locals.session.data;

		await locals.session.set({ given_name: "someone" });

		const data = await request.formData();
		let cred = data.get("credential");

		let decoded = jwt_decode(cred);

		console.log(decoded);

		// let data_json = JSON.parse(data);
		// console.log(data_json);
		// console.log(data[0]);
		let csrf_token = data.get("g_csrf_token");

		if (csrf_token == null || csrf_token == undefined) {
			console.log("fake csrf token, go fuck yourself");
			error500();
		} else {
			const client = new OAuth2Client(CLIENT_ID);
			const ticket = await client.verifyIdToken({ idToken: cred, audience: CLIENT_ID });
			const payload = ticket.getPayload();
			console.log("payload is:");
			console.log(payload);
			const userid = payload["sub"];

			await locals.session.set({ given_name: payload["given_name"] });
			// await locals.session.set({ family_name: payload['family_name'] });
			// await locals.session.set({ userid: userid });

			throw redirect(302, "/");
		}
	}
};
