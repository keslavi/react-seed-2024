# Mock Data Solution (Encrypted, Shared, and Testable)

## Why this exists

The project needs one mock-data flow that supports all of the following at the same time:

- **Seed integration-style tests** via MSW interception
- **server-koa** using the same mock source without requiring Seed to run server-koa
- **No clear mock payloads in browser-served locations**
- **Local and environment flexibility** (local, DIF, PL) with policy controls

This README documents the implemented approach and how to apply it safely.

---

## Need

We need a practical setup where:

1. Seed can test against realistic API responses through MSW.
2. Mock data can be shared from a single canonical source.
3. Browser-facing mock assets are encrypted.
4. Teams can enforce encrypted-only mode when required.
5. Existing development does not break during migration.

---

## Problems we had

1. **Path drift after refactor**  
   `server-koa` moved to workspace root, while some Seed loaders still looked for `seed/server-koa/...`.

2. **Inconsistent mock loading between test/runtime contexts**  
   Node/MSW and browser/MSW did not share a robust fallback strategy.

3. **Plain mock files exposed under `public/mock`**  
   Browser-served files could be read directly as clear IIFE payloads.

4. **No enforceable policy toggle**  
   There was no way to require encrypted-only loading and block plaintext fallback.

5. **Test harness drift**  
   Vitest aliases and helper behavior diverged from app behavior, causing failing Seed tests.

---

## Resolution implemented

### 1) Canonical source remains in `server-koa/data`

- Source data is still generated/maintained there.
- Encrypted artifacts are generated beside source files:
  - `contact.enc.json`
  - `options.enc.json`
  - `task.enc.json`

### 2) Browser-served assets stay in `seed/public/mock`

- This preserves the existing MSW/browser serving pattern.
- In encrypted-only mode, only `*.enc.json` are published there.

### 3) Encrypted-first loading in MSW

`seed/src/test/msw/mockLoad.js` now:

- Tries encrypted mock first (`*.enc.json`)
- Decrypts with `MOCK_DATA_KEY` (Node) or browser key sources
- Falls back to plaintext only when policy allows

### 3.1) Handler aggregation pattern (`mswAll` vs `mswBrowser`)

- `seed/src/test/msw/mswAll.js` is the **test/node aggregate** used by Vitest setup.
- `seed/src/test/msw/mswBrowser.js` is the **runtime/browser aggregate**.
- In browser mode, the aggregation point is:
   - `const browserHandlers = [...mswTask, ...mswOption];`

As new domains are added (for example `mswObject` modules), include them in `browserHandlers` for runtime use, and include them in `mswAll` for test coverage.

Recommended convention:

- one handler module per domain/object (`mswTask`, `mswOption`, `mswObjectX`, ...)
- one browser aggregate (`mswBrowser`) for runtime toggling
- one test aggregate (`mswAll`) for deterministic unit/integration tests

### 4) Encrypted-only policy support

- `MOCK_DATA_ENCRYPTED_ONLY=true` → Node/test loader rejects plaintext fallback
- `VITE_MOCK_DATA_ENCRYPTED_ONLY=true` → Browser loader rejects plaintext fallback
- `copy-mock-data.js` respects encrypted-only and removes plaintext assets from `public/mock`

### 5) Scripted workflow

Added scripts in `seed/package.json`:

- `mock:encrypt` → generate encrypted artifacts in `server-koa/data`
- `copy:mock` → publish mock artifacts into `seed/public/mock`
- `mock:refresh` → run both in sequence

### 6) Seed tests stabilized

- Added missing test alias for `@formhelper` in `seed/vitest.config.js`
- Updated `seed/src/helpers/extensions/lodash-extension.js` behavior to match expectations
- Full Seed suite now passes in encrypted-only mode

---

## Practical guide: applying this solution

## Prerequisites

- `MOCK_DATA_KEY` must be configured (recommended in local secret env, not committed)
- Node/npm available

## 1) Configure environment

In local env (example values):

- `MOCK_DATA_KEY=<your-secret>`
- `MOCK_DATA_ENCRYPTED_ONLY=true`
- `VITE_MOCK_DATA_ENCRYPTED_ONLY=true`

Use `seed/!env.example` as template guidance.

## 2) Generate + publish encrypted mock artifacts

From workspace root:

```bash
npm --prefix seed run mock:refresh
```

What this does:

1. Encrypts canonical IIFE-derived payloads into `server-koa/data/*.enc.json`
2. Copies/publishes artifacts into `seed/public/mock`
3. In encrypted-only mode, removes plaintext files from `seed/public/mock`

## 3) Run tests (with encrypted-only enforced)

```bash
npm --prefix seed run test:commit
```

Expected: Seed test suite passes with encrypted data flow enabled.

## 4) Development run

```bash
npm --prefix seed run dev
```

`dev` invokes `copy:mock` first, so mock assets are refreshed before startup.

## 5) Commit policy

Before commit/push:

1. Confirm encrypted artifacts are regenerated with the intended key/context
2. Confirm tests pass
3. Verify no plaintext mock payloads are in `seed/public/mock` when encrypted-only is required

---

## Operational modes

### Compatibility mode (migration)

- encrypted-first, plaintext fallback allowed
- useful while teams transition

### Enforced mode (recommended for protected environments)

- encrypted-only toggles set to `true`
- plaintext fallback blocked
- browser mock folder contains encrypted files only

---

## Security notes

- This approach protects mock payloads at rest in served artifacts and repo surfaces.
- Any runtime that can decrypt necessarily has key access; treat key handling as sensitive.
- Keep `MOCK_DATA_KEY` in secure secret management, not in committed files.

---

## Troubleshooting

### `MOCK_DATA_KEY is required`

- Ensure env is loaded in current shell/session before running scripts/tests.

### Encrypted load fails, fallback blocked

- Re-run `npm --prefix seed run mock:refresh`
- Verify encrypted files exist in both:
  - `server-koa/data`
  - `seed/public/mock`
- Confirm `MOCK_DATA_KEY` matches the key used for encryption.

### Import `@formhelper` not resolved in tests

- Verify alias exists in `seed/vitest.config.js` and points to `seed/formhelper-mui-dist/formhelper-mui.js`.

---

## File map (key touchpoints)

- `seed/src/test/msw/mockLoad.js`
- `seed/copy-mock-data.js`
- `seed/scripts/encrypt-mock-data.js`
- `seed/package.json`
- `seed/vitest.config.js`
- `seed/src/helpers/extensions/lodash-extension.js`
- `seed/public/mock/*.enc.json`
- `server-koa/data/*.enc.json`
