<script lang="ts">
	import FooterWidgetColumn from './FooterWidgetColumn.svelte';
</script>

<div class="footer-widgets container">
	<div class="inside-container">
		<div class="grid grid-cols-4 grid-flow-col gap-4">
			<FooterWidgetColumn id={1}>Column #1</FooterWidgetColumn>
			<FooterWidgetColumn id={2}>Column #2</FooterWidgetColumn>
			<FooterWidgetColumn id={3}>Column #3</FooterWidgetColumn>
			<FooterWidgetColumn id={4}>Column #4</FooterWidgetColumn>
		</div>
	</div>
</div>
