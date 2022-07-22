import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({
		postcss: true,
	}),
	kit: {
		adapter: adapter(),
		alias: {
			$components: 'src/components',
			$root: 'src',
			$lib: 'src/lib',
			$styles: 'src/styles'
		}
	}
};

export default config;
