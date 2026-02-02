def collect_fixes(findings: list[dict]) -> list[dict]:
    """
    Extract fix proposals from findings.
    """
    fixes = []

    for f in findings:
        fix = f.get("fix")
        if fix:
            fixes.append({
                "signature": f.get("signature"),
                "severity": f.get("severity"),
                "problem": f.get("problem"),
                "fix": fix,
            })

    return fixes
