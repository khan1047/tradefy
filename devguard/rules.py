def run_rules(context: dict):
    findings = []

    ws = context.get("websocket", {})
    fe = context.get("frontend", {})

    # Rule 001 — WebSocket auth must use JWT
    if ws.get("auth") != "jwt_query_param":
        findings.append({
            "signature": "ws-auth-missing-jwt",
            "problem": "WebSocket auth is not set to jwt_query_param",
            "severity": "HIGH",
            "fix": {
                "type": "text",
                "description": "Require JWT token in WebSocket connection URL",
                "patch": (
                    "Change WebSocket URL from:\n"
                    "  ws://.../chat/{id}\n"
                    "to:\n"
                    "  ws://.../chat/{id}?token=JWT"
                ),
            },
        })

    # Rule 002 — React route param mismatch
    route_param = ws.get("param_name")
    fe_param = fe.get("route_param")

    if route_param and fe_param and route_param != fe_param:
        findings.append({
            "signature": f"react-route-mismatch:{route_param}:{fe_param}",
            "problem": (
                f"React route param mismatch: route uses '{route_param}' "
                f"but Chat.jsx uses '{fe_param}'"
            ),
            "severity": "MEDIUM",
            "fix": {
                "type": "code",
                "file": "frontend/src/pages/Chat.jsx",
                "patch": (
                    f"- const {{ {fe_param} }} = useParams();\n"
                    f"+ const {{ {route_param} }} = useParams();"
                ),
            },
        })

    return findings
