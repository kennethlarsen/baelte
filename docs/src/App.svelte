<style>
  .tg  {border-collapse:collapse;border-spacing:0;}
  .tg td{padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
  .tg th{font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
  .tg .tg-0lax{text-align:left;vertical-align:top}
</style>

<main class="stack">
  <h1>baelte 🥋</h1>
  <p class="tag-line">Bælte - [ˈbεldə]: Danish for <i>belt</i>. Helps you keep your pants on.</p>
  <hr />
  <p>baelte is a CLI tool for svelte that helps you be productive.</p>

  <ul>
    <li>🔋 Batteries included: You get a test suite out of the box.</li>
    <li>🚀 Scaffold new projects in seconds</li>
    <li>📦 Generate components and tests with one command</li>
  </ul>

  <hr/>

  <h2>How it works</h2>
    <p>Install baelte with Homebrew:</p>
    <p><code>brew install baelte</code></p>
    <p>And then generate your svelte project like this:</p>
    <p><code>bealte new project-name</code></p>

  <h3>Available commands</h3>
    <table class="tg">
      <tr>
        <th class="tg-0lax">Command<br></th>
        <th class="tg-0lax">What it does</th>
      </tr>
      <tr>
        <td class="tg-0lax">baelte new project-name</td>
        <td class="tg-0lax">Scaffolds a new svelte project in "/project-name"<br></td>
      </tr>
      <tr>
        <td class="tg-0lax">baelte generate component component-name</td>
        <td class="tg-0lax">Generates a component as well as a component test file with boilerplate</td>
      </tr>
      <tr>
        <td class="tg-0lax">yarn dev</td>
        <td class="tg-0lax">Runs the app in dev mode on localhost:5000</td>
      </tr>
      <tr>
        <td class="tg-0lax">yarn test</td>
        <td class="tg-0lax">Runs the test suite</td>
      </tr>
    </table>

    <p>If you don't use yarn then npm will also work.</p>
    <p>For more commands on building the project please have a look in package.json</p>
</main>

<footer><a href="https://github.com/kennethlarsen/baelte">Github</a> | <a href="https://twitter.com/kennethlarsen">Twitter</a></footer>
