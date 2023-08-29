#!/bin/bash
pm2 stop logic
git pull
pm2 start dist/index.js --max-memory-restart 300M --cron-restart="0 */8 * * *" --name logic
pm2 logs --lines 100
