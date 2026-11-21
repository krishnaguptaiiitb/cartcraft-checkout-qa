# CartCraft — Checkout & Browser Quality Suite

**A polished, demo-only single-page checkout built with React, TypeScript, Vite, and Playwright.**

CartCraft is designed around a very specific engineering goal: a shopper must see precise totals, receive actionable validation, and get **one** confirmation for a successful order. Every required behavior is protected by browser-level checks.

> **Demo only.** No payments, real orders, database, backend, third-party API, or network transmission of checkout details. Product inventory and prices are synthetic. Each reload resets the in-memory cart.

## What it does

- Two synthetic products with fixed prices: **Studio Headphones ₹3,499** and **Arc Desk Lamp ₹1,899**.
- Add, remove, increment, and decrement; live line-item totals and overall total; quantities limited to 99.
- Required customer name: empty or whitespace-only names cannot submit; existing typed data survives validation failure.
- Empty-cart checkout is blocked with a visible message.
- One-time order submission guard prevents duplicate confirmations for repeated synchronous submits.
- Valid `CRAFT10` discount reduces the order by 10%; invalid codes don't affect totals.
- Accessible validation, focus management, keyboard skip link, mobile layout, and new-order flow.
- Client-generated demo order reference formatted like `CC-YYYYMMDD-XXXXXX` (not backed by a server or a uniqueness database).

## Quick start (Windows PowerShell)

Prerequisites: **Node.js 24**, npm, and a recent Chromium-compatible browser.

```powershell
npm ci
npx playwright install chromium
npm run dev
```

Open <http://localhost:5173/>. If the repo doesn't yet include a committed `package-lock.json`, run `npm install` once to create it, then commit that lockfile so `npm ci` works reproducibly.

**Production build / typecheck:**

```powershell
npm run build
```

**Automated browser tests (a Vite server is launched automatically):**

```powershell
npm run test:e2e
npm run test:e2e:report
```

**Interactive test explorer:**

```powershell
npm run test:e2e:ui
```

**Headed browser, for observing a test:**

```powershell
npx playwright test --headed --project=chromium
```

All tests begin with a fresh isolated browser context and seed cart. The test runner uses visibility and text assertions, not fixed timeouts.

## Verified quality and evidence

All **16 automated scenarios** passed in a GitHub Actions Chromium run on **21 November 2026**: **16 passed (18.8s), one worker, zero retries**. The CI job also shows a successful TypeScript/production build and upload of the Playwright HTML report and raw results. Local screenshots show the earlier eight-test run and the expanded suite's individual green results.

- [TEST-PLAN.md](TEST-PLAN.md) — risk-ranked A01–A16 and M01–M02.
- [TEST-RESULTS.md](TEST-RESULTS.md) — detailed **observed** local and remote results.
- [evidence/EVIDENCE-MANIFEST.md](evidence/EVIDENCE-MANIFEST.md) — original screenshots and CI transcript, with checksums.
- [FINAL-SUBMISSION.md](FINAL-SUBMISSION.md) — submission and reproduction checklist.

**Manual testing:** M01 (empty cart) and M02 (physical mouse double-click) were reported as run, but their outcomes and screenshots have not been supplied. The automation results do not replace those manual observations.

## CI: automatic quality gate

`.github/workflows/quality-gate.yml` runs for pushes, pull requests, and manual dispatch. It installs dependencies and Chromium, executes the production build and **all 16 Chromium tests with `--workers=1 --retries=0`**, and uploads HTML and raw reports as artifacts. A GitHub Actions run for commit `5e604c7` passed. The job screenshot includes one **non-blocking action/runtime deprecation warning**; it does not indicate a test failure.

## Repository layout

```text
cartcraft/
├── .github/workflows/quality-gate.yml
├── evidence/                      # verified, user-provided report screenshots
├── public/                        # local product illustrations
├── src/
│   ├── components/                # CheckoutForm, ProductCard, OrderSummary, Confirmation
│   ├── data/products.ts           # synthetic catalog
│   ├── lib/pricing.ts             # precise integer-paise arithmetic
│   └── App.tsx                    # checkout state and submission guard
├── tests/
│   ├── checkout.spec.ts           # A01–A08
│   └── quality.spec.ts            # A09–A16
├── TEST-PLAN.md
├── TEST-RESULTS.md
├── playwright.config.ts
├── package-lock.json             # keep from your local install
└── package.json
```

## Known scope limits

- No real checkout processing or guarantee of durable order reference uniqueness across separate sessions.
- No persistent cart after refresh (explicitly asserted in A16).
- Shipping is always free in this demo; promo applies to the item subtotal.
- Testing was performed in Chromium; Firefox/WebKit are not claimed as covered.
- Passing scenarios do not prove the absence of all defects.

## Evaluation walkthrough (about 2–3 minutes)

1. Open the app; show the two products and **₹5,398** initial total.
2. Increase headphones to quantity 2; show **₹6,998** line total and **₹8,897** overall.
3. Attempt checkout without a name; verify the message and unchanged cart.
4. Enter a name and submit; show the confirmation and single order reference.
5. Run `npm run test:e2e`; open the Playwright report and the checked-in evidence.
6. Show the verified GitHub Actions **CartCraft Quality Gate #1** run, the 16-pass log, and the published test artifacts.
