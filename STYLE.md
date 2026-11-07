---
spec: junxiong-dev
site: junxiong.dev (Ong Jun Xiong's personal site)
extends: core
pages: [landing, article, documentation]
layouts: { landing: custom, article: custom, documentation: docs-shell }
components: { diagrams: blueprint, 3d: [studio, paper-theatre, kinetic, cartoon] }
status: draft
uipack: e6b6ed7d356b8973e788a8ff5d845173a5ac9104
values: none
---

# junxiong.dev: style spec

This spec describes junxiong.dev as it is on `main` (commit `195cb1e`, 2026-10-22), written from
UiPack's template. The values come from `lib/theme.js`, `styles/globals.css`, `pages/_app.js` and
the page components; a value the code does not set is a `TODO:` line naming what would decide it.
The owner's standing brief (goals, hard rules, closed decisions) lives in the personal data store
at `life/career/personal-site/design.md`; where this spec and that brief disagree, the brief wins
and this file is updated. UiPack does not render this look (`values: none`): the site paints it
with a Chakra UI v2 theme and maps UiPack's `--uipack-*` variables onto Chakra's semantic tokens.

## Identity

A personal cabinet of things one engineer built, read by recruiters who Google the name and by
engineers who follow a link. It should feel like a well-kept workbench: warm paper and ink
neutrals, one cobalt accent, a restrained terminal flavour (mono `//` eyebrows, dated mono
captions, `fig. N —` figure captions) and flat 1px-framed surfaces. The recognisable idea is a
printed engineering notebook on warm paper: strong sans titles over mono labels, technical
previews on a dotted canvas, and every link ending in one ↗ arrow that flies out of its corner. It
is not a landing-page funnel (no proof counters, skills matrix, timeline or closing CTA), not a
résumé (except `/resume`), and not glassy or gradient-lit.

## Role values

Every role in the role contract, light and dark. Values are the site's actual tokens (Chakra
semantic token or CSS variable named in the note where useful). Translucent lines are kept as the
`rgba()` the theme writes.

<!-- generated:contract-roles -->
| Role | Light | Dark |
| --- | --- | --- |
| `--ui-paper` | `#F3EFE7` | `#151311` |
| `--ui-surface` | `#FBF8F2` | `#211D1A` |
| `--ui-surface-raised` | `#FFFDFC` | `#28231F` |
| `--ui-surface-2` | `#E7DED2` | `#2B2521` |
| `--ui-ink` | `#29231F` | `#F2ECE3` |
| `--ui-ink-2` | `#655C55` | `#BDB3A8` |
| `--ui-ink-3` | TODO: the site uses two ink steps (page.text, text.muted); a third needs the owner to pick one that keeps 4.5:1 on paper | TODO: same |
| `--ui-line` | `rgba(41,35,31,.18)` | `rgba(242,236,227,.16)` |
| `--ui-line-soft` | TODO: one line weight today (border.subtle); decided if a softer rule is introduced | TODO: same |
| `--ui-accent` | `#234EA2` | `#9AB6FF` |
| `--ui-on-accent` | `#FBF8F2` | `#151311` |
| `--ui-accent-surface` | TODO: no accent-filled surface besides the Email button (brand.solid); decided by the owner if a band or tint is added | TODO: same |
| `--ui-accent-ink-2` | TODO: not used | TODO: not used |
| `--ui-accent-line` | `rgba(35,78,162,.48)` | `rgba(154,182,255,.56)` |
| `--ui-flow-request` | TODO: open owner decision (Component looks). Today `styles/globals.css` paints `#3d63d9` | TODO: open owner decision. Today `#8ea4ff` |
| `--ui-flow-response` | TODO: open owner decision. Today `#2fa778` | TODO: open owner decision. Today `#5fd39b` |
| `--ui-flow-change` | TODO: open owner decision. Today `#8a55d6` | TODO: open owner decision. Today `#c39aff` |
| `--ui-data-pos` | TODO: the site draws no data charts; decided when one is added | TODO: same |
| `--ui-data-neg` | TODO: no charts | TODO: no charts |
| `--ui-data-context` | TODO: no charts | TODO: no charts |
| `--ui-data-1` | TODO: no charts | TODO: no charts |
| `--ui-data-2` | TODO: no charts | TODO: no charts |
| `--ui-data-3` | TODO: no charts | TODO: no charts |
| `--ui-data-4` | TODO: no charts | TODO: no charts |
| `--ui-on-data-1` | TODO: no charts | TODO: no charts |
| `--ui-on-data-2` | TODO: no charts | TODO: no charts |
| `--ui-on-data-3` | TODO: no charts | TODO: no charts |
| `--ui-on-data-4` | TODO: no charts | TODO: no charts |
| `--ui-inv-paper` | TODO: the site has no inverted band; decided if one is added | TODO: same |
| `--ui-inv-surface` | TODO: no inverted band | TODO: no inverted band |
| `--ui-inv-ink` | TODO: no inverted band | TODO: no inverted band |
| `--ui-inv-ink-2` | TODO: no inverted band | TODO: no inverted band |
| `--ui-inv-line` | TODO: no inverted band | TODO: no inverted band |
| `--ui-inv-accent` | TODO: no inverted band | TODO: no inverted band |
| `--ui-inv-node` | TODO: no inverted band | TODO: no inverted band |
| `--ui-node` | TODO: follows the open diagram decision; today figure nodes sit on surface.raised `#FBF8F2` | TODO: same; today `#211D1A` |
| `--ui-line-solid` | TODO: no opaque rule colour; all rules are border.subtle | TODO: same |
| `--ui-accent-ink` | `#234EA2` | `#9AB6FF` |
| `--ui-data-neg-ink` | TODO: no charts | TODO: no charts |
| `--ui-alert` | `#963D25` | `#F1A58B` |
| `--ui-warn` | TODO: no warning state on the site | TODO: same |
| `--ui-slide-font-text` | TODO: the site has no deck of its own; the slide starters on `/uipack` render in UiPack's baked palette and faces | TODO: same |
| `--ui-slide-font-label` | TODO: no deck of its own | TODO: no deck of its own |
| `--ui-slide-font-display` | TODO: no deck of its own | TODO: no deck of its own |
| `--ui-web-font-text` | `var(--ui-font-text)` | `var(--ui-font-text)` |
| `--ui-web-font-label` | `var(--ui-font-label)` | `var(--ui-font-label)` |
| `--ui-web-font-display` | `var(--ui-font-display)` | `var(--ui-font-display)` |
| `--ui-font-text` | `"IBM Plex Sans", system-ui, sans-serif` | `"IBM Plex Sans", system-ui, sans-serif` |
| `--ui-font-label` | `"IBM Plex Mono", ui-monospace, monospace` | `"IBM Plex Mono", ui-monospace, monospace` |
| `--ui-font-display` | `"IBM Plex Sans", system-ui, sans-serif` | `"IBM Plex Sans", system-ui, sans-serif` |
| `--ui-display-weight` | `720` | `720` |
| `--ui-display-tracking` | `-0.035em` | `-0.035em` |
| `--ui-display-case` | `none` | `none` |
| `--ui-label-tracking` | `0.08em` | `0.08em` |
| `--ui-radius` | `6px` | `6px` |
| `--ui-radius-sm` | `4px` | `4px` |
| `--ui-radius-xs` | `2px` | `2px` |
| `--ui-radius-pill` | `999px` | `999px` |
| `--ui-stroke` | `1` | `1` |
| `--ui-rule-width` | `1px` | `1px` |
| `--ui-density` | TODO: the site sets spacing per component on the 8px grid (design.md, Spacing); no single scalar chosen | TODO: same |
| `--ui-type-ratio` | TODO: sizes are set per element (16 / 18 / 22–24 / 32–44 / 52–74px), not from a ratio; the owner would pick one | TODO: same |
| `--ui-measure` | `680px` | `680px` |
| `--ui-ease-settle` | `cubic-bezier(0.23, 1, 0.32, 1)` | `cubic-bezier(0.23, 1, 0.32, 1)` |
| `--ui-ease-travel` | `cubic-bezier(0.77, 0, 0.175, 1)` | `cubic-bezier(0.77, 0, 0.175, 1)` |
| `--ui-dur-quick` | `160ms` | `160ms` |
| `--ui-dur-base` | `320ms` | `320ms` |
| `--ui-dur-slow` | `560ms` | `560ms` |
| `--ui-backdrop` | `none` | `none` |
| `--ui-backdrop-mask` | `none` | `none` |
| `--ui-frame-border` | `1px solid rgba(41,35,31,.18)` | `1px solid rgba(242,236,227,.16)` |
| `--ui-frame-shadow` | `none` | `none` |
| `--ui-card-shadow` | `none` | `none` |
| `--ui-marker-size` | `0` (the eyebrow marker is the `//` text prefix) | `0` |
| `--ui-marker-shape` | `none` | `none` |
| `--ui-marker-color` | `#234EA2` (the `//` prefix, in the accent) | `#9AB6FF` |
| `--ui-section-rule` | `none` | `none` |
| `--ui-nav-fill` | `rgba(243,239,231,.9)` | `rgba(21,19,17,.9)` |
| `--ui-nav-blur` | `14px` | `14px` |
| `--ui-grain` | `0` | `0` |
| `--ui-glow` | `0` | `0` |
| `--ui-cta-shadow` | `none` | `none` |
| `--ui-cta-shadow-hover` | `none` | `none` |
| `--ui-display-scale` | TODO: no global display scale; the hero h1 is set per breakpoint (46 / 58 / 74px) | TODO: same |
| `--ui-em-style` | TODO: no emphasis treatment beyond the browser's | TODO: same |
| `--ui-em-color` | TODO: no emphasis treatment | TODO: no emphasis treatment |
| `--ui-star-fill` | TODO: no ratings or stars | TODO: same |
| `--ui-accent-stroke` | `#234EA2` | `#9AB6FF` |
| `--ui-flow-error` | TODO: open owner decision; not overridden today, so figures show UiPack's own error red | TODO: same |
| `--ui-font-heading` | `var(--ui-font-display)` | `var(--ui-font-display)` |
| `--ui-canvas-pattern` | `radial-gradient(rgba(36,87,197,.17) 1px, transparent 1px) 0 0 / 12px 12px` | `radial-gradient(rgba(142,174,255,.18) 1px, transparent 1px) 0 0 / 12px 12px` |
| `--ui-cta-fill` | `#234EA2` | `#9AB6FF` |
| `--ui-on-cta` | `#FFFFFF` | `#151311` |
| `--ui-em-decoration` | TODO: no emphasis treatment | TODO: no emphasis treatment |
| `--ui-num-ring` | `none` | `none` |
<!-- /generated -->

Site tokens with no contract role, kept here so a future style file can carry them:

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `preview.canvas` | `#F6F2EA` | `#191716` | The dotted canvas behind homepage previews |
| `preview.shadow` | `#D9CFC3` | `#0D0C0B` | The 4px offset shadow under a preview panel |
| `accent.terracotta` / `accent.soft` | `#963D25` / `#F8DDD1` | `#EEBBA7` / `#56271F` | Product evidence (the Compoze preview's header strip) |
| `--tone-agents` … `--tone-site` | `#234ea2` `#a3452b` `#2f6a4a` `#6a3f86` `#8a5410` `#29231f` | `#9ab6ff` `#f2a184` `#8fd3a8` `#d2b0f0` `#f0c274` `#f2ece3` | Card hover fill per project category (`lib/tones.js`); page-bg text on each at 4.5:1 or better |
| `::selection` | `#BFCFFF` on `#151311` | `#315DB6` on `#FBF8F2` | Text selection |

## Type

| Medium | Display | Text | Label |
| --- | --- | --- | --- |
| Page | IBM Plex Sans 720, −0.035em (h1s per the scale below) | IBM Plex Sans 400 / 600; body 16px at 1.65, case-study prose 17 / 18px at 1.8 | IBM Plex Mono 400 / 700, 12px minimum; uppercase eyebrows and meta lines tracked 0.08em |

**h1 scale, one size per page type** (`LANDING_TITLE` and `ARTICLE_TITLE` in `components/ArticleParts.js`):

| Page type | Pages | h1 |
| --- | --- | --- |
| Home (landing) | `/`, `/contact`, `/hobbies` | 46 / 58 / 74px (below 500, from 500, from 960), line-height 0.98, −0.06em |
| Article / case study | Case studies, `/ai-tooling`, `/uipack`, trading era and update pages, `/resume`, `/assets`, `/404` | 40 / 52px (below 768, from 768), line-height 1, −0.045em |
| Docs | `/trading-engine/docs/*` | 40 / 52px (below 900, from 900, UiPack's shell switch), the article size |
| Archive | `/works` and its entries | 40 / 52px, the article size: the ledger is an article page |

Section heads (h2) are 22 / 24px in articles and 32 / 44px for the homepage's and résumé's section titles; Hobbies' chapter heads are 36 / 46 / 52px so they stay below its h1.

Both faces load through `next/font/google` in `pages/_app.js` (latin subset, `display: swap`,
self-hosted at build time): IBM Plex Sans as the variable font, IBM Plex Mono at 400 and 700
only. `next/font` generates the metric-matched fallback faces and exposes the stacks as
`--font-sans` and `--font-mono`, which the Chakra theme's `heading`, `body` and `mono` fonts read.
`next/font` preloads both. Figures read the same faces through `--uipack-sans` and `--uipack-mono`.
Kickers, dates and captions never go below 12px (raised from 11px, 2026-09-28).

## Density and rhythm

No density scalar: spacing is set per component on the 8px grid (design.md, Spacing). Card insets
24 / 32px (mobile / desktop); homepage section gaps 64px on mobile and 96px on desktop; card grid
gaps 16 / 24px; page tops 40 / 64px; group gaps at least twice the gaps inside a group (hero:
eyebrow → name 16, name → subtitle 24, subtitle → body 16). Prose sits in a 680px column; résumé
bullets cap at 760px. Body 16px at 1.65–1.75, case-study prose 17 / 18px at 1.8. Controls are 44px.

### Motion

Curves are the site's own (`--ease-out` `cubic-bezier(0.23, 1, 0.32, 1)` for entrances, `--ease-in-out` for movement); durations are UiPack's core timings, as tokens in `styles/globals.css`:

| Token | Value | Used for |
| --- | --- | --- |
| `--dur-hover`, `--dur-press` | 160ms | Hover and press feedback: colour, border, the 3px card lift, the preview panel's nudge, the logo turn, the mobile menu, the arrow's return |
| `--dur-ui` | 320ms (base) | Things that travel: the ↗ fly-out, the card's category fill, the theme icon turn |
| `--dur-enter` | 560ms (slow) | Entrances: the page fade-up, the hero settle, the portrait coming to rest |

Exception, recorded: the ↗ fly-out and the card fill are triggered by hover but take the base 320ms rather than the 120–160ms hover range, because each travels across its element (the arrow out of its box and back, the fill across the whole card); at 160ms both read as a flicker. Scroll-driven reveals have no duration (they follow the scroll). Reduced motion drops movement everywhere.

## Ornaments

**Slots**

| Slot | junxiong.dev paints |
| --- | --- |
| `--ui-backdrop`, `--ui-backdrop-mask` | None behind the hero. Article pages instead get UiPack's drifting dot grid in the side gutters (`SideBackdrop`, `uipack/web`), only at 1280px and up, in the accent; never on Home or Hobbies |
| `--ui-canvas-pattern` | A 12px cobalt dot grid on the homepage's technical previews only (`DottedCanvas`) |
| Eyebrow marker | One mono label everywhere (`Eyebrow` in `components/ArticleParts.js`): a `//` prefix in mono caps, 12px, 700, tracked 0.08em, in the accent (`// PROJECTS`, `// ELSEWHERE`, `// NEXT`, `// ROLES`). The résumé's diamond markers were replaced in 2026-11 |
| `--ui-section-rule` | None; ruled lists (Links out, Around the site, fact tables) carry 1px rules |
| `--ui-frame-border`, `--ui-frame-shadow`, `--ui-card-shadow` | 1px border.subtle, flat. Hover on a fine pointer lifts a card 3px with a soft shadow and spreads its category fill from the pointer |
| Preview panel | A 1px framed panel with a 4px offset hard shadow (`preview.shadow`) that "presses" onto its canvas as it scrolls in |
| `--ui-nav-fill`, `--ui-nav-blur` | Paper at 90% with a 14px blur, 1px bottom rule |
| `--ui-grain`, `--ui-glow` | 0 |
| `--ui-cta-*` | One filled button style (`components/FilledButton.js`): Chakra's solid button on the accent, white label in light and ink label in dark, the 4px control radius, 44px tall, a darker accent on hover. Used for Email me (Contact) and Download PDF (résumé). Every other action is a link or a 1px-outlined 4px-radius control |
| Link arrow | One ↗ on every link that goes somewhere, flying out of the top-right and back in on hover and focus (`components/OutArrow.js`) |
| Theme change | Paint drizzles down the page (UiPack's `withPaintTransition`); instant under reduced motion |
| Reading progress | A 2px accent bar at the top of case studies (scroll-driven) |

**Treatments**

| Role | junxiong.dev |
| --- | --- |
| `--ui-perf` | TODO: not used |
| Chapter chips | Hobbies' chapter index (`01 Travel` …): 999px pills with a 1px rule, mono 12px, accent border when current |
| `--ui-card-*` | Card fill surface.raised, inset 24 / 32px; every card-like container (project cards, AI tooling cards, Links out, the Next card, Archive screenshots) uses the one container radius, 6px. 4px (`--ui-radius-sm`) is for controls and for panels inside a card (the dotted canvas, the preview panel) |
| `--ui-num-*` | Plain mono numbers (`01 / 06` on Hobbies, `fig. 1 —` captions), no ring or bubble |
| Fact tables | `FactList`: a mono 12px `dl`, a fixed 13rem label column in muted ink, regular-weight left-aligned values, 1px rules |
| `--ui-quote-*`, `--ui-cell-*`, `--ui-window-*`, `--ui-stamp-*` | TODO: not used |

## Layout

Every page shares one shell: a fixed 64px (mobile) / 72px (tablet up) nav whose brand text shares
the content's left edge, a 1120px container with 16px gutters, and a ruled footer. Every layout
keeps the floors.

### Landing

The homepage (`/`). Contact and Hobbies are single-surface pages that follow the same grid with
their own hero (Contact: copy beside a 3D scene; Hobbies: six full-viewport native-scroll
chapters, text beside a 3D object, stacking on narrow screens).

| Setting | This site |
| --- | --- |
| Grid | One 1120px column, 16px gutters below it. Hero: copy on ~1.35fr beside the portrait on ~0.65fr (min 260px) from 768px, 56–80px apart; below 768px the copy spans the width and a 144px portrait sits beside a one-column utility-link list. Selected work: a 12-column grid from 960px (7 + 5), one column below, 16 / 24px gaps |
| Regions | Nav, hero (eyebrow, h1, subtitle, body, portrait, utility links), Selected work, Also building, Around the site, footer |
| Section order | Hero → Selected work (AI tooling, Compoze, each with a static preview) → Also building (Trading engine, UI Pack as full-width cards) → Around the site (Hobbies, Notes, Archive, Resume rows) → footer |
| Hero | The name as the only h1 and only heavy element, a regular-weight subtitle naming TikTok, Singapore and AI infrastructure, one muted paragraph, a framed portrait and GitHub / LinkedIn / Resume links; the first project title stays inside a 390×900 first screen |

### Article

Case studies (`/compoze`, `/groundplane`, `/skills`, `/skillsmith`, `/trading-engine` and its
version and era pages), the hub (`/ai-tooling`), `/uipack`, `/works` and its entries, `/resume`
and `/404`. They do not use UiPack's `LayerSection` parts, so the layout is custom.

| Setting | This site |
| --- | --- |
| Grid | A 680px text column on the container's start edge (left-aligned, not centred), with figures breaking out to the 1120px container; one column below 1200px. From 1200px long articles add a 224px contents rail in the right column (184px gap from the prose); the gutter dot grid only at 1280px and up |
| Regions | Back link, h1, mono meta line, lede (semibold, 19 / 21px), Links out block, prose with figures and h2 sections, fact table, Links out repeated, `// NEXT` card, footer; from 1200px on long articles, the `// On this page` rail |
| Section order | Back link → h1 → meta → lede → Links out → body (prose, `fig. N` figures, h2 sections, native disclosures for inventories) → fact table → closing Links out → Next project |
| Hero | No hero: the back link, the plain-name h1 and a one-paragraph lede; the first figure follows the opening paragraph |

**Wide screens: the contents rail** (`components/ArticleContents.js`, `contents` on the article layout). Chosen over moving the fact table or figures into a side column because it keeps the DOM and reading order, adds no words (it lists the page's own h2s) and leaves every figure at full width. It is on the case studies (Compoze, Groundplane, Agent skills, Skillsmith, Trading engine) and the trading era and update pages; short pages (`/ai-tooling`) and the `/uipack` gallery go without. Behaviour: sticky 96px below the top, the section being read marked with a 2px accent rule, 32px rows (44px on coarse pointers); a full-width figure carries an opaque ground above the rail, and the rail fades out (160ms) while one crosses it. Below 1200px, without script, or with fewer than three sections nothing renders and the prose keeps its 680px measure.

### Documentation

`docs-shell` as is, for the trading engine's product docs (`/trading-engine/docs/*`), rendered by
`DocsLayout` and `DocsMarkdown` from `uipack/docs` inside the site's nav and footer, themed by the
same `--uipack-*` mapping. Product title "Trading engine" links back to the case study; no "View
as Markdown" or "Edit on GitHub" links.

## Writing style

| Setting | This site |
| --- | --- |
| Tone and register | First person, conversational, plain: the problem, the choice and the result in ordinary language. Reads like a person, not a résumé (except `/resume`, which is a résumé by design). No pitch, no "open to roles", no slogans or kickers |
| Title form | Page h1: plain name ("Compoze", "Contact", "Hobbies", "Archive, 2020–2023"). Section heads: plain names of 1–4 words ("Working alone", "Selected work", "Around the site"). Figure titles: plain descriptions, never taglines; captions are one sentence starting `fig. N —` |
| Copy density | Short prose paragraphs of 2–4 sentences, no bullets outside `/resume`; numbers go in the fact table, not the prose; supporting inventories go in native disclosures; one description per figure (a page caption hides the diagram's own blurb) |
| House words | "UI Pack" (two words) for the design library; "Archive" for `/works`; "Resume" in navigation; Compoze was "sold to a client"; card blurbs say what a project is and don't open with "I built" / "I ran"; no internal plan codes on trading pages; no "paper only" disclaimers; no internal business metrics anywhere |
| Budgets | The ceilings, plus: card blurbs at most two sentences; eyebrows 1–5 words in mono caps; Links out details one line |

## Component looks

| Component | junxiong.dev picks | Why |
| --- | --- | --- |
| Diagrams | `blueprint` | The site draws case-study figures with UiPack (framed figure, lanes, nodes, packets, hints). See the open decision below |
| 3D object scenes | `studio`, `paper-theatre`, `kinetic`, `cartoon` | Hobbies pins Cartoon (Coding & AI, Home servers), Studio (Tennis, Trading), Paper worlds (Travel) and Kinetic (Reading); Contact pins Cartoon. The `/uipack` gallery shows all six looks as UiPack's catalogue, not as site picks |

**Open owner decision: do diagrams look the same on every site?** The Blueprint look is `fixed`
in UiPack (figures identical on every site, only light and dark following the host), but this
site does not follow that today. `styles/globals.css` (the `.uipack`, `.uipack-object-frame` and
`.uipack-canvas-dialog` blocks, about line 197) maps the figure variables to the site: ink,
muted, ground, surface, border and accent to the Chakra roles (`--uipack-fg: page.text`,
`--uipack-bg: page.bg`, `--uipack-accent: brand.solid`…), and the flow colours to its own hexes
(request `#3d63d9` / `#8ea4ff`, response `#2fa778` / `#5fd39b`, change `#8a55d6` / `#c39aff`, light /
dark). The owner has not decided which way it goes:

| Option | What it means | What changes |
| --- | --- | --- |
| A. Blueprint fixed | A figure on junxiong.dev looks exactly like the same figure on notes.junxiong.dev or uipack's docs | Remove the overrides once UiPack's figure root owns its values; figures stop matching the warm paper and cobalt |
| B. Figures follow each site's palette | Figures sit in the site's warm paper and cobalt, as today | Needs a `flex` diagram look in UiPack (a core change for every site); the overrides stay, and this spec then owns the flow roles |

Until the owner decides, the overrides stay exactly as they are and the flow roles above stay
`TODO:`.

## Reuse

Extends `core`. No site reuses this spec yet; notes.junxiong.dev has its own look (warm paper,
rust accent, serif and sans) and would write its own spec or say `extends: junxiong-dev` if the
owner wants the two to match. Registry row to add in UiPack's `siteRegistry`
(`playground/docs-manifest.ts`): site junxiong.dev, repo `ong6/junxiong-homepage`, spec
`junxiong-homepage:STYLE.md`, looks `diagrams: blueprint, 3d: studio, paper-theatre, kinetic,
cartoon`, pins `e6b6ed7`.

## Open TODOs

- TODO: the diagram decision (above). Decides the four flow roles, `--ui-node` and whether
  `styles/globals.css` keeps its figure overrides.
- TODO: `--ui-ink-3`, `--ui-line-soft`, the accent surface and emphasis: the site uses two inks
  and one line weight; decided only if a design needs a third step.
- TODO: data, inverted and warning roles: no charts, bands or warnings today; decided when one is
  added.
- TODO: density scalar and type ratio: sizes and spacing are set per component; a ratio would
  only be picked if UiPack renders this look.
- TODO: slide faces: the site has no deck of its own; decided if it adds one.
