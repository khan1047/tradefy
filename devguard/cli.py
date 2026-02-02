import argparse
import sys
from pathlib import Path

from devguard.context import load_context
from devguard.rules import run_rules
from devguard.memory import remember
from devguard.policy import should_block
from devguard.escalation import apply_escalation
from devguard.fixes import collect_fixes
from devguard.applier import apply_fix
from devguard.reports import export_json, export_markdown
from devguard.trend import record_snapshot


def main():
    parser = argparse.ArgumentParser(
        description="DevGuard – project self-correcting assistant"
    )

    sub = parser.add_subparsers(dest="command")

    sub.add_parser("scan", help="Scan project for issues")
    sub.add_parser("fixes", help="Preview proposed fixes")
    sub.add_parser("apply", help="Apply approved fixes")

    report = sub.add_parser("report", help="Export reports")
    report.add_argument("format", choices=["md", "json"], help="Report format")

    args = parser.parse_args()
    context = load_context()

    # --------------------
    # REPORT
    # --------------------
    if args.command == "report":
        out_dir = Path("reports")
        out_dir.mkdir(exist_ok=True)

        if args.format == "md":
            path = out_dir / "devguard_report.md"
            export_markdown(path)
            print(f"📄 Markdown report written to {path}")
            return

        if args.format == "json":
            path = out_dir / "devguard_report.json"
            export_json(path)
            print(f"📦 JSON report written to {path}")
            return

    # --------------------
    # FIX PREVIEW
    # --------------------
    if args.command == "fixes":
        findings = run_rules(context)
        fixes = collect_fixes(findings)

        if not fixes:
            print("✅ No fixes available")
            return

        print("🛠️ Proposed Fixes (preview only):")
        for f in fixes:
            print(f"\n[{f['severity']}] {f['problem']}")
            print("Patch:")
            print(f["fix"]["patch"])
        return

    # --------------------
    # APPLY FIXES
    # --------------------
    if args.command == "apply":
        findings = run_rules(context)
        fixes = collect_fixes(findings)

        if not fixes:
            print("✅ No fixes to apply")
            return

        for f in fixes:
            fix = f["fix"]
            print(f"\n🛠️ Fix for: {f['problem']}")
            print("Patch:")
            print(fix["patch"])

            confirm = input("Apply this fix? (yes/no): ").strip().lower()
            if confirm != "yes":
                print("⏭️  Skipped")
                continue

            apply_fix(fix)
        return

    # --------------------
    # SCAN (DEFAULT)
    # --------------------
    if args.command == "scan" or args.command is None:
        findings = run_rules(context)
        findings = apply_escalation(findings)

        # 🔴 ALWAYS record trend snapshot
        print("📈 recording trend snapshot")
        record_snapshot(findings)

        if not findings:
            print("✅ DevGuard: No issues found")
            return

        print("❌ DevGuard Findings:\n")
        for f in findings:
            sev = f.get("severity", "UNKNOWN")
            problem = f.get("problem", f.get("title", "Unknown issue"))
            print(f"❌ [{sev}] {problem}")
            if "fix" in f:
                print("💡 Fix available")

            remember(f.get("signature", "unknown"))

        if should_block(findings):
            print("\n🚫 DevGuard BLOCKED this commit due to HIGH severity issues.")
            sys.exit(1)

        print("\n⚠️ DevGuard warnings present, but commit allowed.")
        return

    parser.print_help()


if __name__ == "__main__":
    main()

