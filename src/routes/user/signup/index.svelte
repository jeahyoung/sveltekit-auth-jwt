<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session, props }) => {
		if (session.user) {
			return {
				status: 302,
				redirect: '/'
			};
		}
		return { props };
	};
</script>

<script lang="ts">
	import { send } from '$lib/utils/api';

	export let error: string;
	export let success: string;

	import Page from '../../../components/Layout/Page.svelte';

	const signup = async (event: SubmitEvent) => {
		error = '';
		success = '';

		const formEl = event.target as HTMLFormElement;

		const response = await send(formEl);

		console.log('SignUp/index: response', response);

		if (response.error) {
			error = response.error;
		}

		if (response.success) {
			success = response.success;
			if (response.data) {
				location.assign('/user/login');
			}
		}

		formEl.reset();
	};
</script>

<Page>
	<form on:submit|preventDefault={signup} method="post" autocomplete="off" class="login-form">
		<h2>Sign up</h2>
		<label for="email">Email</label>
		<input type="text" name="email" required />
		<label for="password">Password</label>
		<input type="password" name="password" required />

		{#if error}
			<div class="error">{error}</div>
		{/if}

		{#if success}
			<p>Thank you for signing up!</p>
			<p><a href="/user/login">You can log in.</a></p>
		{/if}
		<button type="submit">Sign up</button>
	</form>
</Page>
