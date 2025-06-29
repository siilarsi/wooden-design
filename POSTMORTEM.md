# Postmortems

## 2025-06-29 Syntax Errors When Opening index.html

**Summary**: Multiple "Identifier has already been declared" errors appeared in the browser console.

**Root Cause**: The page was opened without running the Vite dev server. The browser attempted to load `/src/main.tsx` directly which returned 404, causing extension scripts to be evaluated twice and triggering duplicate declarations.

**Resolution**: Documented the need to run `npm run dev` and added a regression test ensuring `index.html` references `main.tsx` only once. Introduced `scripts/commit.sh` to block commits when tests or lint fail.

**Corrective Actions**:
- Added `tests/html.test.js`.
- Created commit script enforcing tests.
- Updated AGENTS.md and CONTRIBUTING.md to mention `POSTMORTEM.md` and commit script.

---
