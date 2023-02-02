<script lang="ts" context="module">
	const SUPABASE_URL = "https://dxxqsxgjhtktuubksoro.supabase.co";
	const SUPABASE_KEY =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4eHFzeGdqaHRrdHV1Ymtzb3JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzUyODk5ODYsImV4cCI6MTk5MDg2NTk4Nn0.TbSwx-9fy_zVUOdP9xNgjGYkuOeGZFFXt5LB0PYL2uw";

	import { createClient } from "@supabase/supabase-js";
	export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
</script>
