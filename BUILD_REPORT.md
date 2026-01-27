$ pytest
============================= test session starts ==============================
platform linux -- Python 3.13.5, pytest-9.0.2, pluggy-1.6.0
rootdir: /home/dns/TRADEFY
plugins: anyio-4.12.1
collected 0 items

============================ no tests ran in 0.03s =============================


$ npm run build

npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! path /home/dns/TRADEFY/package.json
npm ERR! errno -2
npm ERR! enoent ENOENT: no such file or directory, open '/home/dns/TRADEFY/package.json'
npm ERR! enoent This is related to npm not being able to find a file.
npm ERR! enoent 

npm ERR! A complete log of this run can be found in:
npm ERR!     /home/dns/.npm/_logs/2026-01-27T14_40_07_245Z-debug-0.log

$ docker-compose up -d --build

no configuration file provided: not found

$ curl -f http://localhost:8000/health

  % Total    % Received % Xferd  Average Speed   Time    Time     Time  Current
                                 Dload  Upload   Total   Spent    Left  Speed

  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
  0     0    0     0    0     0      0      0 --:--:-- --:--:-- --:--:--     0
curl: (22) The requested URL returned error: 404

$ docker-compose down

no configuration file provided: not found
