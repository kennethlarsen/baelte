# Example setup (jest-transform-svelte)

This sample details a simple example on how to configure tests using Jest for Svelte (3) projects

## Files

The file structure is simple

-   source/[Sample.svelte](source/Sample.svelte) - A Svelte component ([more on how to use Svelte](https://svelte.dev/))
-   test/[Sample.spec.js](test/Sample.spec.js) - A Jest test spec ([more on how to use Jest](https://jestjs.io))
-   [jest.config.js](jest.config.js) - The Jest configuration ([more on how to configure Jest](https://jestjs.io/docs/en/configuration))
-   [babel.config.js](babel.config.js) - The Babel configuration ([more on how to configure Babel](https://babeljs.io/docs/en/configuration))
-   [package.json](package.json) - The basic set up for all dependencies for Svelte, Jest and Babel.

## Running tests

The example directory serves as a very basic project setup. If you have the repository cloned, you should be able to enter the example directory and install the packages:

```
$ npm install
$ cd example
$ npm install
```

Then it's matter of running Jest, which has been configured as test script in the package.json:

```
$ npm test
```

Which then runs all the tests and summarize the results.

Example output:

```
 PASS  test/Sample.spec.js
  Sample
    ✓ is empty by default (5ms)
    ✓ foo renders and has length 3
    ✓ bar-baz renders and has length 7 (1ms)
    ✓ sample renders and has length 5

Test Suites: 1 passed, 1 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        2.608s
Ran all test suites.
```
