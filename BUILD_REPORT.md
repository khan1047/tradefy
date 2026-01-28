# 🧪 Build Verification Report

Frontend detected: True
Backend detected: True
Docker compose present: False

$ npm install

up to date, audited 160 packages in 2s

23 packages are looking for funding
  run `npm fund` for details

4 vulnerabilities (1 moderate, 3 high)

To address issues that do not require attention, run:
  npm audit fix

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.


$ npm test

> backend@1.0.0 test
> echo "No backend tests yet"

No backend tests yet


$ npm install

up to date, audited 185 packages in 723ms

40 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities


$ npm run build

> frontend@0.0.0 build
> vite build

vite v7.3.0 building client environment for production...
transforming...
✓ 103 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                   0.46 kB │ gzip:  0.29 kB
dist/assets/index-DQ3P1g1z.css    0.91 kB │ gzip:  0.49 kB
dist/assets/index-D0pf1LZU.js   273.97 kB │ gzip: 90.04 kB
✓ built in 1.43s


docker-compose.yml not present — skipped
