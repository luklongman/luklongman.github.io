# Luk Long Man

Personal knowledge garden, published to GitHub Pages.
Last edited: 21:51. Jul 24, 20

## Build

```sh
npm ci
npx quartz plugin install
npx quartz build
```

The deployment workflow runs the same build and publishes the generated `public/` directory.

## Architecture

| Path                                     | Purpose                                                          |
| ---------------------------------------- | ---------------------------------------------------------------- |
| `content/`                               | Private Git submodule containing the published notes and assets. |
| `quartz/`                                | Static-site engine, renderers, and build CLI.                    |
| `quartz.config.yaml`                     | Site identity, theme, enabled plugins, and page layout.          |
| `quartz.ts`                              | Loads the YAML configuration at build time.                      |
| `quartz.lock.json`                       | Pinned external plugin revisions.                                |
| `quartz/static/`                         | Site-wide static assets, including the favicon source.           |
| `.github/workflows/deploy-gh-pages.yaml` | Builds and deploys the site from the active branch.              |
| `public/`                                | Ignored generated output; never edit it by hand.                 |

`package.json`, `package-lock.json`, and the TypeScript configuration support the build. `LICENSE.txt` preserves the license for the upstream engine code.
