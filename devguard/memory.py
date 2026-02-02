from pathlib import Path
import json
from datetime import datetime

MEMORY_FILE = Path(".devguard_memory.json")


# ----------------------------
# Connection stub (for escalation)
# ----------------------------
def get_connection():
    """
    Compatibility stub for escalation layer.
    Returns None for file-based memory.
    """
    return None


# ----------------------------
# Memory primitives
# ----------------------------
def load_history() -> list:
    if not MEMORY_FILE.exists():
        return []

    try:
        return json.loads(MEMORY_FILE.read_text())
    except Exception:
        return []


def remember(signature: str):
    history = load_history()

    if any(h["signature"] == signature for h in history):
        return

    entry = {
        "signature": signature,
        "first_seen": datetime.utcnow().isoformat()
    }

    history.append(entry)
    MEMORY_FILE.write_text(json.dumps(history, indent=2))
