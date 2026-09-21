@AGENTS.md

# Project constraints

This site must stay **strictly static**. `output: "export"` in `next.config.ts` is not
negotiable: everything has to be computable at build time.

Therefore off-limits: Server Actions, request-dependent Route Handlers, `cookies()`,
`headers()`, ISR, middleware/proxy, `rewrites`, `redirects`, dynamic routes without
`generateStaticParams`, and image optimization through the default loader (hence
`images: { unoptimized: true }`).

