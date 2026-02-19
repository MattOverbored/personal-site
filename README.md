# Matt Hovis — Personal Site

Welcome! 👋

This repository contains the source code for my personal website, built with [Eleventy (11ty)](https://www.11ty.dev/). The goal of this project is to keep things simple, fast, and easy to update.

If you're here to run the site locally, make edits, or publish updates, this guide walks you through everything in plain language.

---

## What this project includes

The site currently includes:

- A homepage
- A professional page
- A blog section with tags and individual posts
- A lightweight admin area configuration
- Netlify deployment configuration

---

## Project structure (quick tour)

```text
.
├── src/                   # Main site source files
│   ├── _includes/         # Shared templates/layouts
│   ├── admin/             # CMS/admin config files
│   ├── blog/              # Blog templates, tags, and posts
│   ├── index.njk          # Homepage template
│   ├── professional.njk   # Professional page template
│   └── styles.css         # Main styles
├── netlify.toml           # Netlify build/deploy settings
├── package.json           # Scripts and dependencies
└── README.md              # You are here
```

---

## Prerequisites

Before you start, make sure you have:

- **Node.js** (recommended: current LTS)
- **npm** (comes with Node.js)

Check your versions:

```bash
node -v
npm -v
```

---

## Getting started (local development)

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Start the local development server**

   ```bash
   npm start
   ```

3. Open your browser and visit the local URL shown in your terminal (typically `http://localhost:8080`).

Eleventy will automatically rebuild when files change.

---

## Build for production

To generate the static site output:

```bash
npm run build
```

This runs Eleventy once and creates the production-ready build.

---

## How to update content

### Edit pages

- Homepage: `src/index.njk`
- Professional page: `src/professional.njk`

### Add or update blog posts

- Blog posts live in `src/blog/posts/`
- Posts are written in Markdown (`.md`)
- Example post: `src/blog/posts/hello-world.md`

### Update styles

- Main styles: `src/styles.css`
- There is also a root-level `styles.css` file in the repo; if you are changing design, confirm which stylesheet your templates reference.

---

## Deployment notes

This repo includes `netlify.toml`, so it is ready for Netlify-based deployment. Typical flow:

1. Push your changes to the main branch (or open a PR).
2. Netlify builds the site automatically.
3. If build succeeds, your changes are published.

---

## Common commands

```bash
npm install      # Install dependencies
npm start        # Run local dev server with live reload
npm run build    # Build static site for production
```

---

## Troubleshooting

- **Port already in use**: Stop the process using that port or run Eleventy on a different one.
- **Build errors**: Read the terminal output carefully; template syntax errors are usually reported with file names.
- **Dependency issues**: Delete `node_modules` and `package-lock.json`, then run `npm install` again.

---

## Contributing (future-friendly)

If you contribute to this site, please:

- Keep copy clear and human-friendly
- Prefer simple templates over complex abstractions
- Test locally before opening a PR
- Include a short summary of what changed and why

---

Thanks for checking out the project. If you're maintaining this later: you've got this 💪
