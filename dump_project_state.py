import os
import json
import sys
import subprocess

STATE = {}

# 1. Basic environment
STATE["python_version"] = sys.version
STATE["cwd"] = os.getcwd()

# 2. Installed packages (pip freeze fallback)
try:
    result = subprocess.check_output(
        [sys.executable, "-m", "pip", "freeze"],
        text=True
    )
    STATE["installed_packages"] = result.strip().splitlines()
except Exception as e:
    STATE["installed_packages"] = [f"error: {e}"]

# 3. Project structure (depth-limited)
project_tree = []
for root, dirs, files in os.walk(".", topdown=True):
    if root.count(os.sep) > 3:
        continue
    project_tree.append({
        "path": root,
        "files": [f for f in files if f.endswith(".py")]
    })

STATE["project_tree"] = project_tree

# 4. Memory / state related files
memory_files = []
for root, _, files in os.walk("."):
    for f in files:
        if any(x in f.lower() for x in ["memory", "state", "issue", "log", "guard"]):
            memory_files.append(os.path.join(root, f))

STATE["memory_related_files"] = memory_files

# 5. Feature flags (adjust if needed)
STATE["features"] = {
    "super_system": True,
    "auto_fix": True,
    "unit_test_generation": True,
    "owner_lock": True,
    "human_in_loop": True
}

print(json.dumps(STATE, indent=2))
