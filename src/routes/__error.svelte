<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = ({ error, status }) => {
		return {
			props: {
				message: error?.message,
				status
			}
		};
	};
</script>

<script lang="ts">
	export let message: string;
	export let status: number | null;
</script>

<div class="flex flex-col items-center">
	{#if status == 404}
		<p><strong>Page {message}</strong></p>
	{:else}
		<p><strong>{message} {status}</strong></p>
	{/if}
</div>
