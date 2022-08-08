<script lang="ts">
	export let column1: string;
	export let column2: string;
	import FooterWidgetColumn from './FooterWidgetColumn.svelte';
</script>

<div class="footer-copyright container">
	<div class="inside-container">
		<div class="grid grid-cols-2 grid-flow-col gap-4">
			<FooterWidgetColumn id={1}>{column1}</FooterWidgetColumn>
			<FooterWidgetColumn id={2}>{column2}</FooterWidgetColumn>
		</div>
	</div>
</div>
