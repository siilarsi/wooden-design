# Project Guidelines

## 1. Project Structure & Navigation
- `app/` – React application entry point (`page.tsx`).
- `components/` – React components like `Viewer.tsx` used by the app.
- `src/` – Utility modules shared with the React app.
- `models/` – sample `.gltf` models used in tests and the demo.
- `tests/` – lightweight Node test framework and specs run via `tests/run.js`.
- `scripts/` – helper scripts such as `lint.js` for style checks.
- `package.json` – defines `npm test`, `npm run lint`, `npm run dev`, and `npm run build` commands.
- `README.md`, `CONTRIBUTING.md` – documentation for users and contributors.

## 2. Coding Conventions & Style
- Codebase uses modern JavaScript/TypeScript and Node.js 20+.
- Keep functions small, DRY and maintainable; refactor when needed.
- Add or update tests for every feature or bug fix.
- Avoid trailing whitespace and ensure source files pass `npm run lint`.
- Use Prettier via `npm run format` for consistent style.

## 3. Testing Instructions
- Execute the full test suite with `npm test`.
- Tests live in the `tests/` directory and are run with Node via `tests/run.js`.
- Use the helper script `scripts/commit.sh` when committing. It runs
  `npm test` and `npm run lint` and aborts the commit if either fails.
- Ensure all tests pass before pushing code.

## 4. Linting / Static Checks
- Run `npm run lint` which executes `node scripts/lint.js` followed by ESLint.
- The linter checks `src/utils.js`, `src/state.ts`, `src/main.tsx`, `components/*.tsx`, and `app/page.tsx` for trailing whitespace.

## 5. Pull Request & Commit Guidelines
- Target the `main` branch for all PRs.
- Use clear, descriptive commit messages (no strict prefix required).
- Keep PRs focused; ensure `npm test` and `npm run lint` pass before pushing.
- Update documentation and this AGENTS.md when workflows or commands change.

## 6. CI / Build Steps
- No automated CI. Run `npm run dev` for local development (Vite) and `npm run build` to produce `dist/` for GitHub Pages.

## 6a. Postmortems
Document any production issues in `POSTMORTEM.md`. Add a new dated section with
a summary, root cause, and corrective actions.

## 7. Hierarchical Overrides
- AGENTS.md files in subdirectories override these rules for their respective scopes.

## 8. Self-Update Policy
- Re-evaluate this file after every repository change. If new steps or tools are added, open a dedicated `docs-update` PR updating AGENTS.md only.
