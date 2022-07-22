<script lang="ts">
    import '$styles/global.css';
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