<script context="module" lang="ts">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = ({ session }) => {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/user/login'
			};
		}

		return {
			status: 200,
			props: {
				user_email: session.user.email
			}
		};
	};
</script>

<script lang="ts">
	export let user_email: string;

	import Page from '../../components/Layout/Page.svelte';
</script>

<Page>
	<div class="heading block pb-16 text-left">
		<h1>Protected</h1>
		<p>Welcome {user_email}!</p>
	</div>

	<div class="recipes_wrapper">
		<ul class="recipes">
			<li class="recipe">
				<img src="/img/smoothie.png" alt="smoothie recipe icon" />
				<h4>Banana Boost</h4>
				<p>Banana, Vanilla ice cream, Milk</p>
			</li>
			<li class="recipe">
				<img src="/img/smoothie.png" alt="smoothie recipe icon" />
				<h4>Tropical Twist</h4>
				<p>Peach, Pinapple, Apple juice</p>
			</li>
			<li class="recipe">
				<img src="/img/smoothie.png" alt="smoothie recipe icon" />
				<h4>Protein Packer</h4>
				<p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
			</li>
			<li class="recipe">
				<img src="/img/smoothie.png" alt="smoothie recipe icon" />
				<h4>Banana Boost</h4>
				<p>Banana, Vanilla ice cream, Milk</p>
			</li>
			<li class="recipe">
				<img src="/img/smoothie.png" alt="smoothie recipe icon" />
				<h4>Tropical Twist</h4>
				<p>Peach, Pinapple, Apple juice</p>
			</li>
			<li class="recipe">
				<img src="/img/smoothie.png" alt="smoothie recipe icon" />
				<h4>Protein Packer</h4>
				<p>Oats, Peanut butter, Milk, Banana, Blueberries</p>
			</li>
		</ul>
	</div>
</Page>
