# junxiong.dev UI review, November 2026

Reviewed on 2026-11-07 against [`STYLE.md`](../STYLE.md) (the site's UiPack spec, written in the
same pass) and UiPack's core rules (layout floors, writing rules, accessibility, the tier-1
grader). Baseline: `main` at `195cb1e`, live at junxiong.dev and as a local production build. Fixes
are on branch `site-ui-1`.

## How it was checked

- **Tier 1 (mechanical).** UiPack's grader (`npm run grade -- check`, uipack `f10d920`) on 17
  pages covering every page type: `/`, `/ai-tooling`, `/compoze`, `/groundplane`, `/skills`,
  `/skillsmith`, `/trading-engine`, `/trading-engine/v2`, `/trading-engine/v1/1.8`,
  `/trading-engine/docs`, `/resume`, `/works`, `/works/codeparty`, `/contact`, `/hobbies`,
  `/uipack`, `/404`. Each at 1440×900 and 390×844 (touch), light and dark, reduced motion on: 68
  views per run. Runs: live site, local `main` build, local branch build.
- **Spec and config.** `--spec STYLE.md` reads the site's faces from the spec but applies the 12px
  text floor to everything, including figure SVG. Core sets 11px inside figures (tier-1.md,
  `text-size`), so the branch adds `uipack-grade.json` (the spec's faces, the 11px SVG floor and the
  site's colour-mode key). The before numbers below come from `--spec STYLE.md`; the after run uses
  the config. Under either, the only 12px-floor failures left are figure labels at 11px.
- **Review read.** Full-page screenshots of each view, then a read by layer (style, writing,
  layout, parts) against the spec and the core rules.
- **Evidence.** Screenshots and per-page grader summaries are in
  `~/Sideproject/skills-private/.evals/uipack-review/review/sites/junxiong-dev/`
  (`before/`, `after/`, `live-before/`, named `<page>-<view>.png` and `<page>-summary.md`).
- **Not run:** tier 2 (no judges have seen it) and Lighthouse (not installed in this environment).
  The last Lighthouse result on file is 100 on every desktop page and 99 on one mobile page
  (2026-10-22).

## Tier 1, before and after

Failing views per check, summed over the 17 pages (each page has 4 views):

| Check | Live `main` | Local `main` | Branch `site-ui-1` |
| --- | --- | --- | --- |
| `text-clip` (the ↗ glyph cut by its clip box) | 68 / 68 views | 68 / 68 | 0 |
| `tap-targets` (touch 44px, pointer 24px) | 42 views | 42 | 0 |
| `focus-visible` (ring clipped) | 59 views | 58 | 0 |
| `text-size` (below 12px; 11px in figures) | 68 views | 68 | 0 with the 11px figure floor (figure labels are 11px) |
| `font-faces` (system-ui in the object gallery) | 4 views (`/uipack`), plus 2 on live `/contact` | 4 | 0 |
| `one-h1` | 4 views (`/uipack`) | 4 | 0 |
| overflow, overlap, row heights, contrast, alt, heading order, reduced motion | pass | pass | pass |
| **Pages passing** | 0 / 17 | 0 / 17 | **17 / 17** |

The live and local numbers agree page by page except live `/contact`, where the headless browser
drew the 3D scene's no-WebGL fallback and its "INBOX" label asked for `system-ui`; the branch
sets that label to the site's sans as well.

## Findings, ranked by user impact

Status: **Fixed** means fixed on `site-ui-1`. **Proposed** means it changes something the owner
decided, or the brand, and waits for the owner.

### 1. Touch targets below 44px on every page (Fixed)

- **Evidence.** `tap-targets` failed at 390 on all 17 pages. Every footer link was 32px tall
  (`components/Footer.js:47`), every back link 32px (`pages/compoze.js:133` and nine copies), the
  résumé contact row 32px with "Email" 37px wide (`components/Resume/PrintHeader.js:56-65`), the
  trading update list 36px (`components/TradingVersionList.js:38`), the AI-tooling sibling cards'
  links 23px (`components/AiToolFamily.js:58`), the Archive entry links 20px
  (`pages/works/[slug].js:40,160`), "see 1.8, the latest update" 32px
  (`components/VersionSwitcher.js:82`) and the docs header's two links 32px (UiPack's
  `.uipack-docs__identity a`). Crops: `before/home-summary.md`, `before/resume-summary.md`.
- **Rule.** Layout floor 4: 44px on touch, 24px with a fine pointer.
- **Fix.** 44px boxes with matching negative margins, so nothing moves on the page. Footer links are
  44×44 on phones and stay 32px from 768px up. The back link is now one component
  (`components/ArticleParts.js`, `BackLink`) instead of eleven copies: the copies are how the 32px
  value spread. The design brief's "32px hit areas on inline utility links" should read "44px on
  touch".

### 2. Focus rings clipped (Fixed)

- **Evidence.** `focus-visible` failed in every view. "Skip to content" sat inside the column that
  clips horizontal overflow (`components/layouts/Main.js:180`). The engine-update chips scroll
  sideways with no room for their ring (`components/VersionSwitcher.js:30`); the docs sidebar and
  contents rail (16 links), the object gallery's scene list and the Compoze user-flow canvas clip
  their rings (UiPack parts).
- **Rule.** Layout floor 5, visible focus; tier-1 `focus-visible`.
- **Fix.** The skip link moved outside the clipped column, now in the site's ink and accent instead
  of Chakra gray and mint. The chip row gained 6px of inner room. Inside clipping UiPack boxes the
  ring is drawn inset with no transition (`styles/globals.css`, "Focus rings inside clipping
  boxes"). Before the fix those links got a ring that faded in over a frame from the wrong offset.

### 3. The ↗ arrow is cut off on every link that has one (Fixed)

- **Evidence.** `text-clip` failed 5 to 19 times per page: the clip box was 1em tall at line-height
  1, so the glyph's ascent and descent were cut by 2px in body links and 4 to 6px in card titles
  (`before/home-1440-light.png`, the nav and the card titles). The nav and footer arrows were also
  11px, under the 12px floor (`components/Navbar.js:79`, `components/Footer.js:56`).
- **Rule.** Tier-1 `text-clip` and `text-size`; the arrow is the site's signature ornament
  (STYLE.md, Ornaments).
- **Fix.** The clip box gets 0.2em of padding above and below, cancelled by the same negative margin
  (`styles/globals.css`, Link arrows). The fly-out animation is unchanged. Arrows are 12px minimum.

### 4. Figure labels drop to 9.5px on phones (Fixed, owner to confirm)

- **Evidence.** `text-size` at 390: 9.5px labels in every case-study figure (17 on `/compoze`, 21
  on `/trading-engine/v1/1.8`), from `MOBILE_MIN_FONT = 9.5` (`components/figureMobile.js:11`).
- **Rule.** Core figure type floor, 11px (UiPack style rules, Diagrams; tier-1 `text-size`).
- **Conflict.** The owner chose 85% scale with a 9.5px floor on 2026-09-23 (design.md, "Figures on
  phones").
- **Fix.** The floor is now 11px, and phones draw figures at their designed size (scale 1) rather
  than 85%. The first attempt kept the 85% scale and raised the floor, but uipack then enlarges
  labels past their boxes ("load SKILL.md", "pass or raise" on `/uipack`; "its own branch",
  "watch-only for now" on `/trading-engine`; `e2e/polish.spec.js` caught them). At scale 1, labels
  render at their authored 11px, exactly as on desktop. The sideways swipe and swipe hint stay;
  there is about 15% more to swipe. If the owner prefers 85% at 9.5px, revert
  `components/figureMobile.js` and record an exception: tier 1 will then fail on every figure page
  at 390.

### 5. `/uipack` breaks two core rules: two h1s, and a face outside the spec (Fixed)

- **Evidence.** `one-h1` found the page's h1 and the docs sample's `# Product documentation`
  (`components/UipackDocs.js:4`). `font-faces` found 20 to 40 texts in the object gallery and
  inspector drawn in the system UI font (UiPack's `objects.css` sets `font: … system-ui`).
- **Fix.** The sample's headings now start at h3 under the section's h2 and are styled at the real
  docs sizes, so the sample looks the same. The gallery parts take `--font-sans`. Both overrides
  stay in `styles/globals.css` until UiPack's own parts read the site faces (see the bump notes).

### 6. Archive entries use another design language (Fixed in part)

- **Evidence.** `/works/<slug>` used Chakra's default green badges for meta labels and the date,
  Chakra's external-link icon instead of ↗, and an inline breadcrumb "Archive ›" instead of the
  back link every other article uses (`components/Work.js:6-24`, `pages/works/[slug].js:40,160,175`;
  `before/works-codeparty-1440-light.png`). Green is not in the palette; the theme kept the whole
  green scale only for these badges (`lib/theme.js:198`).
- **Fix.** Back link and h1 like every article page, mono muted labels (the fact-table look) for the
  meta and the date, ↗ on every link; the green scale is dropped from the theme.
- **Still open.** The centred 16px "Project Showcase" h2 and the 8px-radius screenshots
  (`components/Work.js:30`) don't match the case studies. Low traffic, so left for a later pass.

### 7. Page structure is copied per page, so it drifts (Fixed in part)

- **Evidence.** Seven pages each defined identical `P`, `H2` and `Code` components, and eleven
  pasted the back link (`pages/compoze.js:28-44`, `pages/skills.js:15-23`, …). Finding 1 is the
  cost: one wrong value in eleven places. h1 sizes drift too: 40/52 (case studies), 36/46 (trading
  updates), 34/44 (résumé), 26/30 (Archive), 26/32 (Archive entries, 404), 44/64 (Contact),
  46/58/74 (home), clamp(52–104) (Hobbies).
- **Rule.** Consistency across pages of one type (STYLE.md, Layout: Article).
- **Fix.** `components/ArticleParts.js` holds `BackLink`, `P`, `H2` and `Code`, and the pages
  import them.
- **Proposed.** One h1 scale per page type: case-study 40/52 for every article page, including
  Archive and the trading updates. That changes how those pages look, so it waits for the owner.

### 8. The mobile browser bar doesn't match the page (Fixed)

- **Evidence.** `pages/_document.js:10-11` set `theme-color` to `#F1EEE6` / `#0E1512`. The page is
  `#F3EFE7` / `#151311`, and the dark value is green-black, left over from the old mint palette.
- **Fix.** Set to the paper colours.

### 9. Two container radii, two eyebrow systems, two filled buttons (Proposed)

- **Evidence.**
  - Lead cards, Links out and the Next card use 6px; supporting cards, AI-tooling sibling cards,
    canvases and controls use 4px (`components/SelectedWork.js:56,206`,
    `components/AiToolFamily.js:52`).
  - Every eyebrow is `// LABEL` in accent mono except the résumé: `SINGAPORE · RÉSUMÉ` with no
    prefix, and `◆ ROLES` with a cobalt diamond (`components/TermHeading.js:8`,
    `before/resume-1440-light.png`).
  - The filled buttons differ: Email me is 6px with the accent fill
    (`pages/contact.js:76`); Download PDF is 4px, Chakra's `mint` scheme (aliased to cobalt), with an icon
    (`components/Resume/PrintButton.js:10`).
- **Rule.** Core allows one container radius per site; one eyebrow marker and one primary button
  per site keep it recognisable (STYLE.md, Ornaments).
- **Proposal.** 6px for every card-like container, keeping 4px for controls and inner panels. The
  résumé uses `//` eyebrows. One filled-button style. These change the look slightly, so they wait
  for the owner (STYLE.md, Open TODOs).

### 10. Case studies are long, and the text column leaves half of a wide screen empty (Proposed)

- **Evidence.**
  - Full-page heights at 1440: `/compoze` 11,203px, `/uipack` 8,719px, `/groundplane` 5,573px,
    `/trading-engine/v2` 4,667px (`before/compoze-1440-light.png`).
  - The 680px column is left-aligned, so at 1440 the right ~45% of the viewport is empty beside
    every paragraph, and only figures use it.
  - At 390 `/trading-engine/v2` is 6,751px of mostly unbroken prose.
- **Rule.** Writing rule 6 (each unit adds something) and the owner's own open item ("cut case
  studies 40–50%", design.md).
- **Proposal.** Owner's call; nothing implemented:
  1. Cut Compoze to its two strongest figures, with the other three behind a disclosure.
  2. Put the fact table beside the prose at ≥1200px (a sticky right rail) instead of after it, so
     the empty half carries the numbers.
  3. Split `/trading-engine/v2` into its era index plus `2.N` update pages, as design.md already
     plans.

### 11. Motion timing differs from core (Proposed)

- **Evidence.** The site's base UI duration is 220ms (`--dur-ui`, `styles/globals.css:53`); core
  fixes base at 320ms. Hover and quick (160ms) and slow (560ms) match.
- **Proposal.** Keep 220ms and ask UiPack to allow it, or move to 320ms. Either way it is recorded
  in STYLE.md Open TODOs; the site feels snappy now and nothing is broken.

### 12. Diagram colours: an open owner decision (No change)

The site recolours every UiPack figure (`styles/globals.css:197-233`): Chakra roles for
ink/ground/accent, its own flow hexes (`#3d63d9` / `#2fa778` / `#8a55d6`, dark `#8ea4ff` /
`#5fd39b` / `#c39aff`). UiPack's Blueprint look is `fixed` (figures identical on every site). The
owner has not decided which way to go. Both options are written up in STYLE.md, Component looks. The
overrides were left exactly as they are.

## Writing

The copy is the strongest part of the site and reads like a person: plain h1s, first person,
problem then choice then result, no slogans. Nothing was rewritten. Suggestions for the owner:

- Hero: "Below is what I build in my own time." The page then opens with "Selected work", and
  Compoze, the first card, was a company, not spare-time work. "Below are things I build outside
  work" or dropping the sentence would avoid the mismatch.
- Homepage Compoze card: "A side business next to TikTok, where I did the sales…". The hero
  paragraph and the Compoze page lede also say it ran beside TikTok, three times on two screens
  (writing rule 6).
- `/trading-engine/v2` lede (390 view): five sentences, about 60 words, in semibold. A one-sentence
  lede with the rest as body would answer first.
- Archive entry heading "Project Showcase" is a section-kind label ("Features"-style head, web
  writing rule); "Screenshots" says what the reader gets.
- Résumé summary "I build production agent runtimes, tool servers, and backend platforms" uses
  Oxford commas; the rest of the site doesn't. Minor; the résumé mirrors LinkedIn, so change both
  or neither.

## Performance and LCP

Not measured in this pass (no Lighthouse here). From the code:

- The home LCP element is the h1, deliberately not faded (`.hero-settle` moves only), and the
  portrait is preloaded at 126 / 284px.
- Both faces load through `next/font` with swap and generated fallbacks.
- Three.js loads only on Hobbies, Contact and `/uipack`, behind activation.

Nothing in this branch adds weight. Bumping the UiPack pin (below) would double-load IBM Plex if
UiPack's own fonts are imported alongside `next/font`: choose one.

## Overall critique

**What works.** A distinct, quiet identity: warm paper, one cobalt, mono `//` eyebrows, framed
technical previews, the single ↗ arrow. It reads as one person's notebook, not a template. The
copy is honest and specific. The homepage is well proportioned at both widths; the first project
title lands inside the first phone screen as planned. Dark mode is a real palette, not an
inversion. Accessibility work was already careful (contrast passes everywhere, reduced motion is
respected, heading order passes on every page). The failures were all floors that drifted by a few
pixels, now fixed.

**What's weakest.**

- Length and pacing of the case studies, Compoze and the trading pages especially. Long walls of
  prose sit in a narrow left column, with the right half of a wide screen empty.
- Small inconsistencies that add up on the less-visited pages: the résumé, Archive entries, the h1
  scale, two radii, two button styles.
- Diagrams that may or may not match the owner's other sites, pending the decision above.

**The changes that would improve the site most, in order:**

1. Cut and pace the case studies (finding 10): the biggest gain in how the site reads, and the
   owner's own open item.
2. One type scale and one set of article parts for every article page (finding 7): h1 sizes, the
   résumé and Archive brought into the same grammar.
3. Settle the diagram decision (finding 12), then bump the UiPack pin with a proper role mapping
   (below), so the site stops carrying per-component overrides.
4. One container radius, one eyebrow, one filled button (finding 9).
5. A wide-screen layout for article pages (fact table or contents beside the prose), so 1440 isn't
   a phone column with margins.

Brand changes proposed: none beyond 4. The palette, faces and terminal flavour fit the site and
should stay.

## Second pass (same branch)

Done after the first review, at the owner's request to improve the UI as far as possible without
changing words, palette or fonts. Tier 1 still passes on all 17 pages (68 views); lint, build and the
browser suite pass. Screenshots: `after-pass2/` in the evidence folder, plus `rail-*.png` (the
contents rail mid-scroll).

| Finding | What changed |
| --- | --- |
| 7, h1 drift | One h1 per page type, recorded in STYLE.md, Type: home/landing 46 / 58 / 74px (`/`, `/contact`, `/hobbies`); article, docs and archive 40 / 52px. `LANDING_TITLE` / `ARTICLE_TITLE` in `components/ArticleParts.js`; docs h1 via `styles/globals.css`. Hobbies' chapter heads dropped to 36 / 46 / 52px so they stay below its h1 |
| 9, two radii | Every card-like container is 6px (supporting cards, AI tooling cards, Archive screenshots joined the lead cards); 4px stays for controls and panels inside cards |
| 9, two eyebrows | One `Eyebrow` (`//`, mono 12px 700, 0.08em, accent) on every page; the résumé's diamond and unprefixed kicker now use it; meta lines and Hobbies' labels tracked 0.08em |
| 9, two buttons | `components/FilledButton.js`: Email me and Download PDF share Chakra's solid accent button, 4px radius, 44px |
| 11, motion | Core timings: hover/press 160ms, base 320ms, slow 560ms (the hero settle was 700ms, the portrait 900ms, the menu 180ms, the logo 200ms, UI 220ms). Exception recorded in STYLE.md: the ↗ fly-out and the card fill take base 320ms because they travel across the element |
| 10, empty right half | From 1200px, long articles get a sticky `// On this page` rail built from the page's own h2s (`components/ArticleContents.js`), on the case studies and trading pages. Full-width figures carry an opaque ground and the rail fades while one crosses it. Prose keeps its 680px measure; DOM and reading order are unchanged; no words added. Recorded in STYLE.md, Layout: Article |
| 6, Archive | "Project Showcase" is a left-aligned article h2, not a centred 16px head |
| Polish | Leftover mint-era greenish rules (`rgba(26,36,32,…)`) on the portrait frame, Archive ledger and résumé header replaced with the border token |

Still proposals (they need copy cuts or an owner decision): cutting Compoze and the trading pages
(finding 10, items 1 and 3), the copy suggestions above, the diagram decision (12), the phone figure
scale (4, implemented and flagged), and the UiPack bump below.

## Notes for the UiPack bump (not done in this pass)

The site pins `e6b6ed7`, 581 commits behind uipack `main` (`f10d920`). Bump after uipack tags
v0.2.0. What it needs:

- **Roles.** UiPack's parts now read `--ui-*` roles (`--ui-ink`, `--ui-paper`, `--ui-accent`…) and
  `--tune-*` hooks, and the default style is Technical (Cyanotype: Prussian blue and amber). Without
  a mapping the docs shell, object gallery, slide starters and figures would turn Cyanotype. Add one
  site-level block mapping the Chakra semantic tokens to the roles in STYLE.md's Role values table:
  `--ui-paper: page.bg`, `--ui-surface: surface.raised`, `--ui-ink: page.text`,
  `--ui-ink-2: text.muted`, `--ui-line: border.subtle`, `--ui-accent: brand.solid`, and so on.
- **Overrides.** Remove the per-component overrides in `styles/globals.css` the roles then cover:
  `--uipack-*` on `.uipack`, `.uipack-browser`; `--object-*`, `--gallery-*`, `--presentation-*`;
  the docs heading sizes.
- **Figures.** They still alias `--uipack-fg` and the rest to roles, so the existing overrides keep
  working, but the outcome depends on the diagram decision. Option A means deleting them; option B
  means a `flex` look in UiPack first.
- **Fonts.** UiPack self-hosts IBM Plex; the site loads it through `next/font`. Keep one (keeping
  `next/font` means the site's `--ui-font-*` point at `--font-sans` / `--font-mono`).
- **Overrides added in this pass.** The inset focus rings and gallery font overrides compensate for
  UiPack parts. Check whether `main` already fixes them (`objects.css` still sets `system-ui` at
  `f10d920`); if not, fix them in UiPack and drop the site overrides.
- **Registry.** Add the site's row in `playground/docs-manifest.ts` (see STYLE.md, Reuse) and
  re-run `check-spec` against the new pin.
