# Infrastructure

The site is a Next.js app (`output: "standalone"`) packaged as a Docker image and run on
Scaleway Serverless Containers, region `fr-par`.

```mermaid
---
config:
  theme: base
  themeVariables:
    primaryColor: "#ffffff"
    primaryBorderColor: "#999999"
    lineColor: "#555555"
    edgeLabelBackground: "#ffffff"
    clusterBkg: "#ffffff"
    clusterBorder: "#999999"
---
flowchart LR
    visitor(("Visitor"))

    subgraph github["GitHub Actions"]
        ci("<b>CI</b><br/>GitHub Actions")
        deploy("<b>Deploy</b><br/>Docker")
    end

    subgraph scw["Scaleway · fr-par"]
        registry("<b>Container Registry</b><br/>Scaleway")
        subgraph containers["Serverless Containers"]
            staging("<b>Staging</b><br/>Next.js")
            prod("<b>Prod</b><br/>Next.js")
        end
    end

    deploy -->|"image"| registry
    registry -->|"staging branch"| staging
    registry -->|"main branch"| prod
    visitor -->|"HTTPS"| containers

    style github stroke-dasharray:5 5
    style scw stroke-dasharray:5 5
    style containers stroke-dasharray:3 3

    classDef visitor fill:#08427b,stroke:#052e56,color:#ffffff
    classDef github fill:#2088ff,stroke:#1565c0,color:#ffffff
    classDef docker fill:#2496ed,stroke:#1a73b8,color:#ffffff
    classDef scaleway fill:#4f0599,stroke:#36036b,color:#ffffff
    classDef nextjs fill:#000000,stroke:#000000,color:#ffffff
    class visitor visitor
    class ci github
    class deploy docker
    class registry scaleway
    class staging,prod nextjs
```

## Environments

|                    | Staging                                                                         | Production                                                                   |
| ------------------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| Git branch         | `staging`                                                                       | `main`                                                                       |
| GitHub environment | `staging`                                                                       | `production`                                                                 |
| Config file        | [`deploy/staging.env`](../deploy/staging.env)                                   | [`deploy/production.env`](../deploy/production.env)                          |
| Container          | `foncier-plus-staging`                                                          | `foncier-plus-prod`                                                          |
| Default URL        | https://foncierplus21feb01d-foncier-plus-staging.functions.fnc.fr-par.scw.cloud | https://foncierplus21feb01d-foncier-plus-prod.functions.fnc.fr-par.scw.cloud |

## How a deploy works

1. A push to `staging` or `main` runs [`deploy_scaleway.yml`](../.github/workflows/deploy_scaleway.yml).
2. The workflow loads the matching `deploy/*.env` file and builds the image from the
   [`Dockerfile`](../Dockerfile). `ALLOW_INDEXING` is passed as a build argument, because pages
   are prerendered at build time.
3. The image is pushed to the Scaleway Container Registry, then the container is updated to
   that image and redeployed.

Each GitHub environment holds `SCW_ACCESS_KEY` and `SCW_SECRET_KEY` for its own Scaleway IAM
application (`foncier-plus-deploy-prod`, `focnier-plus-deploy-staging`). Both applications have
`ContainerRegistryFullAccess` and `ContainersFullAccess`.

## Notes

- **HTTPS only.** The containers redirect plain HTTP to HTTPS.
- **Caching and compression.** The Next.js server gzips responses and sends long cache headers
  for `/_next/static/*`. No CDN is needed at the current traffic level.
