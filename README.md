# You Are Online

You Are Online is a browser based coding course platform for a learner who wants short, checkable exercises. Courses cover a language or framework in chapters and lessons. A lesson pays XP, XP builds a level, and badges mark milestones. Everything runs client side and saves to `localStorage`. There is no server and no account.

## Features

- Twenty courses under `src/data/courses/`: eleven core languages and tools (JavaScript, Python, HTML and CSS, Rust, SQL, C++, command line and Git, React, APIs, the Model Context Protocol, networking) and nine frameworks (Next.js, Vue, Svelte, Express, FastAPI, Pandas, Tailwind, TypeScript, PyTorch).
- Three roadmaps in `src/data/roadmapsData.js` string lessons from several courses into a milestone path, each ending in a badge: full stack web, data and AI, and systems.
- Five lesson types, each with its own runner: code editing, an HTML and CSS live preview, a quiz, fill in the blank, and a simulator tab paired with a code lesson.
- Six simulators: a Rust memory visualizer, an algorithmic test bench, a SQL playground, a fake terminal, a CPU thread and mutex demo, and a synthetic data generator.
- A lesson author studio in the app that builds the JSON for a new lesson from a form, so a lesson can be drafted without opening the course files.
- XP, levels, and a badge shelf, all held in `GameContext` and written to `localStorage` on every change.

## Tech stack

React 18 with Vite 6. Runtime dependencies: `react`, `react-dom`, `lucide-react` for icons, and `canvas-confetti` for badge celebrations. No backend, no database, no editor library beyond the built in `CodeEditor` component.

## Prerequisites

Node 18 or later, for the Vite 6 toolchain.

## Quick start

```bash
git clone https://github.com/salshwauva/youareonline.git
cd youareonline
npm install
npm run dev
```

The dev server binds to `http://127.0.0.1:3000/`.

## Usage

Pick a course from the catalog, open a lesson, and work the editor, quiz, or fill in the blank panel on the left. A passing lesson pays XP and, on some lessons, a badge. `npm run build` writes a production bundle to `dist/`. `npm run preview` serves that bundle locally.

## How it works

A lesson is a plain object with a type. `src/components/LessonView.jsx` reads the type and picks the runner:

| Type | What the learner does | How it is checked |
| --- | --- | --- |
| `code` | Edits code in the editor | Each test case runs a predicate or a regular expression against the source text |
| `web-preview` | Edits HTML and CSS | The page renders in a sandboxed iframe with its console captured |
| `quiz` | Picks one option | Index compare |
| `fill-blank` | Types the missing tokens | Trimmed string compare per blank |
| `simulator` | Uses the editor plus a second tab holding one of the six simulators | Same as `code` |

The code runner does not execute the learner's code. `src/utils/evaluator.js` pattern matches the source against each test case and prints a fixed log that looks like a run. A lesson that needs a real check states it as a predicate in `testCases`. `docs/buildout-plan.md` records the lesson schema and the content gaps.

`src/context/GameContext.jsx` holds XP, completed lessons, and unlocked badges. Level is `floor(xp / 100) + 1`. A level up, a completed lesson, and a new badge each play a short tune from `src/utils/sound.js`, which synthesizes every sound with the Web Audio API; there are no audio files.

### Project structure

| Path | Purpose |
| --- | --- |
| `src/data/courses/` | One file per core course; the nine framework courses generate from `createFrameworkCourse` in `src/utils/lessonFactory.js` |
| `src/data/courseRegistry.js` | Course list and the domain filter for the catalog |
| `src/data/roadmapsData.js` | The three roadmaps and their milestones |
| `src/components/` | Navbar, catalog, course map, lesson view, badge modal, author studio |
| `src/components/simulators/` | The six simulators |
| `src/components/evaluators/` | Quiz, fill in the blank, and web preview runners |
| `src/context/GameContext.jsx` | XP, badges, and `localStorage` persistence |
| `src/utils/` | Evaluator, lesson factory, sound synthesizer |
| `docs/buildout-plan.md` | Plan for the Rust, Python, Java, C, and C++ course content |

## Status and limits

- About 60 lessons exist across the 20 courses. The eleven core courses hold a chapter or two each; the nine framework courses generate two chapters of two lessons each from a shared template, so their content is thin and repeats the same pattern per framework.
- Code checks are text matching against the source, so a wrong solution that contains the right tokens passes.
- The SQL playground and the fake terminal recognize a small fixed set of commands; a query or command outside that set returns nothing useful.
- The streak shown in the navbar is a fixed number and does not track days.
- There are no automated tests. The `lint` script names ESLint, but ESLint is not installed, so `npm run lint` fails until it is added.
