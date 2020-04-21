#!/bin/sh
# DEBUG=server:* NODE_ENV=development /usr/bin/node /root/LabChecker/built/bin/www.js
/usr/bin/npm run build && serve -l 3000 build