---
date: 2025-06-17
tags:
 - MyBlog/Technology
 - MyBlog/Obsidian
---

This is how I set up this Blog, free of charge. All you need is a markdown editor, in my case Obsidian, and a Github account. We'll be able to edit the blog in markdown locally, and then create a static web page on Github Pages. You can keep your other notes seperated from the blog, we will only publish the `<Vault>/Blog` folder. We'll automate the publishing stage with a CI/CD pipeline and an Obsidian plugin. You'll be able to publish just by pressing a hotkey in Obsidian!

# Technologies
Besides [Obsidian](https://obsidian.md/) and [Github Pages](https://pages.github.com/), a *static site generator* is used to create the HTML sources. We will use [Quartz 4](https://quartz.jzhao.xyz/), which comes pre-configured with useful features, like an RSS-feed and a sitemap. 

# Setup Quartz
We will clone the current Quartz repository into our vault. This allows for customization of components and plugins. If you want to use a submodule, keep in mind to use `--depth=2` later when cloning the repo. Otherwise just delete the nested `.git` folder. (**Do not delete your main Git folder.**)
We will clone Quartz into the folder `.github/quartz`.

```bash
mkdir .github && cd .github
git clone https://github.com/jackyzha0/Quartz.git
cd quartz
npm i
npx quartz create
```

In `.github/Quartz/Quartz.config.ts`, you should definitely change the fields
1. `pageTitle`
2. `baseUrl`

For further customization, refer to the [documentation](https://quartz.jzhao.xyz/configuration).


# Setup Github Pages
We will host the website in a separate Github repository for security-reasons. Create this repository, and then [create an access token](https://github.com/settings/personal-access-tokens), so we can publish from the main repository. Upload the token as a secret in the main repository, that we can use in the pipeline later. There it's safely stored. You will need to create a new token, if you decide to create a new pipeline however. Go to `Settings > Secrets > Actions` and add the secret under the `PAGES_DEPLOY_TOKEN`. Lastly, enable Github Pages in the hosting-repository under `Settings > Pages`.

---

We can create the main CI/CD pipeline now. Github Actions Pipelines are stored in `.github/workflows`. 

```yml
name: Build and Deploy Quartz to External Pages Repo

on:
  push:
    branches: [ "*" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout main repo
        uses: actions/checkout@v4

      - name: Setup Node.js 22
        uses: actions/setup-node@v4
        with:
          node-version: 22

      - name: Replace Quartz content with Blog folder
        run: |
          rm -rf .github/quartz/content/*
          mkdir -p quartz/content
          rsync -av --delete Blog/ .github/quartz/content/

      - name: Install dependencies
        working-directory: .github/quartz
        run: npm install

      - name: Build Quartz site
        working-directory: .github/quartz
        run: npx Quartz build

      - name: Push to pages repo
        run: |
          ls
          cd .github/quartz/public
          git init
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git remote add origin https://x-access-token:${{ secrets.PAGES_DEPLOY_TOKEN }}@github.com/fabsch225/fabsch225.github.io.git
          git checkout -b main
          git add .
          git commit -m "Deploy Quartz site"
          git push -f origin main

```

# Improvements to the setup

## Git-integration for Obsidian (desktop)
To easily push the blog from the Obsidian user interface, we can configure a plugin for Obsidian. This is not absolutely necessary, but speeds up your workflow. Also, this will serve as a practical back-up solution for your whole Vault. 
**Disclaimer.** Git needs to be installed on your machine, so this is only relevant for PC and Mac.

---

Obsidian plugins live in your vault, specifically in the `.obsidian` folder. We'll just create it there. Once we start using git, version control for our custom setup comes for free.
We require the following folder-structure:
```Structure
.Obsidian/
└── plugins/
    └── git-automation/
        ├── main.js
        └── manifest.json
```

`manifest.json` will tell Obsidian the plugin metadata:

```json
{
	"id": "git-auto-push",
	"name": "Git Auto Push",
	"version": "1.0.0",
	"minAppVersion": "0.12.0",
	"description": "Automatically add, commit, and push your vault",
	"author": "Fabian Schuller",
	"authorUrl": "https://github.com/fabsch225",
	"main": "main.js"
}
```

In `main.js`, we configure the Obsidian-command, that will trigger the publishing process, and start a node child-process, that executes the git commands.

```js
const { Plugin, Notice } = require('obsidian');
const { exec } = require('child_process');

module.exports = class GitAutoPushPlugin extends Plugin {
	async onload() {
		this.addCommand({
			id: 'git-auto-commit-push',
			name: 'Git Add, Commit (Date), and Push',
			callback: () => this.runGitCommands()
		});
	}

	async runGitCommands() {
		const vaultPath = this.app.vault.adapter.getBasePath();
		const date = new Date().toISOString().split('T')[0];

		const command = `
			cd "${vaultPath}" && \
			git add . && \
			git commit -m "${date}" && \
			git push
		`;

		exec(command, (error, stdout, stderr) => {
			if (error) {
				console.error('Git command error:', error);
				new Notice('Git push failed: ' + error.message);
				return;
			}
			if (stderr) console.warn('Git stderr:', stderr);
			new Notice('Git commit and push successful!');
		});
	}
}

```

Now, reload the plugins in the Obsidian app, and enable our custom plugin. Then press CTRL+P to open the command-prompt and search for the command `Automatically add, commit, and push your vault`. In the plugin's settings, you can also bind a hotkey to this command, if you so wish. 
## Strip link prefixes
If you made it this far, you will notice that the Links between pages are broken. They each have the prefix `Blog/`, because it's like this in your main Obsidian Vault. For this, i propose a custom [Quartz plugin](https://quartz.jzhao.xyz/advanced/making-plugins). We will create a plugin, that transforms the links, so the Prefix is avoided. This only requires a regex to find those Links, and a search-and-replace Library to actually transform the pages.

---

Plugins are not difficult to set up, and this simple plugin opens the 
way for more advanced customization. Plugins in Quartz fall into 3 categories

| Plugin Type | Functionality                                                    | Exemplary Use-Case               |
| ----------- | ---------------------------------------------------------------- | -------------------------------- |
| Transformer | Alter or enrich each file by manipulating text, AST or resources | Render latex or create wordcount |
| Filter      | Decide which file gets published                                 | Skip drafts                      |
| Emitter     | Produce final output (override default here)                     | Custom layout                    |

We will use a transformer: 

```ts
import { QuartzTransformerPlugin } from "../types"
import { findAndReplace } from "mdast-util-find-and-replace"
import { Text } from "mdast"

interface Options {
  prefix: string
}

export const StripPrefixLinks: QuartzTransformerPlugin<Options> = (opts?: Options) => {
  const prefix = opts?.prefix ?? ""

  return {
    name: "StripPrefixLinks",
    markdownPlugins() {
      return [
        () => {
          return (tree) => {
            const pattern = new RegExp(`\\[\\[${prefix}/([^\\]]+?)\\]\\]`, "g")

            findAndReplace(tree, [
              [
                pattern,
                (_match: string, captured: string) =>
                  ({ type: "text", value: `[[${captured}]]` } as Text),
              ],
            ])
          }
        },
      ]
    },
  }
}

```

We will place this at `.github/Quartz/Quartz/plugins/transformers/stripPrefixLinks.ts`.
Now, we'll have to register the Plugin at `... /plugins/transformers/index.ts` by adding the Line
```ts
export { StripPrefixLinks } from "./stripPrefixLinks.ts"
```
Now, we enable the plugin in the config `.github/Quartz/Quartz.config.ts`, by adding it in front of the other transformer plugins:
```ts
//...
plugins: {
    transformers: [
      Plugin.StripPrefixLinks({ prefix: "Blog" }),
      //...
    ]
}, //...
```
If you want to setup the Blog elsewhere in your Obsidian vault, also modify the prefix here.

## Custom footer
To create a custom footer, edit `.github/quartz/quartz/components/Footer.tsx`. If you just want to add custom links (like to your social media) to the footer, you can change those in `.github/quartz/quartz/quartz.layout.tsx`.