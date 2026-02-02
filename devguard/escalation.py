from datetime import datetime, timedelta

from devguard.memory import load_history, get_connection


ESCALATION_DAYS = 1  # demo threshold


def apply_escalation(findings: list) -> list:
    """
    Escalate findings based on age.
    Works in BOTH modes:
    - DB-backed (future)
    - File-based (current)
    """

    conn = get_connection()

    # ----------------------------
    # FILE-BASED MODE (no DB)
    # ----------------------------
    if conn is None:
        history = load_history()
        history_map = {h["signature"]: h for h in history}

        for f in findings:
            sig = f.get("signature")
            record = history_map.get(sig)

            if not record:
                continue

            first_seen = datetime.fromisoformat(record["first_seen"])
            age = datetime.utcnow() - first_seen

            if age >= timedelta(days=ESCALATION_DAYS):
                if f.get("severity") == "MEDIUM":
                    f["severity"] = "HIGH"
                    f["escalated"] = True

        return findings

    # ----------------------------
    # DB MODE (future)
    # ----------------------------
    cur = conn.cursor()

    for f in findings:
        sig = f.get("signature")
        cur.execute(
            "SELECT first_seen FROM devguard_memory WHERE signature = ?",
            (sig,),
        )
        row = cur.fetchone()

        if not row:
            continue

        first_seen = datetime.fromisoformat(row[0])
        age = datetime.utcnow() - first_seen

        if age >= timedelta(days=ESCALATION_DAYS):
            if f.get("severity") == "MEDIUM":
                f["severity"] = "HIGH"
                f["escalated"] = True

    return findings
