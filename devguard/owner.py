from pathlib import Path
import secrets

# Absolute path based on this file's location
BASE_DIR = Path(__file__).resolve().parent
OWNER_KEY_FILE = BASE_DIR / "owner.key"


def is_initialized() -> bool:
    return OWNER_KEY_FILE.exists()


def initialize_owner():
    if OWNER_KEY_FILE.exists():
        return

    token = secrets.token_hex(32)
    OWNER_KEY_FILE.write_text(token)
    print("🔐 DevGuard owner key created")
    print(f"⚠️  Keep this file safe: {OWNER_KEY_FILE}")


def verify_owner(provided_key: str) -> bool:
    if not OWNER_KEY_FILE.exists():
        return False

    stored_key = OWNER_KEY_FILE.read_text().strip()
    return secrets.compare_digest(stored_key, provided_key)
