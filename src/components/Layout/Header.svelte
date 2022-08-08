<script lang="ts">
	export let session: any;
</script>

<div class="header-wrap">
	<a class="sr-only skip-link" href="#content" title="Skip to content">Skip to content</a
	>

	<header
		class="site-header"
		id="masthead"
		aria-label="Site"
		itemtype="https://schema.org/WPHeader"
		itemscope=""
	>
		<nav>
			<h1><a href="/">Ninja Smoothies</a></h1>
			<ul>
				{#if session.user}
					<li>Welcome, {session.user?.email}</li>
					<li><a href="/user/logout">Log out</a></li>
				{/if}

				{#if !session.user}
					<li><a href="/user/login">Log in</a></li>
					<li><a href="/user/signup" class="btn">Sign up</a></li>
				{/if}
			</ul>
		</nav>
	</header>
</div>
