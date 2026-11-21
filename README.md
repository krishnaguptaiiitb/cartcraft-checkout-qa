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

## Quality and evidence

| Evidence | Scope | Result visible in screenshot |
|---|---|---|
| [Original run](evidence/automation-a01-a08-original.png) | A01–A08 | All eight green |
| [Regression run](evidence/automation-a01-a08-regression.png) | A01–A08 after quality upgrade | All eight green |
| [Expanded run](evidence/automation-a09-a16-quality.png) | A09–A16 | All eight green |

**16 automated cases visibly passed in the latest two submitted screenshots (November 21, 2026).** This is evidence from local Chromium, *not* proof of a future GitHub Actions run. Original screenshot assets are supplied unchanged.

For exact priorities, steps, expected outcomes, and evidence, read [TEST-PLAN.md](TEST-PLAN.md), [TEST-RESULTS.md](TEST-RESULTS.md), and [evidence/EVIDENCE-MANIFEST.md](evidence/EVIDENCE-MANIFEST.md).

Manual tests M01 (empty cart) and M02 (rapid physical mouse double-click) were reported as **performed**, but pass/fail outcomes and screenshots were not supplied. They are not asserted as passed here.

## CI: automatic quality gate

`.github/workflows/quality-gate.yml` runs on pushes, pull requests, and manual dispatch. It installs the lockfile dependencies and Chromium, checks the production build, executes Playwright in **one worker without retries**, and uploads the HTML report and test-results as artifacts. See [STEP6-INSTRUCTIONS.md](STEP6-INSTRUCTIONS.md) for GitHub setup and how to inspect results.

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
6. Show the GitHub Actions **Quality Gate** result once it has actually passed.
