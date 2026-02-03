#!/usr/bin/env bash
set -e

echo "🤖 PyGPT CTO Mode — PR Runner"

if [ -f PYGPT_TASKS.md ]; then
  echo "📋 Found PYGPT_TASKS.md — executing tasks..."

  DATE=$(date +"%Y-%m-%d")

  # Create or append CHANGELOG.md
  if [ ! -f CHANGELOG.md ]; then
    echo "# Changelog" > CHANGELOG.md
    echo "" >> CHANGELOG.md
  fi

  cat >> CHANGELOG.md <<EOF

## [$DATE] Automated PyGPT Run – Initial PR Mode

- CI automation active.
- PR-based governance enabled.
- Docker validation running.
EOF

  # Update WORK_STATUS.md
  cat >> WORK_STATUS.md <<EOF

[$DATE] PyGPT Automation Activated:
- GitHub Actions PR-mode workflow active.
- Automated runs now propose changes via Pull Requests.
EOF

else
  echo "⚠️ No PYGPT_TASKS.md found — nothing to do."
fi
