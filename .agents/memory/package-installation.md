---
name: Imported package installation
description: Package installation in imported Bun projects can rewrite lockfile metadata and upgrade tool versions.
---

When setting up an imported Bun project, install dependencies only after confirming the user wants the app running, and recheck package.json and bun.lock afterward because the package installer may rewrite lockfile entries or resolve newer versions.

**Why:** The imported project had no node_modules, and the first installer invocation upgraded Vite/ESLint and rewrote lockfile metadata even though the app's declared ranges were unchanged.

**How to apply:** Prefer the existing lockfile and declared versions for verification; treat package metadata changes as setup side effects and avoid unrelated dependency changes in feature work.