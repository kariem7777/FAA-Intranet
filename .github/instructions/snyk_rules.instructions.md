---
alwaysApply: true
always_on: true
trigger: always_on
applyTo: "{src/**,.env,.gitignore,eslint.config.js,index.html,package-lock.json,package.json,postcss.config.js,README.md,tailwind.config.js,tsconfig.app.json,tsconfig.json,tsconfig.node.json,vite.config.js}"
description: Snyk Security At Inception
---

# Project security best practices

- Always run `snyk_code_scan` for newly generated or modified first-party code in a Snyk-supported language.
- If issues are found, fix them using the Snyk results context.
- Re-scan after fixing.
- Repeat until no new issues are found.
