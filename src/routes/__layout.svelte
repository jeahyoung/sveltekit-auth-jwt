<script lang="ts">
	//import '$styles/global.css';
	import '../app.css';
	import { session } from '$app/stores';
</script>

<svelte:head>
	<title>SvelteKit Auth JWT</title>
</svelte:head>

<nav>
	<h1><a href="/">Ninja Smoothies</a></h1>
	<ul>
		{#if $session.user}
			<li>Welcome, {$session.user?.email}</li>
			<li><a href="/logout">Log out</a></li>
		{/if}

		{#if !$session.user}
			<li><a href="/login">Log in</a></li>
			<li><a href="/signup" class="btn">Sign up</a></li>
		{/if}
	</ul>
</nav>

<slot />

<footer>Copyright 2020 Ninja Smoothies</footer>

<style>
	body {
		@apply mx-5 my-10 text-xl tracking-normal bg-white;
	}

	h1,
	h2,
	h3,
	h4,
	ul,
	li,
	a,
	p,
	input,
	label,
	button,
	div,
	footer {
		@apply m-0 p-0 font-body text-gray-600;
	}

	ul {
		@apply list-none;
	}

	nav {
		@apply flex justify-between items-end mb-32;
	}

	nav ul {
		@apply flex items-center;
	}

	nav li {
		@apply ml-5;
	}

	nav li a {
		@apply uppercase font-bold text-sm block px-2 py-4 tracking-wide;
	}

	.btn {
		@apply rounded-xl bg-amber-200;
	}

	form h2 {
		@apply text-4xl font-black mb-10;
	}

	form {
		@apply w-80 mx-0 my-auto p-7 shadow-blue-500/50 rounded-lg bg-white;
	}

	input {
		@apply px-2 py-3 rounded border-solid border-2 border-slate-100 text-base w-full;
	}

	label {
		@apply block mt-5 mx-0 mb-2;
	}
</style>
