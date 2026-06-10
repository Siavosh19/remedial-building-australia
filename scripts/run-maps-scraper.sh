#!/bin/bash
# Keep-alive wrapper for Google Maps scraper
# Restarts automatically if it exits

cd /Users/siasepehrara/remedial-building-australia

LOG=/Users/siasepehrara/remedial-building-australia/business-leads-output/scraper-keepalive.log

echo "[$(date)] Keep-alive started" >> "$LOG"

while true; do
  echo "[$(date)] Starting scraper..." | tee -a "$LOG"
  node scripts/scrape-google-maps.js 2>&1 | tee -a "$LOG"
  EXIT=$?
  echo "[$(date)] Scraper exited (code $EXIT). Restarting in 30s..." | tee -a "$LOG"
  sleep 30
done
