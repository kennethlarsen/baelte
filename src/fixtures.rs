pub fn get_app_content() -> &'static str {
  return "<script>
  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>"
}

pub fn get_package_json() -> &'static str {
  return r#"{
  "name": "{AppName}",
  "version": "1.0.0",
  "devDependencies": {
    "npm-run-all": "^4.1.5",
    "rollup": "^1.12.0",
    "rollup-plugin-commonjs": "^10.0.0",
    "rollup-plugin-livereload": "^1.0.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-svelte": "^5.0.3",
    "rollup-plugin-terser": "^4.0.4",
    "svelte": "^3.0.0",
    "jest": "^24.9.0",
    "jest-transform-svelte": "^2.0.2",
    "@testing-library/jest-dom": "^4.1.0",
    "@testing-library/svelte": "^1.8.0",
    "svelte-preprocess": "3.1.1",
    "@babel/preset-env": "^7.6.0"
  },
  "dependencies": {
    "sirv-cli": "^0.4.4"
  },
  "scripts": {
    "build": "rollup -c",
    "autobuild": "rollup -c -w",
    "dev": "run-p start:dev autobuild",
    "start": "sirv public --single",
    "start:dev": "sirv public --single --dev",
    "test": "jest"
  }
}"#;
}

pub fn get_rollup() -> &'static str {
  return r#"import svelte from 'rollup-plugin-svelte';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'src/main.js',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/bundle.js'
  },
  plugins: [
    svelte({
      // enable run-time checks when not in production
      dev: !production,
      // we'll extract any component CSS out into
      // a separate file — better for performance
      css: css => {
        css.write('public/bundle.css');
      }
    }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration —
    // consult the documentation for details:
    // https://github.com/rollup/rollup-plugin-commonjs
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/')
    }),
    commonjs(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload('public'),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    production && terser()
  ],
  watch: {
    clearScreen: false
  }
};
"#;
}

pub fn get_main() -> &'static str {
  return "import App from './App.svelte';

const app = new App({
  target: document.body,
  props: {
    name: 'world'
  }
});

export default app;"
}

pub fn get_index_html() -> &'static str {
  return "<!doctype html>
<html>
<head>
  <meta charset='utf8'>
  <meta name='viewport' content='width=device-width'>

  <title>Svelte app</title>

  <link rel='stylesheet' href='/global.css'>
  <link rel='stylesheet' href='/bundle.css'>

  <script defer src='/bundle.js'></script>
</head>

<body>
</body>
</html>"
}

pub fn get_global_css() -> &'static str {
  return r#"html, body {
  position: relative;
  width: 100%;
  height: 100%;
}

body {
  color: #333;
  margin: 0;
  padding: 8px;
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}

a {
  color: rgb(0,100,200);
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

a:visited {
  color: rgb(0,80,160);
}

label {
  display: block;
}

input, button, select, textarea {
  font-family: inherit;
  font-size: inherit;
  padding: 0.4em;
  margin: 0 0 0.5em 0;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 2px;
}

input:disabled {
  color: #ccc;
}

input[type="range"] {
  height: 0;
}

button {
  color: #333;
  background-color: #f4f4f4;
  outline: none;
}

button:active {
  background-color: #ddd;
}

button:focus {
  border-color: #666;
}"#;
}

pub fn get_component_content() -> &'static str {
  return "<script>
  export let name;
</script>

<style>
  h1 {
    color: purple;
  }
</style>

<h1>Hello {name}!</h1>"
}


pub fn get_component_test() -> &'static str {
  return r#"import {ComponentName} from "./Component.svelte";
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from "@testing-library/svelte";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

describe("{ComponentName}", () => {
  test("should render greeting", () => {
    const { getByText } = render({ComponentName}, { props: { name: "world" } });

    expect(getByText("Hello world!")).toBeInTheDocument();
  });
});"#;
}

pub fn get_babel() -> &'static str {
  return "module.exports = {
  presets: ['@babel/preset-env']
};";
}

pub fn get_jest() -> &'static str {
  return "const sveltePreprocess = require('svelte-preprocess');

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
};";
}