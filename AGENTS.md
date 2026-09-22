<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Git restriction

Do not add co-authored by Claude in the commits nor the pull request description.

Create pull requests on the 'staging' branch, not 'main'.

# Project constraints

This site must stay **strictly static**. `output: "export"` in `next.config.ts` is not
negotiable: everything has to be computable at build time.

Therefore off-limits: Server Actions, request-dependent Route Handlers, `cookies()`,
`headers()`, ISR, middleware/proxy, `rewrites`, `redirects`, dynamic routes without
`generateStaticParams`, and image optimization through the default loader (hence
`images: { unoptimized: true }`).
Never push on 'main' nor 'staging'.
