from pathlib import Path
import json
from datetime import datetime

TREND_FILE = Path(".devguard_trend.json")


def load_trend() -> list:
    if not TREND_FILE.exists():
        return []
    try:
        return json.loads(TREND_FILE.read_text())
    except Exception:
        return []


def record_snapshot(findings: list):
    snapshot = {
        "timestamp": datetime.utcnow().isoformat(),
        "counts": {
            "LOW": sum(1 for f in findings if f.get("severity") == "LOW"),
            "MEDIUM": sum(1 for f in findings if f.get("severity") == "MEDIUM"),
            "HIGH": sum(1 for f in findings if f.get("severity") == "HIGH"),
        }
    }

    trend = load_trend()
    trend.append(snapshot)
    TREND_FILE.write_text(json.dumps(trend, indent=2))
