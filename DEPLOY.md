# Deploy to GitHub Pages

This folder is already structured as a static GitHub Pages site. Employers do not need localhost and do not need to install anything.

## Intended public URL

If the repository is named `engineering-portfolio` on the GitHub account `MooMooCow29`, the site is configured for:

`https://moomoocow29.github.io/engineering-portfolio/`

## Option A — GitHub website

1. Sign in to GitHub.
2. Create a **public** repository named `engineering-portfolio`.
3. Upload the **contents of this folder** to the repository root. Do not upload only the ZIP file.
4. Commit the files to the `main` branch.
5. Open the repository **Settings**.
6. Open **Pages** under Code and automation.
7. Under **Build and deployment**, choose **Deploy from a branch**.
8. Select branch `main` and folder `/ (root)`.
9. Save.
10. After GitHub finishes publishing, open:

   `https://moomoocow29.github.io/engineering-portfolio/`

11. Test the homepage, a project page, the CV button, LinkedIn, GitHub and Medium links on both desktop and mobile.

## Option B — Git command line

From inside this folder:

```bash
git init
git add .
git commit -m "Publish engineering portfolio"
git branch -M main
git remote add origin https://github.com/MooMooCow29/engineering-portfolio.git
git push -u origin main
```

Then enable GitHub Pages from `main` / root in repository Settings → Pages.

## Before changing the repository name or using a custom domain

Update this field in `data/content.js`:

```js
siteUrl: "https://your-final-domain/"
```

Then run:

```bash
node build.mjs
```

This is important because the canonical links, Open Graph URLs, sitemap and structured metadata are generated from `siteUrl`.

## Updating the live site later

1. Edit `data/content.js` or add images.
2. Run `node build.mjs`.
3. Commit and push the changed files.

GitHub Pages will publish the updated static files from the selected branch.
