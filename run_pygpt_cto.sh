#!/usr/bin/env bash
set -e

echo "🤖 PyGPT CTO Mode — Task Aware Runner"

# FORCE repo root
ROOT_DIR="$(pwd)"
cd "$ROOT_DIR"

echo "📂 Running in directory:"
pwd

echo "📄 Repo root contents:"
ls -la

# Docker detection
if [ -f docker-compose.yml ]; then
  echo "🐳 docker-compose.yml detected."
else
  echo "❌ docker-compose.yml NOT found."
fi

TASKS=$(cat PYGPT_TASKS.md)
DATE=$(date +"%Y-%m-%d")

# -------------------------------------------------------
# INITIAL PR MODE (META / BOOTSTRAP)
# -------------------------------------------------------
if echo "$TASKS" | grep -q "Initial PR Mode"; then
  echo "📋 Running initial PR-mode tasks..."

  if [ ! -f CHANGELOG.md ]; then
    echo "# Changelog" > CHANGELOG.md
  fi

  if ! grep -q "Automated PyGPT Run – Initial PR Mode" CHANGELOG.md; then
    cat >> CHANGELOG.md <<EOF

## [$DATE] Automated PyGPT Run – Initial PR Mode

- CI automation active.
- PR-based governance enabled.
- Docker validation running.
EOF
  fi

  if ! grep -q "PyGPT Automation Activated" WORK_STATUS.md 2>/dev/null; then
    cat >> WORK_STATUS.md <<EOF

[$DATE] PyGPT Automation Activated:
- GitHub Actions PR-mode workflow active.
- Automated runs now propose changes via Pull Requests.
EOF
  fi

# -------------------------------------------------------
# MVP BUILD MODE (REAL PRODUCT WORK)
# -------------------------------------------------------
elif echo "$TASKS" | grep -q "MVP Build Phase"; then
  echo "🚀 MVP build tasks detected."

  if [ ! -f ./pygpt_mvp_builder.sh ]; then
    echo "❌ pygpt_mvp_builder.sh not found — aborting MVP build."
    exit 1
  fi

  chmod +x ./pygpt_mvp_builder.sh
  ./pygpt_mvp_builder.sh

# -------------------------------------------------------
# FALLBACK
# -------------------------------------------------------
else
  echo "⚠️ No recognized task type found in PYGPT_TASKS.md"
fi

echo "✅ PyGPT CTO run completed."
