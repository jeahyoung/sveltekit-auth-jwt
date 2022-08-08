<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = () => {
		throw new Error('throwing an error from err_gen.svelte');
	};
</script>

<h1>Error Generator</h1>
