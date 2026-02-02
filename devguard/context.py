import yaml
from pathlib import Path


def load_context():
    context_file = Path("devguard/context.yaml")
    if not context_file.exists():
        raise FileNotFoundError("devguard/context.yaml not found")

    with open(context_file, "r") as f:
        return yaml.safe_load(f)
