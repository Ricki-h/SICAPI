#!/usr/bin/env bash
npm uninstall sqlite3 || true
npm install --omit=optional
npm rebuild better-sqlite3 --build-from-source