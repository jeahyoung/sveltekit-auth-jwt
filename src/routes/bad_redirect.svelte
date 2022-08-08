<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = () => {
		return {
			redirect: '/'
		};
	};
</script>

<h1>Bad Redirect</h1>
