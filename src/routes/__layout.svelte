<script lang="ts">
	//import '$styles/global.css';
	import '../app.css';
	import { session } from '$app/stores';

	// Loading components
	import Layout from '../components/Layout.svelte';
	import Header from '../components/Layout/Header.svelte';
	import Footer from '../components/Layout/Footer/Footer.svelte';
	import FooterWidgets from '../components/Layout/Footer/FooterWidgets.svelte';
	import FooterCopyright from '../components/Layout/Footer/FooterCopyright.svelte';
</script>

<svelte:head>
	<title>SvelteKit Auth JWT</title>
</svelte:head>

<Layout>
	<Header session={$session} />
	<slot />
	<Footer>
		<FooterCopyright column1={`Copyright ${new Date().getUTCFullYear()} - Ninja Smoothies`} column2={``}/>
	</Footer>
</Layout>
