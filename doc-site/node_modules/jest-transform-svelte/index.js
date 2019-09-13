const svelte = require('svelte/compiler');
const deasync = require('deasync');

const styleRegex = /<style[^>]*>[\S\s]*?<\/style>/g;

const process = (options = {}) => (source, filename) => {
	const { preprocess, debug, compilerOptions, noStyles } = options;

  // strip out <style> tags to prevent errors with node-sass.
  const normalized = noStyles !== false ? source.replace(styleRegex, '') : source;
  
	let preprocessed;

	if (preprocess) {
		svelte
			.preprocess(normalized, preprocess || {}, {
				filename
			})
			.then((result) => (preprocessed = result.code));

		deasync.loopWhile(() => !preprocessed);
	} else {
		preprocessed = source;
	}

	const compiled = svelte.compile(preprocessed, {
		filename,
		css: false,
		// Allow tests to set component props.
		accessors: true,
		// Debugging and runtime checks
		dev: true,
		// Emit CommonJS that Jest can understand.
		format: 'cjs',
		...compilerOptions
	});

	// Fixes the '_Sample.default is not a constructor' error when importing in Jest.
	const esInterop =
		'Object.defineProperty(exports, "__esModule", { value: true });';

	const code = compiled.js.code + esInterop;

	if (debug) {
		console.log(code);
	}

	return {
		code,
		map: compiled.js.map
	};
};

exports.createTransformer = (options) => {
	return {
		process: process(options)
	};
};
