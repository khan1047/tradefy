## Python Security Scan



## Node Security Scan

# npm audit report

react-router  7.0.0 - 7.12.0-pre.0
Severity: high
React Router has CSRF issue in Action/Server Action Request Processing - https://github.com/advisories/GHSA-h5cw-625j-3rxh
React Router vulnerable to XSS via Open Redirects - https://github.com/advisories/GHSA-2w69-qvjg-hvjx
React Router SSR XSS in ScrollRestoration - https://github.com/advisories/GHSA-8v8x-cx79-35w7
fix available via `npm audit fix`
node_modules/react-router
  react-router-dom  7.0.0-pre.0 - 7.11.0
  Depends on vulnerable versions of react-router
  node_modules/react-router-dom

2 vulnerabilities (1 moderate, 1 high)

To address all issues, run:
  npm audit fix
