from pathlib import Path


def ensure_initialized():
    devguard_dir = Path("devguard")
    context_file = devguard_dir / "context.yaml"

    if not devguard_dir.exists():
        devguard_dir.mkdir()
        print("🧠 DevGuard initialized")

    if not context_file.exists():
        context_file.write_text(
            "websocket:\n"
            "  auth: jwt_query_param\n"
            "  param_name: conversation_id\n\n"
            "frontend:\n"
            "  token_storage: localStorage.access_token\n\n"
            "backend:\n"
            "  jwt_secret_env: SECRET_KEY\n"
        )
        print("🧠 DevGuard context created")
