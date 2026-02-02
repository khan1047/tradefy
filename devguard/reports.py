import json
from pathlib import Path
from datetime import datetime

from devguard.context import load_context
from devguard.rules import run_rules
from devguard.escalation import apply_escalation


def collect_report_data() -> dict:
    context = load_context()
    findings = run_rules(context)
    findings = apply_escalation(findings)

    return {
        "generated_at": datetime.utcnow().isoformat(),
        "summary": {
            "total_findings": len(findings),
            "by_severity": {
                "LOW": sum(1 for f in findings if f.get("severity") == "LOW"),
                "MEDIUM": sum(1 for f in findings if f.get("severity") == "MEDIUM"),
                "HIGH": sum(1 for f in findings if f.get("severity") == "HIGH"),
            },
        },
        "findings": findings,
        "context": context,
    }


def export_json(path: Path):
    data = collect_report_data()
    path.write_text(json.dumps(data, indent=2))
    return path


def export_markdown(path: Path):
    data = collect_report_data()

    lines = []
    lines.append("# DevGuard Report\n")
    lines.append(f"Generated at: `{data['generated_at']}`\n")

    summary = data["summary"]
    lines.append("## Summary\n")
    lines.append(f"- Total findings: **{summary['total_findings']}**")
    lines.append(f"- HIGH: **{summary['by_severity']['HIGH']}**")
    lines.append(f"- MEDIUM: **{summary['by_severity']['MEDIUM']}**")
    lines.append(f"- LOW: **{summary['by_severity']['LOW']}**\n")

    lines.append("## Findings\n")

    if not data["findings"]:
        lines.append("_No issues detected._\n")
    else:
        for f in data["findings"]:
            sev = f.get("severity", "UNKNOWN")
            esc = " (ESCALATED)" if f.get("escalated") else ""
            lines.append(f"### [{sev}]{esc} {f.get('problem')}\n")

            fix = f.get("fix")
            if fix:
                lines.append("**Proposed fix:**")
                lines.append("```")
                lines.append(fix.get("patch", ""))
                lines.append("```")

    lines.append("\n## Declared Architecture (context.yaml)\n")
    lines.append("```json")
    lines.append(json.dumps(data["context"], indent=2))
    lines.append("```")

    path.write_text("\n".join(lines))
    return path
