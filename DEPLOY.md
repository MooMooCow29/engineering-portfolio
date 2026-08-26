# Deploying the portfolio to GitHub Pages

Repository: `MooMooCow29/engineering-portfolio`

1. Extract the ZIP.
2. Upload the **contents** of the extracted folder to the repository root. `index.html` must sit in the root of the repository.
3. Commit the changes to `main`.
4. In repository **Settings → Pages**, use **Deploy from a branch**, branch `main`, folder `/(root)`.
5. The public site is configured for:
   `https://moomoocow29.github.io/engineering-portfolio/`

Before committing a future project update, run:

```bash
node build.mjs
```

This regenerates all project pages and the sitemap.
