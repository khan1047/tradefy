from fastapi import FastAPI, Depends, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import secrets

from devguard.context import load_context
from devguard.rules import run_rules
from devguard.memory import load_history
from devguard.fixes import collect_fixes
from devguard.applier import apply_fix
from devguard.trend import load_trend

app = FastAPI()

# ----------------------------
# OWNER KEY (generated at boot)
# ----------------------------
OWNER_KEY = secrets.token_hex(16)

print("\n🔐 DevGuard OWNER KEY (copy this):")
print("--------------------------------")
print(OWNER_KEY)
print("--------------------------------\n")


def require_owner(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Not authenticated")

    token = authorization.replace("Bearer ", "").strip()
    if token != OWNER_KEY:
        raise HTTPException(status_code=403, detail="Access denied")

    return True


# ----------------------------
# CORS (local only)
# ----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ----------------------------
# ROUTES
# ----------------------------
@app.get("/status")
def status(_: bool = Depends(require_owner)):
    return {
        "memory_count": len(load_history()),
        "owner_locked": True,
    }


@app.get("/history")
def history(_: bool = Depends(require_owner)):
    return load_history()


@app.get("/fixes")
def fixes(_: bool = Depends(require_owner)):
    context = load_context()
    findings = run_rules(context)
    return collect_fixes(findings)


@app.post("/fixes/apply")
def apply_fix_endpoint(payload: dict, _: bool = Depends(require_owner)):
    fix = payload.get("fix")
    if not fix:
        raise HTTPException(status_code=400, detail="Missing fix")

    applied = apply_fix(fix)
    return {"applied": applied}

@app.get("/trend")
def trend(_: bool = Depends(require_owner)):
    return load_trend()
