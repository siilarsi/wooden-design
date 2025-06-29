# Contributing

- Install Node.js 20 or newer.
- Run `npm test` to execute the test suite.
- Run `npm run lint` to perform simple lint checks.
- Use `scripts/commit.sh` when committing. It verifies tests and lint pass before
  allowing the commit.
- Add or update tests when modifying code or fixing bugs.
- Update documentation and AGENTS.md if processes change.
- Built files are deployed automatically via GitHub Actions; do not commit the
  contents of `dist/`.
- Add entries to `POSTMORTEM.md` for any production-facing issues.
- Keep application logic in the `src/` directory (e.g. `src/main.js`). Avoid
  adding large inline scripts to `index.html`.
