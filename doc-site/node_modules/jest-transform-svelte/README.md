# Jest Transformer for Svelte 3

In order to unit test [Svelte](https://svelte.dev) components with the [Jest](https://jestjs.io) test framework, you need to use a transformer to ensure the Svelte component properly resolves its own component dependencies.

# Installation

```
$ npm install --save-dev jest-transform-svelte
```

## Svelte 2

If you are using Svelte 2, please use version 1 of `jest-transform-svelte`

```
$ npm install --save-dev jest-transform-svelte@1
```

# Usage

Simply add the component to the [Jest transform configuration](https://jestjs.io/docs/en/configuration#transform-object-string-string)

```
transform: {
	...
	'^.+\\.svelte$': 'jest-transform-svelte'
},
```

## Preprocessors

If your components use pre-processors (like Typescript or Pug), you'll want to tell `jest-transform-svelte`
about them. Simply pass the same preprocessor configuration you're using for Webpack or Rollup as
and optional second argument:

```javascript
const sveltePreprocess = require('svelte-preprocess');

transform: {
	...
  '^.+\\.svelte$': ['jest-transform-svelte', { preprocess: sveltePreprocess() }]
},
```

## Debugging

If your Svelte files aren't compiling correctly (maybe you're getting a `ParseError: Identifier is expected` error), you can try debugging the problem by setting the `debug` flag to print the compiled version of every processed component.

```javascript
transform: {
	...
  '^.+\\.svelte$': ['jest-transform-svelte', { debug: true }]
},
```

After setting the flag, you can run `jest --no-cache` to make sure Jest re-runs the transformer on every file.

# Example

A sample project is available in the [example](example) directory.

# Known issues

-   Sometimes it may be beneficial to give components a little time to complete their task before testing the outcome by adding a `requestAnimationFrame` (or `setTimeout`) around the `expect` in your tests
-   The reported paths in the coverage summary may become lengthy
-   The exclusing of modules may not work correctly, if this happens it may be because the `babel-plugin-istanbul` is active, which overrides your configuration (as it is a dependency to `babel-jest`), refer to the [related issue](https://jestjs.io/docs/en/troubleshooting#coveragepathignorepatterns-seems-to-not-have-any-effect)

# License

MIT License Copyright (c) 2018-2019 Rogier Spieker

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
