#!/usr/bin/env bash
set -e

echo "🤖 PyGPT CTO Mode — Task Aware Runner"

if [ ! -f PYGPT_TASKS.md ]; then
  echo "❌ No PYGPT_TASKS.md found — exiting."
  exit 0
fi

TASKS=$(cat PYGPT_TASKS.md)

DATE=$(date +"%Y-%m-%d")

if echo "$TASKS" | grep -q "Initial PR Mode"; then
  echo "📋 Running initial PR-mode tasks..."

  if ! grep -q "Automated PyGPT Run – Initial PR Mode" CHANGELOG.md 2>/dev/null; then
    cat >> CHANGELOG.md <<EOF

## [$DATE] Automated PyGPT Run – Initial PR Mode

- CI automation active.
- PR-based governance enabled.
- Docker validation running.
EOF
  fi

  if ! grep -q "PyGPT Automation Activated" WORK_STATUS.md; then
    cat >> WORK_STATUS.md <<EOF

[$DATE] PyGPT Automation Activated:
- GitHub Actions PR-mode workflow active.
- Automated runs now propose changes via Pull Requests.
EOF
  fi

elif echo "$TASKS" | grep -q "MVP Build Phase"; then
  echo "🚀 MVP build tasks detected."

  echo "MVP tasks detected on $DATE" > PYGPT_MVP_PENDING.txt

  echo "TODO:" >> PYGPT_MVP_PENDING.txt
  echo "- Implement Ads API" >> PYGPT_MVP_PENDING.txt
  echo "- Implement Ads feed UI" >> PYGPT_MVP_PENDING.txt

else
  echo "⚠️ No recognized task type found in PYGPT_TASKS.md"
fi
