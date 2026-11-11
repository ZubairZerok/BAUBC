# Research Report: Building the `cinematic-vector-explainer` Claude Skill (2D Vector Explainer Production System, verified to November 2026)

You can build this as a standard Agent Skill on all three surfaces: Claude.ai, Claude Code and the Claude API. It needs a `SKILL.md` with a lowercase-hyphen `name` of 64 characters or fewer that matches the folder, and a `description` of 1–1,024 characters with no XML tags.\[1\]\[2\] The body should stay under 500 lines, and reference files should be linked one level deep.\[1\] For Claude.ai you upload a ZIP whose top-level entry is the `cinematic-vector-explainer/` folder.\[3\] The creative system should copy Kurzgesagt's publicly documented *process*: research-led scripting, expert fact-checking, sketching visual metaphors and transitions before illustrating, rigged After Effects animation, and music composed to the finished picture.\[4\] It should not copy the studio's look.

## TL;DR
- **Skill spec (A):** Only `name` and `description` are required. Keep `SKILL.md` under 500 lines and roughly 5k tokens, and link references directly from it.\[1\] Each surface installs differently:
  - **Claude.ai:** upload a ZIP under Customize > Skills (code execution must be on).\[5\]\[6\]
  - **Claude Code:** copy the folder to `~/.claude/skills/` or `.claude/skills/`.\[2\]
  - **API:** upload through `/v1/skills` (30 MB uncompressed limit, up to 20 Skills per request, no network access in the container).\[7\]
  - Skills do not sync automatically between these surfaces.
- **Kurzgesagt method (A):** The studio says a video takes at least 1,200 hours.\[4\]
  - Writing is the bottleneck, and a script can take weeks to years.\[4\]
  - About 200 panels are illustrated in Illustrator by 2–3 illustrators over 8–12 weeks.\[4\]
  - Narration is recorded before animation. 2–3 animators then animate rigged parts in After Effects for 8–10 weeks.\[4\]
  - The music is original and composed to the finished video.\[4\]
  - The editorial team builds statement-by-statement source sheets (15–50 pages), consults about two experts per video, and runs QA after sketch, storyboard and first timed render.\[8\]
- **Tooling for a 2D creator (A/D):**
  - **Illustrator → After Effects 26.x** is the reference pipeline.
  - **Cavalry** has been free for individuals since v2.7 (April 16, 2026, after Canva acquired it) and is the strongest no-cost procedural alternative.\[9\]
  - **Remotion** (free for organisations of up to 3 people) or **GSAP** (fully free since April 30, 2025) cover code-based work.\[10\]\[11\]\[12\] Treat **Motion Canvas** as stalled at 3.17.2.\[13\]\[14\]
  - For assets and voice: **Recraft** produces native SVG, but commercial rights require a paid plan.\[15\] **Azure `bn-BD-NabanitaNeural`/`bn-BD-PradeepNeural`** are the only verified Bangladeshi-locale neural TTS voices.\[16\]

---

## Key Findings

**Label key:** (A) officially documented fact · (B) observation from published videos · (C) industry-standard production method · (D) recommendation for an independent creator.

### 1. Agent Skills specification and Claude surfaces (all A unless marked)

**Frontmatter (open spec, agentskills.io/specification):**

| Field | Required | Constraint |
|---|---|---|
| `name` | Yes | 1–64 chars; lowercase a–z, 0–9 and hyphens only; must not start or end with `-`; no `--`; must match parent directory name\[1\] |
| `description` | Yes | 1–1,024 chars; non-empty; should say what the skill does **and** when to use it, with task keywords\[1\] |
| `license` | No | Short license name or bundled file reference\[1\] |
| `compatibility` | No | 1–500 chars; only if environment requirements exist\[1\] |
| `metadata` | No | String→string map (e.g. `author`, `version`)\[1\] |
| `allowed-tools` | No | Space-separated, experimental, support varies\[1\] |

- **Anthropic-specific additions** (platform.claude.com/docs/en/agents-and-tools/agent-skills/overview): `name` may not contain XML tags or the reserved words `anthropic` or `claude`. `description` may not contain XML tags.\[2\] `cinematic-vector-explainer` is valid.
- **Progressive disclosure:**
  - Metadata costs about 100 tokens per skill and is always loaded.\[2\]
  - The `SKILL.md` body loads on trigger; keep it under 5k tokens.\[2\]
  - Bundled files cost nothing until Claude reads them.\[2\]
  - Scripts run through bash, and only their output enters context.\[2\]
  - Both the spec and Anthropic's best-practices page say to keep `SKILL.md` under 500 lines and keep file references one level deep from `SKILL.md`.\[1\]\[17\]
- **Directory conventions:** `scripts/` (executable code), `references/` (docs read on demand) and `assets/` (templates, images, data) are recommended. Any other folders are allowed. Use relative paths from the skill root.\[1\]
- **Validation:**
  - `skills-ref validate ./cinematic-vector-explainer` comes from the agentskills reference library; a passing skill prints `Valid skill: ./my-skill`.\[3\]
  - `claude plugin validate` checks skills inside plugins (claude.com/docs/skills/how-to).\[3\]

**Conflict to note:** The Claude Help Center article "How to create custom skills" (support.claude.com/en/articles/12512198) still describes `name` as "human-friendly" (example: "Brand Guidelines"), caps `description` at **200 characters**, and lists an optional `dependencies` field.\[6\] The newer claude.com docs and the platform docs both say lowercase-hyphen names matching the directory and descriptions up to 1,024 characters.\[2\]\[3\] **D:** Follow the newer rules. Write a description that front-loads the essential trigger in its first ~200 characters, and have the validator *warn* (not fail) above 200 characters.

**Packaging and installation by surface:**

| Surface | Install path / method | Key constraints |
|---|---|---|
| **Claude.ai / Desktop** | ZIP → Customize > Skills → "+" → "Create skill" → "Upload a skill"; then toggle on\[5\] | ZIP must contain `cinematic-vector-explainer/SKILL.md` (folder as top level; a bare `SKILL.md` at ZIP root "isn't recognized").\[3\] Requires code execution enabled.\[6\] Common upload failures: size limit, folder/name mismatch, missing SKILL.md.\[5\] Org owners can provision skills via Organization settings > Plugins & skills.\[18\] |
| **Claude Code** | `~/.claude/skills/cinematic-vector-explainer/SKILL.md` (personal, all projects on that machine, **not** Cowork or cloud sessions) or `.claude/skills/...` (project, commit to repo); also plugin `skills/` dirs and enterprise managed settings\[19\] | Filesystem-based, no upload.\[2\] Invoke automatically or with `/cinematic-vector-explainer`.\[19\] Script paths: use `${CLAUDE_SKILL_DIR}/scripts/...` (a text placeholder Claude Code and Cowork substitute). Running scripts needs Bash permission.\[3\] Skills enabled on a claude.ai account sync into Cowork, cloud and signed-in terminal sessions.\[19\] |
| **Claude API** | `POST /v1/skills` (zip or files; Python `files_from_dir`; CLI `ant apply`), then reference `{"type":"custom","skill_id":"skill_...","version":"latest"}` in `container.skills` with the `code_execution_20250825` tool\[7\] | Max 20 Skills per request; upload <30 MB uncompressed; files mount at `/skills/{name}/`; **no network access, no runtime package installation**; custom Skills are workspace-wide; new versions are full snapshots and `name` must stay the same; pin `skver_...` versions in production.\[7\] |

- **Environment difference:** The Help Center says Claude.ai and Claude Code "can install packages from standard repositories (PyPI, npm) when loading skills," but the API container cannot.\[6\]\[7\] **D:** Write the validation and packaging scripts in pure Python standard library.
- **Plan availability conflict:**
  - The platform overview lists custom Skills for Pro, Max, Ultra, Team and Enterprise.\[2\]
  - The Help Center lists Free, Pro, Max, Ultra, Team and Enterprise.\[6\]
  - Recording a skill (Cowork, Mac) is limited to Pro, Max, Ultra and Team.\[6\]
- **Claude Code-only frontmatter:** `when_to_use`, `disable-model-invocation`, `user-invocable`, `context: fork`, `paths` and `model` exist only in Claude Code.\[20\]
  - A third-party compatibility guide (aipm-registry.com) reports that Claude.ai upload and the Skills API reject unknown keys with "Unexpected key(s) in SKILL.md frontmatter."\[20\]
  - **D:** Ship only `name`, `description` and optionally `license` and `metadata`.
- **Security (A):**
  - Use skills only from trusted sources, and audit every bundled file for unexpected network calls or file access.\[2\]
  - Never put API keys or credentials in a skill, because everyone you share it with receives its files.\[3\]
- **Testing (A):**
  - Check that every referenced file exists, then try trigger prompts and review Claude's reasoning to confirm the skill loaded.\[3\]
  - Iterate on the description until it triggers reliably.\[3\]
  - Use Anthropic's `skill-creator`. In Claude Code and Cowork it runs the test prompts with and without the skill, in parallel, and reports pass rates, timing and token counts. In chat it runs them one at a time.\[3\]
  - Secondary summaries of the best-practices page add: build at least three evaluations before writing extensive docs, and give files longer than about 100 lines a table of contents.\[21\]\[22\]

### 2. Kurzgesagt's documented production methodology

**From "How to Make a Kurzgesagt Video in 1200 Hours" (official video, published February 16, 2020;\[23\] transcript read via LingQ because YouTube was not fetchable). All A:**
1. **Topic:** The team works on "whatever we find exciting at the time," from serious to "really stupid." The stated aim is to explain complicated things in a graspable way and make science fascinating and beautiful.\[4\]
2. **Research:** Books, scientific papers and expert conversations. The team often changes its view while researching. Writing usually starts after a few weeks of research.\[4\]
3. **Script:** A rough draft is "rewritten and edited over and over again," and experts are asked to fact-check it. Writing is "the bottleneck," taking "a few weeks [to] literally years."\[4\]
4. **Sketching:** Once the script is ready, the team sketches the video. It looks for visual metaphors and transitions between ideas, and decides which scenes need the most attention.\[4\]
5. **Illustration:** About 200 panels per video in Adobe Illustrator. There is an illustration library, but most art is made from scratch "to give our videos a more unique look." Visual easter eggs are added at this stage. 2–3 illustrators work for 8–12 weeks.\[4\]
6. **Narration:** Recorded *after* illustration and *before* animation, on a Neumann TLM 103 microphone into Pro Tools. The narrator records one full pass for flow, then retakes paragraphs and sentences.\[4\]
7. **Animation:** Adobe After Effects, plus Cinema 4D experiments as of 2020.\[4\]
   - Scenes are taken apart and organised, and the hundreds or thousands of parts are imported into After Effects.\[4\]
   - Every character is rigged.\[4\]
   - Apart from a few time-saving plugins, every moving thing is animated by hand.\[4\]
   - 2–3 animators work for 8–10 weeks.\[4\]
8. **Music and sound:** Every track is original and composed to the finished video. Sound effects add "an additional layer," and the team recommends watching on headphones.\[4\]
9. **Workflow:** 2–4 videos are in production in parallel. The team reviews work together every few days, through "countless revisions." Total: at least 1,200 hours per video.\[4\]

**From "How research and factchecking work at Kurzgesagt" (Medium, March 28, 2023, by Head of Research Lizzy Steib). All A:**
- **Team:** The editorial team had six full-time staff: a head of research, two fact-checkers, two researcher-scriptwriters and a social media editor.\[8\]
- **Two ways in:**
  - **In-depth research:** A researcher starts from Wikipedia, moves to primary papers, meta-analyses and books, and writes a research document of about 10 pages (sometimes several dozen). This takes days to weeks, and the document sometimes includes an essay suggesting a storyline. Topics are dropped if the findings aren't "surprising or fresh enough." A writer then shapes the story and angle together with the researcher, including original calculations.\[8\]
  - **Intense vetting:** A script that grew from a paper or an expert conversation goes to fact-checkers. They act as internal peer review: they check statement by statement, compare multiple sources for the most recent or accepted figure, recalculate back-of-the-envelope estimates, and judge whether simplifications have become misleading.\[8\]
- **Source sheets:** Every video is linked to a source sheet. It lists papers and quotes statement by statement, in the order they appear in the video, with commentary, broken-down calculations and reasons for choosing one number over another. Sheets run 15–30 pages, up to 50. For contentious topics, sources also appear on screen.\[8\]
- **Experts:**
  - Usually two per video, from a standing network (e.g. Our World in Data).\[8\]
  - For controversial topics (e.g. nutrition), several experts with different views are deliberately consulted.\[8\]
  - "Every simplification [should be] a deliberate choice based on a discussion."\[8\]
- **QA:**
  - Checklist rounds happen after the sketch phase, after storyboards are finalised, and after the first render with final timing. Each round takes at least 2 hours with at least 2 people.\[8\]
  - Checks cover visual, typographic and content issues: planets spinning the right way, infographic labels, numbers matching across the video and the sources.\[8\]
  - Anthropomorphised cells with faces are acceptable creative licence. An amoeba moving in a physically impossible way is not, and was sent back to animation.\[8\]
- **Partly inaccessible:** The kurzgesagt.org/what-we-do page loads its "videos" tab through JavaScript, so only the products tab could be read. That tab describes a five-phase product process (concept and research → illustration and design → production → campaign → in your home) and the studio's core skill as "telling stories about science and the world."\[24\] The shop's About page says products are "Human Made" with a "No AI Slop" label.\[25\] This is a strong signal that the skill must never present its output as Kurzgesagt's or imply any affiliation.
- **Secondary, unverified:**
  - Two points are confirmed at stronger sources. The studio's own kurzgesagt.org/who-we-are page lists "Steve Taylor - Voice Actor, Journalist" and credits "Thomas Veith" and "Fabian Glaser" for "Music & Sound Design," which contradicts third-party blogs that name Epic Mountain as composer. Forbes (Dani Di Placido, October 24, 2024) reported that "Kurzgesagt has since expanded to a team of 70 people." A 2019 trade article said "over 20 employees."
  - They also mention a Kurzgesagt Skillshare class taught by a senior motion designer.\[26\]
  - None of these were verified at the primary source.

**What this means for the skill (D):** Copy the *gates*, not the look. The workflow should be: research document → angle decision with a kill switch → script → fact-check pass → sketch/animatic with metaphor and transition planning → scratch VO timing → design → animate to the locked VO → original music and SFX to picture. QA gates sit at sketch, storyboard and timed render. The skill's equivalents are a claims ledger (source sheet), a simplification log, and a QA checklist run at each deliverable.

### 3. Tool landscape as of November 2026

| Tool | Status / version | Cost | Verdict for 2D vector explainers |
|---|---|---|---|
| **After Effects** (A) | 26.0 released January 2026: SVG import, editable Illustrator gradients, variable-font axis animation, parametric 3D meshes, Substance 3D materials, Gate/Compressor/Distortion audio effects, lossless compressed preview cache, native Windows on ARM. Wikipedia lists 26.5 (September 10, 2026) as current\[27\]\[28\]\[29\] | Conflicting reports: $22.99/mo annual-billed-monthly (photutorial, July 30, 2026), $34.49/mo (CG Channel), $38/mo (TechRadar).\[27\]\[30\]\[31\] Verify on adobe.com at purchase | Reference tool for rigged, layered 2D; most tutorials and plugins |
| **Illustrator** (A/D) | Kurzgesagt's documented illustration tool\[32\] | Creative Cloud (verify) | Reference for layered vector scene art; organise layers for AE import |
| **Adobe Premiere** (A) | Renamed from "Premiere Pro" to "Adobe Premiere" with 26.0 on January 20, 2026 (Wikipedia)\[33\] | Creative Cloud | Final edit and mix if you use Adobe |
| **Cavalry** (A) | Canva acquired it in February 2026. v2.6 added a Camera Guide for 2.5D. **v2.7 (April 16, 2026) made former Pro features free for individuals**; requires a Canva account; enterprise SSO through Canva Enterprise/Education\[9\]\[34\]\[35\]\[36\] | Free for individuals\[37\] | Best free procedural 2D/motion-graphics tool; strong for infographics, repeaters and data-driven animation; exports Lottie |
| **Rive** (A) | Interactive state-machine animation with open-source runtimes and no runtime fees. Free plan exports carry a splash screen\[38\]\[39\] | Cadet $9/seat/mo annual ($17 monthly, max 3 seats); Voyager $32 annual ($49 monthly); Enterprise $120\[38\]\[39\] | For interactive or app motion, **not** linear video; optional |
| **GSAP** (A) | Fully free including every former Club plugin (SplitText, MorphSVG, DrawSVG, ScrollTrigger) since April 30, 2025 (v3.13), under the "No Charge" Standard License\[10\]\[12\]\[40\]\[41\] | Free | Good for SVG/web explainers. License forbids using GSAP to build a no-code visual animation tool that competes with Webflow\[41\] |
| **Remotion** (A) | React video framework; renders MP4 | Free for individuals, non-profits and for-profits with ≤3 employees. Company: $25/creator seat/mo, or $0.01/render with a $100/mo minimum for automators; Enterprise from $500/mo\[11\]\[42\]\[43\] | Best code-based route to a real MP4 |
| **Motion Canvas** (A) | npm `@motion-canvas/core` 3.17.2, MIT; no stable release since December 2024. Work continues in MIT forks Revideo (0.11.0, July 2026) and Canvas Commons (0.4.0, September 2026), per secondary sources\[13\]\[44\] | Free | Elegant for diagram animation, but treat as **maintenance risk** |
| **Lottie / dotLottie** (A) | Bodymovin "supports a subset of After Effects features": partial expressions and cameras, most effects only in the SVG/HTML renderer. LottieFiles plugin exports JSON, dotLottie and TGS (needs an account). Expressions play on the web player only\[45\]\[46\] | Free plugins | For web or app delivery, **not** a video master format |
| **Blender, Cinema 4D, Figma, DaVinci Resolve** | **Not re-verified in this pass.** General knowledge only: Blender is free/GPL and Resolve has a free tier | — | Keep 3D (Blender/C4D) as optional edge cases; Figma for style frames and boards; Resolve as a free edit/Fairlight mix alternative. Check versions and prices on official pages before writing the tool file |

**AI-assisted tools (A unless marked):**
- **Recraft** (native SVG generation):
  - Versions: V4 (February 17, 2026) and V4.1 (May 14, 2026).\[47\]
  - Export formats: SVG, PNG, JPG, PDF, TIFF and Lottie (per invideo's summary).\[47\]
  - **Free plan:** outputs are public, owned by Recraft, and not licensed for commercial use. Some sources say SVG export is paid-only.\[15\]\[48\]
  - **Paid plans:** private generation with commercial rights. Per pikes.ai's Recraft Review 2026, Basic costs $12/mo billed monthly or $10/mo billed annually ($120/yr) for 1,000 credits/mo, and Pro costs $20/mo monthly or $16/mo annually for 2,000 credits.
  - API: $0.035/image for V4.1 after June 20, 2026 price cuts (secondary).\[47\]
  - **D:** Use it for icon families and props, then rebuild or clean the paths in Illustrator. Generated SVGs need manual layer separation before rigging.
- **ElevenLabs** (voice):
  - The Free plan has no commercial license; commercial rights and Instant Voice Cloning start on Starter at $6/mo.\[49\]\[50\]
  - API price for v3/Multilingual v2: $0.08 per 1,000 characters (October 2, 2026). One source says $0.10 — conflicting.\[51\]\[52\]
  - Eleven v3 supports Bengali: its 5,000-character-per-request model is now marked "previous generation" behind v4.\[53\]\[54\]\[55\]\[56\] Multilingual v2 (29 languages) does not appear to include Bengali.\[56\]\[57\]
- **Microsoft Azure Speech:** `bn-BD-NabanitaNeural` (female) and `bn-BD-PradeepNeural` (male) for the Bangla (Bangladesh) locale. They have no style/role controls.\[16\]
- **Google Cloud TTS:** Bengali is offered only as **bn-IN** Chirp 3 HD voices (e.g. `bn-IN-Chirp3-HD-Kore`), which are Indian Bengali, and custom pronunciation is unavailable for bn-IN.\[58\]\[59\] bn-BD exists for speech-to-text.\[60\]
- **Suno** (music):
  - Terms changed August 10, 2026, effective September 3, 2026. Songs downloaded on paid plans "remain yours to use commercially."\[61\]
  - Monthly download caps: Pro 20, Premier 60. Free downloads are personal-use only.\[61\]
  - After the Warner Music Group settlement and partnership (announced November 25, 2025), Suno revised a policy page in December 2025 to say users are "generally not considered the owner of the songs, since the output was generated by Suno" (reported by Music in Africa and Digital Music News). **Read suno.com/terms before commercial use.**
- **Udio:** After the Universal Music Group settlement (late October 2025), downloads were disabled.\[62\]\[63\] Udio's terms, revised November 12, 2025 after downloads were switched off on October 29, 2025, say output may be used "solely for your personal and non-commercial purposes," with no downloads permitted (as quoted by once.app, verified September 14, 2026) — **D:** avoid for commercial explainers.
- **Bangladesh availability:** No official country lists were found for Suno, Udio, ElevenLabs or Adobe. Unofficial reports point to payment friction (local cards and bKash) rather than geo-blocking.\[64\] **D:** Confirm by checking out with an international card before you commit a pipeline.

---

## Details: The Creative and Technical System the Skill Should Encode

### 4. Research and fact-check workflow (C/D, modelled on the A process above)
1. **Question framing:** Write one central question and three candidate angles. Kill or re-angle the topic if no angle produces a fact the target viewer would find surprising. This mirrors Kurzgesagt's "fresh enough" gate.
2. **Research document:** Use primary sources first (papers, official statistics such as Bangladesh Bureau of Statistics, Bangladesh Bank, FAO, World Bank, OWID), then reputable secondary sources.
3. **Claims ledger** (the skill's "source sheet"): one row per on-screen or spoken claim, with these columns:
   - claim
   - type: Verified statistic / Estimate / Assumption / Hypothesis / Illustrative example
   - source and date
   - exact figure and unit
   - calculation shown
   - confidence
   - simplification note
4. **Rules (D):**
   - Never invent a number; mark it `[NEEDS SOURCE]`.
   - Illustrative examples must be labelled as such in narration ("imagine a farmer who…").
   - Where sources conflict, present a range or the most recent authoritative figure and log why.
   - Every simplification gets a one-line justification.
5. **QA gates:** after script, after storyboard, after timed animatic. Check that numbers stay consistent across VO, on-screen text and charts, that charts start from honest baselines, and that the direction of physical processes is correct.

### 5. Script architecture (C/D)
- **Structure for 90 seconds:**

| Section | Time | Purpose |
|---|---|---|
| Hook | 0–5 s | A concrete, surprising image or claim; no "In this video…" |
| Question/stakes | 5–15 s | Why the viewer should care |
| Mechanism | 15–60 s | 2–3 beats, each with one metaphor |
| Turn/complication | 60–75 s | The misconception or twist |
| Payoff | 75–90 s | A reframe plus one takeaway |

- **Pacing (D, not verified in this pass):**
  - Plan English narration at about 140–160 words per minute, i.e. about 210–240 words for 90 s and 35–40 words for 15 s.
  - For Bangla, time a scratch read rather than using a word count, because word length and conjunct density differ.
  - Leave 10–15% of runtime as breathing space without narration.
- **Sentence rules (D):**
  - One idea per sentence.
  - Put the concrete before the abstract.
  - Introduce each analogy once, then reuse it rather than switching metaphors.
  - Each beat ends on a line that sets up a picture.
- **Hard rule:** Generate 3 angles and pick one *before* drafting.

### 6. Visual-metaphor and storyboard intelligence (C/D)
- **Technique selector, per beat rather than per sentence:**

| Concept type | Technique |
|---|---|
| Quantity or comparison | Integrated infographic (bars grown from scene objects) |
| Process or cause | Machine or flow metaphor |
| Scale | Push-in or pull-out scale transition |
| System of actors | Ecosystem or character interaction |
| Abstract feeling or risk | Environmental change (lighting, weather, instability) |
| Contrast or misconception | Split or transform |

- **Visual economy (D):**
  - One "hero" metaphor per 15–25 s sequence, evolved rather than replaced.
  - A 90 s video needs roughly 12–20 shots grouped into 4–6 sequences, mixing establishing, detail, metaphor, infographic, scale-change, emotional-hold and payoff shots.
- **Ten-question shot card:** information · understanding target · strongest metaphor · main object · what moves · what stays still · camera · hierarchy · supporting sound · link to next shot.
- **Hold rule (D):** After a key reveal lands, hold the composition still for at least 0.75–1.5 s with only ambient secondary motion before the next major change.

### 7. 2D art direction (B = general observation, C/D = rules)
- **Observed traits (B; author's general observation, to be verified against footage, not studio-documented):**
  - Rounded geometric primitives with consistent corner radii.
  - Flat fills with simple one-direction gradients and rim highlights.
  - Few line strokes; strong silhouettes.
  - Depth built from value and saturation steps (darker, more saturated foreground; lighter, desaturated background).
  - Glow and light sources used as focal points.
  - Dense background "texture" made of small repeated shapes.
- **Original system rules (D):**
  - **Shape:** Build every object from circles, rounded rectangles and capsules on a shared corner-radius scale (e.g. 4/8/16/32 px at 1080p). Pick one signature shape trait the reference studio does not use (e.g. chamfered corners, or a 15° tilt motif) to keep the identity original.
  - **Depth planes:** Use 4–6 planes (FG, near-MG, hero MG, far-MG, BG, sky/void). Step value and saturation by about 10–15% per plane. Parallax rate falls with distance (e.g. FG 1.5×, hero 1×, BG 0.3×, sky 0.05×).
  - **Detail budget:** The hero plane carries about 60% of detail. BG elements are silhouettes. Keep ≤3 focal points per frame.
  - **Colour:** 1 background family, 1 hero hue, 1 accent at ≤10% of frame area, plus neutrals. Check text contrast at 4.5:1 or above; the claude.com docs' own example script uses that threshold.\[3\]
  - **Optional editorial palette:** near-black green background, paper white, lime accent, rich greens, orange-red for warnings. When a brand palette is supplied, the brand colours own hero and accent roles; complementary colours go only to backgrounds and data series.
  - **Typography:** One sans family with variable weight. After Effects 26 can animate variable-font axes.\[28\] Text sits *inside* the scene (on signs, screens, labels). Show no more than about 7 words on screen at once.
  - **Infographics:** Data grows out of scene objects (crops become bars, coins become stacks). Axes are minimal, baselines are honest, units are always shown.
  - **Continuity:** A style guide and asset inventory are locked before any scene prompts are written.

### 8. Motion, timing and camera (A = Material tokens; C/D = application)
- **Easing reference (A, Material Design 3, m3.material.io):**
  - Standard: `cubic-bezier(0.2, 0, 0, 1)`\[65\]
  - Emphasized decelerate: `(0.05, 0.7, 0.1, 1)`\[65\]
  - Emphasized accelerate: `(0.3, 0, 0.8, 0.15)`\[65\]
  - Durations: short 50–200 ms, medium 250–400 ms, long 450–600 ms.\[65\] UI durations are shorter than cinematic motion, so scale them up for video.
- **Video timing framework (D, at 24 or 25 fps):**

| Motion | Duration / setting |
|---|---|
| Small prop pop-in | 6–10 frames, decelerate ease, ≤8% overshoot with 1 settle |
| Hero object entrance | 12–20 frames |
| Text reveal | 8–12 frames; on-screen text held ≥ (words ÷ 3) s + 0.5 s |
| Camera push/pull | 1.5–4 s, eased in-out (AE speed-graph influence about 60–80%) |
| Morph or match transition | 12–24 frames |
| Scale transitions | 2–5 s |
| Stagger between repeated elements | 2–4 frames |

- **Mechanical vs organic motion (D):**
  - Mechanical objects: linear or short ease, hard stops, no squash.
  - Organic characters: arcs, anticipation of 3–6 frames, follow-through on appendages, subtle squash ≤10%.
  - Avoid elastic or bounce presets except for comedic beats.
- **Camera grammar (C/D):**

| Move | Narrative use |
|---|---|
| Push-in | Discovery or focus |
| Pull-out | Reveal scale or consequence |
| Lateral track | Process over time |
| Tilt | Hierarchy or up-and-down systems |
| Rotate | Disorientation or shift (rare) |
| 2.5D multiplane parallax | Every establishing shot |

  Every move must be tied to a line of VO.
- **Transitions (D):** Prefer, in order: match cut on shape or colour → object transformation → camera-driven travel into a detail → mask wipe using a scene element. Avoid unrelated preset wipes.

### 9. Audio direction (A where noted; C/D otherwise)
- **Loudness:**
  - Many third-party guides cite **-14 LUFS integrated, -1 dBTP** as YouTube's normalisation reference.\[66\]\[67\] One reference site notes YouTube's own Help pages give no official upload target.\[68\]
  - Apple Podcasts specifies -16 LUFS ±1 dB, with a -1 dBTP true-peak ceiling.\[68\]\[69\]
  - EBU R128 broadcast is -23 LUFS.\[66\]
  - **D:** Master explainers to -14 LUFS integrated with true peak ≤ -1 dBTP; deliver -16 LUFS for podcast or mobile-first versions.
- **Mix hierarchy (C):**
  - VO first. Duck music about 6–12 dB under narration.
  - Cut SFX tightly to frame-accurate visual events.
  - Keep the low end clear under VO; save sub-bass impacts for 2–4 structural moments per 90 s.
- **SFX rule (D):** Sound reinforces meaning, not motion. Tag each important visual event with one of: transient, soft movement, mechanical detail, texture, musical accent, rhythmic, deep impact, sustained atmosphere, or silence. Leave at least 30% of visual events unsounded.
- **Music (C/D):**
  - Write a brief per project covering mood arc, BPM (e.g. 90–110 calm or curious, 120–128 energetic, 70–85 documentary), instrument palette, and section changes aligned to sequence boundaries.
  - Kurzgesagt scores original music *to the finished picture* (A).\[4\] For an independent creator, edit licensed or AI music to the locked animatic.
- **Bangla VO (D):**
  - Use natural Bangladeshi colloquial standard (*cholito bhasha*), not *sadhu bhasha*.
  - Keep common English loanwords Bangladeshi audiences actually use.
  - Use ৳ and lakh/crore where natural, and choose Bengali or Western digits consistently.
  - Rewrite for meaning rather than translating literally.
  - Test TTS with Azure bn-BD voices or a human narrator. Treat bn-IN voices as accent-mismatched.
  - Record at 48 kHz/24-bit in a treated space. The reference studio used a large-diaphragm condenser and full-pass-then-pickups method (A).\[4\]

---

## Recommendations: Skill Architecture (Part 14-B)

1. **Keep the proposed modular tree, with these changes (D):**
   - Merge `visual-language.md` + `vector-illustration-guide.md` + `colour-and-art-direction.md` into **`art-direction.md`** and **`colour-and-palettes.md`**.
   - Merge `motion-design-principles.md` + `camera-and-transition-design.md` into **`motion-and-camera.md`**, keeping a separate **`timing-framework.md`** because it is looked up constantly.
   - Split tools into **`workflow-after-effects.md`**, **`workflow-code.md`** (Remotion/GSAP/SVG) and **`workflow-free-tools.md`** (Cavalry/Resolve/AI). The goal is to load only the relevant file.
   - Add **`claims-ledger`** and **`qa-checklist`** templates.
   - Keep `evaluations/` (small).
   - Result: about 12 reference files, each linked directly from `SKILL.md`, with a ToC on any file over 100 lines.
2. **`SKILL.md` body (≤300 lines target):**
   - A **router**: request type → deliverable(s) → files to read (e.g. "prompt only → read `image-prompt-engineering.md`, output prompts with no preamble").
   - Defaults: 16:9 1920×1080 at 24 fps; 9:16 for shorts; English; After Effects.
   - The three-question clarification limit.
   - Hard rules: no invented statistics, never claim a rendered MP4, no copying of protected IP.
3. **Frontmatter draft (D):**
```yaml
---
name: cinematic-vector-explainer
description: Plans and directs premium 2D vector animated explainer videos - research and claims ledgers, scripts, visual metaphors, storyboards, scene designs, vector image prompts, frame-accurate animation and camera instructions, sound and music cue sheets, After Effects or code-based (Remotion, GSAP, SVG, Lottie) production plans. Use when the user asks for a motion design or explainer video, Kurzgesagt-inspired or cinematic infographic animation, storyboard, animation cue sheet, sound design sheet, or English or Bangla narration for an explainer.
license: Proprietary
metadata:
  version: "1.0"
---
```
4. **`validate_skill.py` checks (stdlib only):**
   - Line 1 is `---` and the frontmatter is a YAML mapping (parse a simple key: value subset without PyYAML).
   - Only allowed keys are present: `name`, `description`, `license`, `compatibility`, `metadata`, `allowed-tools`. Warn on any key not in `{name, description, license, metadata}`.
   - `name` matches regex `^[a-z0-9]+(-[a-z0-9]+)*$`, is ≤64 chars, contains no `anthropic`/`claude`, and equals the folder name.
   - `description` is 1–1,024 chars with no `<…>` tags; warn above 200 chars.
   - Body is ≤500 lines.
   - All relative Markdown links resolve, and every `references/*.md` is linked from `SKILL.md`.
   - Files over 100 lines contain a ToC.
   - No absolute paths and no secret-like strings.
   - Total size is under 30 MB.
5. **`package_skill.py`:**
   - Run the validator first.
   - Write a ZIP whose every entry is prefixed with `cinematic-vector-explainer/` (arcname relative to the parent folder), excluding `.DS_Store`, `__pycache__` and `.git`.
   - Re-open the ZIP and assert that every name starts with the folder prefix and that `cinematic-vector-explainer/SKILL.md` exists. This mirrors the official `unzip -l` check.\[3\]
6. **Evaluation (A method, D content):**
   - Run the 10 required scenarios through `skill-creator` with and without the skill in Claude Code.\[3\]
   - Score the 12 rubric categories 1–10; pass at an average of 7 or above with no category below 5.
   - Zero tolerance for these critical failures: fabricated statistics, invalid structure, broken links, protected-IP reproduction, or missing VO sync.

## Caveats
- The following were **not directly verified** in this pass and must be checked before writing the tool file:
  - Figma, Blender, Cinema 4D and DaVinci Resolve versions and pricing.
  - Exact Adobe pricing (sources conflict).
  - Udio's and Suno's current full terms.
  - Bangladesh payment and availability for every vendor.
  - Narration WPM norms.
- All "B" visual observations are general observations, not a frame-by-frame study. Analyse a few public videos yourself before finalising `art-direction.md`, and record only broad principles.
- Kurzgesagt's "1,200 hours" video dates from 2020.\[23\] Its team size, tools (e.g. Cinema 4D use) and process may have changed since.
- AI tool licensing changes fast: Suno's ownership wording and the Udio settlement both changed within the past year. The skill should tell users to re-check terms on every commercial project.

## Sources

1. <https://agentskills.io/specification>
2. [Agent Skills](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)
3. <https://claude.com/docs/skills/how-to>
4. [Kurzgesagt (In a Nutshell), How to Make a Kurzgesagt Video … | LingQ English Lesson](https://www.lingq.com/en/learn-english-online/courses/689474/how-to-make-a-kurzgesagt-video-in-120-4887128/)
5. [Use skills in Claude](https://support.claude.com/en/articles/12512180-use-skills-in-claude)
6. [How to create custom skills | Claude Help Center](https://support.claude.com/en/articles/12512198-how-to-create-custom-skills)
7. [Using Agent Skills with the API](https://platform.claude.com/docs/en/build-with-claude/skills-guide)
8. <https://medium.com/@Kurzgesagt/how-research-and-factchecking-work-at-kurzgesagt-f5b239188255>
9. [Motion Design Software Cavalry Is Now Free: Full Guide](https://yelzkizi.org/motion-design-software-cavalry-is-now-free/)
10. [GSAP 2026 Release Notes: Free License, SplitText 3.13](https://artofstyleframe.com/blog/gsap-2026-free-license-whats-new/)
11. [Remotion: React Video Framework, Pricing & Alternatives](https://www.therundown.ai/tools/remotion)
12. [GSAP: Free Web Animation Library in 2026](https://www.noqode.fr/en/outils/gsap)
13. [Remotion vs Motion Canvas](https://metavert.io/compare/remotion-vs-motion-canvas)
14. [Motion Canvas](https://metavert.io/motion-canvas)
15. [Recraft Review 2026: Vector AI, Pricing & Licensing](https://newsdigestai.com/ai-tools/recraft)
16. [Language and Voice Support for Azure Speech - Foundry Tools](https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support)
17. [Skill authoring best practices - Claude Platform Docs](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)
18. [Provision and manage skills for your organization](https://support.claude.com/en/articles/13119606-provision-and-manage-skills-for-your-organization)
19. <https://code.claude.com/docs/en/skills>
20. [Fix: SKILL.md Must Start With YAML Frontmatter (---)](https://www.aipm-registry.com/guides/skill-md-frontmatter-reference)
21. [SKILL.md — writing-skills — ai-slop](https://calebstew.art/ai-slop/skills/writing-skills/skill/)
22. [Anthropic publishes Skill authoring best… · AGI Hunt](https://agihunt.info/en/p/1a19453aa61169c4714b1e50507)
23. [thetvdb.com](https://thetvdb.com/series/kurzgesagt-in-a-nutshell/episodes/7594048)
24. [About our Products | kurzgesagt](https://kurzgesagt.org/what-we-do?visit=products)
25. [About Us](https://shop-eu.kurzgesagt.org/pages/about-us)
26. [How to Make Videos Like Kurzgesagt (with AI)](https://viducer.ai/blog/how-to-make-videos-like-kurzgesagt)
27. [Adobe releases After Effects 26.0 with native Substance support](https://www.cgchannel.com/2026/01/adobe-releases-after-effects-26-0-with-native-substance-support/)
28. [What's New in Adobe After Effects 26.0 - Newsshooter](https://www.newsshooter.com/2026/01/22/whats-new-in-adobe-after-effects-26-0/)
29. [Adobe After Effects](https://en.wikipedia.org/wiki/Adobe_After_Effects)
30. [Adobe After Effects (2026) review](https://www.techradar.com/pro/software-services/adobe-after-effects-2026-review)
31. [How much does Adobe After Effects cost?](https://photutorial.com/after-effects-pricing/)
32. [Kurzgesagt](https://www.toolfarm.com/news/kurzgesagt/)
33. [Adobe Premiere Pro](https://en.wikipedia.org/wiki/Adobe_Premiere_Pro)
34. [Scene Group releases Cavalry 2.6](https://www.cgchannel.com/2026/02/scene-group-releases-cavalry-2/)
35. [Canva acquires next-gen motion graphics tool Cavalry](https://www.cgchannel.com/2026/02/canva-acquires-next-gen-motion-graphics-tool-cavalry/)
36. [Cavalry Alternatives: Six Browser-First Motion Tools in 2026](https://kinoviz.com/alternatives/cavalry)
37. [Cavalry Pro Is Now Completely Free](https://www.3dart.it/en/cavalry-pro-is-now-completely-free-the-after-effects-alternative-rides-in/)
38. [Rive pricing: build and ship for free](https://rive.app/pricing)
39. [Pricing - Rive](https://rive.app/docs/account-admin/pricing)
40. [GSAP is Now Completely Free, Even for Commercial Use!](https://css-tricks.com/gsap-is-now-completely-free-even-for-commercial-use/)
41. [GSAP Pricing and License: Is GSAP Free for Commercial Use?](https://gsapvault.com/gsap-license)
42. [License & Pricing](https://www.remotion.dev/docs/license/pricing)
43. [remotion/LICENSE.md at main · remotion-dev/remotion · GitHub](https://github.com/remotion-dev/remotion/blob/main/LICENSE.md)
44. [@motion-canvas/core - npm](https://www.npmjs.com/package/@motion-canvas/core)
45. [Bodymovin - Lottie - aescripts.com](https://aescripts.com/bodymovin/)
46. [Bodymovin: export Lottie from After Effects](https://www.moonb.io/blog/bodymovin)
47. [Recraft V4 and V4.1: The AI Design Model That Outputs Real SVG (2026)](https://invideo.io/blog/recraft-ai-image-generator/)
48. [How Much Does Recraft Cost in 2026? (Free vs Paid)](https://zsky.ai/blog/how-much-does-recraft-cost)
49. [ElevenLabs Pricing 2026: All Plans, Credits and API Rates](https://websitevoice.com/blog/elevenlabs-pricing-plans/)
50. [ElevenLabs Pricing 2026: Plans, Voice Cloning & Who Should Buy](https://smartaitoolsreview.com/blog/elevenlabs-review-2026)
51. [ElevenLabs pricing 2026: plans, credits, and API](https://www.cartesia.ai/learn/elevenlabs-pricing)
52. [Eleven v3: Features, Pricing & API Review](https://www.therundown.ai/tools/eleven-v3)
53. [ElevenLabs Pricing 2026: Plans & Features](https://techpilot.ai/tools/elevenlabs/)
54. [Best Bengali (বাংলা) Text to Speech Tools for Creators (2026) — 12 Tools Tested](https://www.voislabs.com/best/bengali-text-to-speech)
55. [ElevenLabs Speech Models](https://docs.avalai.ir/en/providers/elevenlabs)
56. [ElevenLabs review 2026: Hindi, Urdu, Bangla voiceovers](https://bundledseo.com/blog/elevenlabs-review/)
57. [Text to Speech](https://elevenlabs.io/docs/overview/capabilities/text-to-speech)
58. [Supported voices and languages | Cloud Text-to-Speech | Google Cloud Documentation](https://docs.cloud.google.com/text-to-speech/docs/list-voices-and-types)
59. [Chirp 3: HD voices | Cloud Text-to-Speech | Google Cloud Documentation](https://docs.cloud.google.com/text-to-speech/docs/chirp3-hd)
60. [Cloud Speech-to-Text V2 supported languages | Google Cloud Documentation](https://docs.cloud.google.com/speech-to-text/docs/speech-to-text-supported-languages)
61. [An update to our downloads policy and Terms of Service | Suno](https://suno.com/blog/suno-updates-tos)
62. [Udio Users Can't Download Their AI Music Creations Anymore - Slashdot](https://entertainment.slashdot.org/story/25/11/24/1845207/udio-users-cant-download-their-ai-music-creations-anymore)
63. [How to Download Udio Songs in 2026 (Why You Can't, and What to Do Instead)](https://songcreator.pro/blog/how-to-download-udio-songs)
64. [How To Pay For ElevenLabs In Asian Countries EverTry](https://evertry.co/blog/how-to-pay-for-elevenlabs-in-asian-countries/)
65. [Easing and duration](https://m3.material.io/styles/motion/easing-and-duration/tokens-specs)
66. [Loudness targets (LUFS) for YouTube, TikTok, Spotify, podcast & broadcast — 2026](https://www.audio2time.com/audio-loudness-standards/)
67. [LUFS Loudness Targets for Streaming and Broadcast](https://postproduction.com/tools/lufs-reference)
68. [Loudness Standards Guide — LUFS Targets for Every Platform](https://www.criticallisteninglab.com/en/learn/loudness)
69. [DaVinci Resolve Loudness Normalization: The Right LUFS Target](https://davinciresolve21.com/blog/davinci-resolve-loudness-normalization-lufs)
