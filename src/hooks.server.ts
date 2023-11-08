import { SvelteKitAuth } from "@auth/sveltekit";
import GoogleProvider from "@auth/core/providers/google";
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	SUPABASE_URL,
	SUPABASE_KEY
} from "$env/static/private";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const handle = SvelteKitAuth({
	providers: [GoogleProvider({ clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET })],
	// adapter: SupabaseAdapter({
	// 	url: SUPABASE_URL,
	// 	secret: SUPABASE_KEY,
	//   }),
});
