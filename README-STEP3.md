# CartCraft — Step 3: Browser automation

This layer adds **eight independent Playwright Chromium browser tests** to the Step 2 Vite/React app. Do not replace `src/` or any existing source files. The tests rely on the accessible controls and `data-testid` attributes already present in the Step 2 UI.

## 1. Merge files

Extract this archive directly into the **existing** `cartcraft` project root. It adds:

```text
cartcraft/
├── playwright.config.ts
├── tests/
│   └── checkout.spec.ts
├── QA-TEST-PLAN.md
└── README-STEP3.md
```

## 2. Install Playwright and browser

```powershell
npm install -D @playwright/test
npx playwright install chromium
```

You can run these again even if Playwright was previously installed.

## 3. Add NPM scripts (run once)

```powershell
npm pkg set "scripts.test:e2e=playwright test" "scripts.test:e2e:ui=playwright test --ui" "scripts.test:e2e:report=playwright show-report"
```

These commands modify your existing `package.json` without overwriting its Vite dependencies.

## 4. Run all tests

```powershell
npm run test:e2e
```

Playwright starts the Vite app automatically if needed. If your local server is already running on `http://127.0.0.1:5173`, it reuses that server. This package only configures Chromium to avoid additional browser-install requirements for now.

## 5. Open the report or run interactively

```powershell
npm run test:e2e:report
npm run test:e2e:ui
```

Successful tests attach screenshots to their HTML report. Failures retain screenshot, browser video and trace in `test-results/`; the HTML report is in `playwright-report/`, and JUnit XML is written to `test-results/junit.xml`.

For a fresh evidence capture, execute the suite and save the complete terminal output. Do not label tests as passing unless your run shows PASS. Keep artifacts from the actual local run.

## 6. Optional: ignore generated artifacts in Git

Append these lines to your existing `.gitignore` if they aren't present:

```gitignore
playwright-report/
test-results/
```

The delivered source tests and plan belong in Git; generated runtime reports can be archived separately as submission evidence.

## Why these tests are reliable

- Every test has a fresh Playwright browser context and navigates to `/` in `beforeEach`.
- Tests use visible accessible names and concrete expected currency amounts, not blind clicks or arbitrary `waitForTimeout` calls.
- Tests exercise user-visible feedback (confirmation, alerts, line totals and grand totals).
- Race handling is exercised using two synchronous submit events, which stresses the period before React can rerender.
- This is only **client-side idempotency**. It does not claim exactly-once delivery across a backend (none exists).

## Important

The `QA-TEST-PLAN.md` intentionally includes test execution status as **NOT YET RUN**. Update it using your actual browser run, and complete the two manual checks in the next step. Never report invented defects or results.
