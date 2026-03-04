# Deploying (GitHub Pages)

This docs site is built with Docusaurus and deployed by GitHub Actions (`.github/workflows/deploy.yml`).

## 1) Update `docusaurus.config.js`

Set these to match your repo:

- `url`: `https://<YOUR_GITHUB_USERNAME>.github.io`
- `baseUrl`: `/<YOUR_REPO_NAME>/`

Example:

```js
url: "https://neo.github.io",
baseUrl: "/sync-docs/",
```

If you use a custom domain, set `baseUrl: "/"`.

## 2) Enable Pages

In GitHub repo settings:

- **Settings → Pages**
- Source: **GitHub Actions**

## 3) Push to `main`

The workflow will build and publish the site.

