def should_block(findings: list[dict]) -> bool:
    """
    Returns True if commit should be blocked.
    Policy: block on any HIGH severity finding.
    """
    for f in findings:
        if f.get("severity") == "HIGH":
            return True
    return False
