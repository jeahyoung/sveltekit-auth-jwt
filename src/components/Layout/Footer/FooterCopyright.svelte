<script lang="ts">
	export let column1: string;
	export let column2: string;
	import FooterWidgetColumn from './FooterWidgetColumn.svelte';
</script>

<div class="footer-copyright container">
	<div class="inside-container">
		<div class="md:grid md:grid-cols-2 md:grid-flow-col md:gap-4 text-center md:text-left">
			<FooterWidgetColumn id={1}>{column1}</FooterWidgetColumn>
			<FooterWidgetColumn id={2}>{column2}</FooterWidgetColumn>
		</div>
	</div>
</div>
