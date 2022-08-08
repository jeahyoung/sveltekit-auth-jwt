/* jshint esversion: 9 */
const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const useNanoCSS = !dev
	? {
			cssnano: {}
	  }
	: {};

const config = {
	syntax: 'postcss-scss',
	plugins: {
		autoprefixer: {
			cascade: true
		},
		'postcss-flexbugs-fixes': {},
		'postcss-import': {},
		'postcss-preset-env': {
			autoprefixer: {
				flexbox: 'no-2009'
			},
			stage: 3,
			features: {
				'nesting-rules': false,
				'custom-properties': false
			}
		},
		'postcss-nesting': {},
		'tailwindcss/nesting': {},
		tailwindcss: {},
		...useNanoCSS
	}
};

module.exports = config;
