<script lang="ts">
	export let id: number;
</script>

<div class="grid-column column-{id}">
	<div class="inside-column"><slot /></div>
</div>
