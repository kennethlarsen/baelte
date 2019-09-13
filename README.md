# baelte 🥋
Bælte - [ˈbεldə] : Danish for *belt*. Helps you keep your pants on.

CLI tool for svelte that helps you be productive.

* 🔋 Batteries included: You get a test suite out of the box.
* 🚀 Scaffold new projects in seconds
* 📦 Generate components and tests with one command

Install:
```zsh
curl -LSfs https://japaric.github.io/trust/install.sh | \
    sh -s -- --git kennethlarsen/baelte
```

`baelte new project-name`

| Command                                  | What it does                                                            |
|------------------------------------------|-------------------------------------------------------------------------|
| baelte new project-name                  | Scaffolds a new svelte project in "/project-name"                       |
| baelte generate component component-name | Generates a component as well as a component test file with boilerplate |
| yarn dev                                 | Runs the app in dev mode on localhost:5000                              |
| yarn test                                | Runs the test suite                                                     |

# Important note
`baelte` is very new and perhaps not stable. Until v1 is released the assumed project structure [might change](https://github.com/kennethlarsen/baelte/issues/1).