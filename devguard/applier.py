from pathlib import Path
import shutil


def apply_fix(fix: dict) -> bool:
    """
    Apply a single approved fix.
    Returns True if applied, False otherwise.
    """
    if fix.get("type") != "code":
        print("⚠️  This fix is advisory only and cannot be auto-applied.")
        return False

    file_path = fix.get("file")
    patch = fix.get("patch")

    if not file_path or not patch:
        print("❌ Invalid fix format.")
        return False

    path = Path(file_path)

    if not path.exists():
        print(f"❌ File not found: {file_path}")
        return False

    # Backup
    backup = path.with_suffix(path.suffix + ".bak")
    shutil.copy(path, backup)
    print(f"🧾 Backup created: {backup}")

    old, new = patch.split("\n", 1)
    old = old.replace("- ", "", 1)
    new = new.replace("+ ", "", 1)

    content = path.read_text()

    if old not in content:
        print("❌ Patch does not match file content. Aborting.")
        return False

    updated = content.replace(old, new, 1)
    path.write_text(updated)

    print(f"✅ Fix applied to {file_path}")
    return True
