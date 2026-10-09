# Foncier+ web

The Foncier+ website, built with [Next.js](https://nextjs.org) and
[next-intl](https://next-intl.dev) (French and English).

## Getting started

Requirements: Node.js 22.18 or later (see [`.nvmrc`](.nvmrc)) and pnpm.

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command                   | What it does                                                   |
| ------------------------- | -------------------------------------------------------------- |
| `pnpm dev`                | Starts the development server                                  |
| `pnpm build`              | Builds the production app                                      |
| `pnpm start`              | Runs the production build locally (run `pnpm build` first)     |
| `pnpm lint`               | Runs ESLint                                                    |
| `pnpm typecheck`          | Checks TypeScript types                                        |
| `pnpm format`             | Formats the code with Prettier (`format:check` only checks it) |
| `pnpm generate:locations` | Regenerates the locations list from `src/data/locations.csv`   |

`pnpm dev` and `pnpm build` also regenerate the locations list.

## Production build

The app is built with `output: "standalone"`: `pnpm build` produces a minimal Node.js server in
`.next/standalone/`. In production it runs in Docker (see the [`Dockerfile`](Dockerfile)).

To try the production build locally:

```bash
pnpm build
pnpm start
```

Set `ALLOW_INDEXING=true` at build time to let search engines index the site. It defaults to
`false`.

Set `BDT_CACHE_DURATION_HOURS` at runtime to change how long the server keeps the France Foncier
web component's files before fetching them again from BdT. It defaults to `24`.

## Deployment

Pushes to `staging` and `main` deploy to Scaleway Serverless Containers. See
[docs/infrastructure.md](docs/infrastructure.md).

Pull requests target `staging`. The `CI checks` job (format, lint, typecheck, build) must pass
before merging.
