#!/bin/sh
# Run tests and lint before committing
npm test && npm run lint
if [ $? -ne 0 ]; then
  echo "Tests or lint failed. Commit aborted." >&2
  exit 1
fi
exec git commit "$@"
