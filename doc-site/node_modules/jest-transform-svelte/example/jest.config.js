const sveltePreprocess = require('svelte-preprocess');

module.exports = {
	transform: {
		'^.+\\.js$': 'babel-jest',
		'^.+\\.svelte$': [
			'jest-transform-svelte',
			{
				preprocess: sveltePreprocess(),
				debug: false,
				noStyles: true,
				compilerOptions: {}
			}
		]
	},
	moduleFileExtensions: ['js', 'svelte'],
	bail: false,
	verbose: false
};
