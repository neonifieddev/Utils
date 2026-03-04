# Sync Networker

Lightweight RemoteEvent/RemoteFunction wrapper with **rate limiting** and **payload byte limiting**, designed to be required by both server and client.

## Documentation

- Website docs (Docusaurus):
  - Install: `npm install`
  - Run: `npm run start`
  - Build: `npm run build`

- Content:
  - Intro: [`docs/intro.md`](docs/intro.md)
  - API: [`docs/api/sync.md`](docs/api/sync.md)

## Static website (just HTML/CSS/JS)

If you want a plain site you can upload anywhere (with `index.html` etc), use the `site/` folder:

- Entry: `site/index.html`
- API: `site/api/Sync/index.html`

To preview locally (no build step), from the repo root run one of:

- PowerShell (Windows + Python installed):
  - `python -m http.server 4173 --directory site`
- Node (if you have it):
  - `npx --yes http-server site -p 4173`
