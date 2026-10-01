# Weerathep Rattanajaratkul: portfolio

A static [Astro](https://astro.build) site. Content lives in Markdown and small TypeScript files, and the layout lives in components, so you can update the site without touching the design.

```
src/
  content/work/        one .md per job          → "Work experience"
  content/projects/    one .md per project      → project cards + /projects/<file-name>/
  content/awards/      one .md per competition  → "Competitions & hackathons"
  data/                journey.ts, education.ts, skills.ts, facts.ts, beyond.ts
  assets/me.png        your photo (hero)
  content/work/images/ screenshots for the work cards
  components/          Nav, Hero, WorkCard, ProjectCard, AwardCard, ...
  components/illustrations/   the SVG drawings, one component each
  styles/global.css    all styles and colour tokens
design/original-index.html   the original single-file design, kept for reference
```

## 1. Run it locally

You need Node.js 22.12 or newer.

```sh
npm install
npm run dev        # http://localhost:4321, reloads as you edit
npm run build      # type-checks content and builds to dist/
npm run preview    # serves dist/ to check the production build
```

If a content file has a mistake (a missing field, or a misspelt illustration name), `npm run dev` and `npm run build` print which file and which field.

## 2. Add a job, project or award

### A new job

Create `src/content/work/<anything>.md`. `order` sets the position (1 = top), so renumber the others if needed.

```md
---
company: Acme AI
location: Berlin, Germany
role: ML Engineer
title: "Search ranking: from offline metrics to live A/B tests"
start: 2027-09          # YYYY-MM
# end: 2028-06          # leave out while you still work there ("Present")
summary: One or two sentences on the problem and what you built.
resultNumber: "+12%"    # optional big number in the gold box
resultText: click-through on the main search page
accent: gold            # gold | indigo | coral | teal | violet | sky
cool: indigo
tags: [Python, PyTorch, A/B testing]
order: 1
artLabel: System diagram           # small label in the picture's corner
images:                             # one or more; 2+ images get ← / → buttons
  - src: ./images/acme-1.png        # path relative to this .md file
    alt: Architecture of the ranking service
  - src: ./images/acme-2.png
    alt: A/B test results dashboard
    label: Dashboard                # optional, overrides artLabel for this image
# illustration: two-tier-validation # used instead when there are no images
---

- These bullets appear under "Read more".
- Leave the body empty and the "Read more" toggle is hidden.
```

For small tiles like the ones on the AIS card, add:

```yaml
subProjects:
  - name: Outage detection
    description: Anomaly detection on 4G usage.
    icon: outage        # gauge | outage | churn | coverage | pin
```

### A new project

Create `src/content/projects/<url-name>.md`. The file name becomes the page address, so `graph-rag.md` is served at `/projects/graph-rag/`. A card is added to the home page automatically.

```md
---
title: Graph RAG for course notes
summary: The short text on the card and at the top of the project page.
tags: [RAG, LangChain, Neo4j]
order: 4
illustration: hallucination-span     # or image + imageAlt
github: https://github.com/you/graph-rag   # optional; adds a "View on GitHub" button
# image: ./images/graph-rag/cover.jpg
# imageAlt: Screenshot of the chat interface answering a question
# gallery:
#   - src: ./images/graph-rag/1.jpg
#     alt: The retrieval graph for one question
#     caption: Retrieved nodes for "what is backprop?"
---

## The problem

Write the long version here in normal Markdown: headings, lists, **bold**, links and code.
```

Available illustrations: `two-tier-validation`, `network-outage`, `machine-failure`, `hallucination-span`, `point-cloud-pruning`, `rating-matrix`. To add a new drawing, create an `.astro` file in `src/components/illustrations/`, add its name to `names.ts`, and register it in `index.ts`. Use the `s-acc`, `s-cool`, `k-line` and similar classes so it follows the card's colours and dark mode.

### A new award

Create `src/content/awards/<anything>.md`:

```md
---
title: Kaggle LLM Science Exam
place: Kaggle competition          # the grey line under the title
badge: "5%"                        # up to 4 characters fit in the medal: "1st", "10", "48h"
detail: Silver medal               # the result
date: "2027"                       # optional, shown after the result
accent: gold                       # gold | indigo | coral | teal | violet | sky
order: 5
images:                            # optional photos / certificates; 2+ get arrow buttons
  - src: ./images/kaggle-1.jpg     # put files in src/content/awards/images/
    alt: The team with the silver medal certificate
    label: Certificate             # small label in the corner
video: https://www.youtube.com/watch?v=...   # optional; adds a play button
videoLabel: Watch our pitch
---
```

### Smaller lists

Edit the arrays in `src/data/`: `journey.ts` (timeline, mark the latest stop with `now: true`), `education.ts`, `skills.ts`, `facts.ts` (the four numbers under the hero) and `beyond.ts`. Your name, email, LinkedIn and the site description are in `src/lib/site.ts`.

## 3. Photos

**Your portrait:** replace `src/assets/me.png` with your photo (`me.jpg`, `.jpeg` or `.webp` also work; keep only one). It is shown whole, uncropped, so any shape works; around 700–1000 px wide is plenty. Astro resizes it, converts it to WebP and serves the right size per screen. If you delete the file, the site falls back to the built-in "Your photo here" placeholder.

**Work images:** put them in `src/content/work/images/` (e.g. `genotek-2.png`) and add them under `images:` in that job's file, as in the example above. The first one shows by default; with two or more, the card shows arrow buttons and a 1 / N counter. Clicking an image opens it full size. Diagrams and screenshots are shown whole, never cropped.

**Project photos:** put images next to the content, e.g. `src/content/projects/images/graph-rag/cover.jpg`, and reference them with a path relative to the `.md` file:

```yaml
image: ./images/graph-rag/cover.jpg
imageAlt: What the photo shows, for screen readers
```

The photo replaces the illustration in the same card frame, with a thin accent-coloured bar along the bottom. Use `gallery:` (see the project example above) for extra photos on the project page. They load lazily and are resized automatically. `imageAlt` / `alt` are required, and the build stops if they're missing.

**Your CV:** the "Download CV" button opens your CV on Canva (link in `src/lib/site.ts`, field `resume`). Edit the design in Canva and the site shows the new version straight away, with no rebuild needed.

## 4. Deploy

### Vercel (main)

1. Push this repository to GitHub.
2. On [vercel.com](https://vercel.com), choose **Add New → Project**, import the repository and press **Deploy**. Vercel detects Astro, so no settings or `vercel.json` are needed.
3. Every push to `main` redeploys; pull requests get preview links.

The site URL used for canonical links, the sitemap and social previews is picked up automatically from Vercel's production domain.

### GitHub Pages (backup)

`.github/workflows/deploy.yml` builds the site on every push. To publish there as well:

1. In the repository, open **Settings → Pages** and set **Source** to **GitHub Actions**.
2. Run it from **Actions → Deploy to GitHub Pages → Run workflow**. To deploy on every push instead, add a repository variable `DEPLOY_PAGES` = `true` (**Settings → Secrets and variables → Actions → Variables**).

The workflow sets the right `site` and `base` (`https://<user>.github.io/<repo>/`) automatically.

### Custom domain

- **Vercel:** Project → **Settings → Domains → Add**, type your domain, and add the DNS records Vercel shows at your registrar (an `A` record for the root domain, a `CNAME` for `www`). HTTPS is set up automatically. Redeploy once afterwards; canonical links and the sitemap switch to the new domain by themselves. To force a specific address, set the environment variable `SITE_URL` (Project → Settings → Environment Variables).
- **GitHub Pages:** **Settings → Pages → Custom domain**, follow the DNS instructions there, then add the repository variables `SITE_URL` = `https://yourdomain.com` and `BASE_PATH` = `/`.

## Notes

- Fonts (Bricolage Grotesque, Public Sans, JetBrains Mono) are self-hosted from npm through Fontsource, so there are no requests to Google.
- The social preview images (`/og-image.png`, `/og/<project>.png`) and the favicons are generated at build time by `src/lib/og.ts`. Change the text or colours there.
- The site uses the black theme for every visitor. Each section and card picks colours from the named tones; the light palette is still in `global.css` under `[data-theme="light"]` if you ever want it.
- Colours are CSS custom properties in `src/styles/global.css`. A card's `accent` / `cool` fields pick one of the named tones (`gold`, `indigo`, `coral`, `teal`, `violet`, `sky`), and each has a light and a dark value.
