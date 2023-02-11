import jwt_decode from "jwt-decode";
import { OAuth2Client } from "google-auth-library";
import { error, redirect } from "@sveltejs/kit";

const CLIENT_ID = "351607077506-ohra7t5mqadq6ao8up91j243j5sp66p4.apps.googleusercontent.com";

export const actions = {
	default: async ({ cookies, request, locals }) => {
		const { user_google_info = "" } = locals.session.data;

		await locals.session.set({ user_google_info: "{}" });

		const data = await request.formData();
		const cred = data.get("credential");

		const decoded = jwt_decode(cred);

		console.log(decoded);

		// let data_json = JSON.parse(data);
		// console.log(data_json);
		// console.log(data[0]);
		const csrf_token = data.get("g_csrf_token");

		if (!csrf_token) {
			console.log("fake csrf token, go fuck yourself");
			throw error(500);
		} else {
			const client = new OAuth2Client(CLIENT_ID);
			const ticket = await client.verifyIdToken({ idToken: cred, audience: CLIENT_ID });
			const payload = ticket.getPayload();
			console.log("payload is:");
			console.log(payload);
			// const userid = payload["sub"];

			await locals.session.set({ user_google_info: JSON.stringify(payload) });
			// await locals.session.set({ family_name: payload['family_name'] });
			// await locals.session.set({ userid: userid });

			throw redirect(302, "/");
		}
	}
};
