# CartCraft — Risk-based test plan

**Build under test:** Step 2 React/Vite app + Step 3 Playwright tests.  
**Environment:** Windows + Chromium (record actual versions after executing).  
**Execution status:** NOT YET RUN — fill in only after checking the real results.

## Goal and scope

Verify an accurate two-product checkout, meaningful validation, preservation of customer input, and exactly one client-side order confirmation. No backend, payment flow, database or network API is in scope.

## Automated test coverage

| ID | Priority | Risk | Setup/action | Expected observable result | Status |
|---|---|---|---|---|---|
| A01 | P0 | Orders silently fail or lack reference | Load fresh page, enter name, submit | One confirmation, user name, exact ₹5,398, reference `CC-YYYYMMDD-XXXXXX` | NOT RUN |
| A02 | P0 | Missing required field accepted | Fresh page, submit blank name | Specific inline alert; no confirmation; original prices unchanged | NOT RUN |
| A03 | P0 | Quantity change produces wrong total | Fresh page, increase headphones to 2 | Headphones line ₹6,998; lamp ₹1,899; subtotal & total ₹8,897 | NOT RUN |
| A04 | P0 | Empty cart submitted or name lost | Fresh page, enter name, remove all, submit | Empty-cart alert, no confirmation, entered name preserved | NOT RUN |
| A05 | P0 | Duplicate orders from rapid submit | Fresh page, enter name, dispatch two synchronous submits | Exactly one confirmation and reference, submit button removed | NOT RUN |
| A06 | P1 | Discount corrupts totals | Apply bad code, then CRAFT10, then remove | Error and no change for bad code; ₹540 discount and ₹4,858 total for CRAFT10; removal restores ₹5,398 | NOT RUN |
| A07 | P1 | Removing/re-adding item corrupts cart | Remove headphones, add them back | ₹1,899 intermediate total; ₹5,398 restored | NOT RUN |
| A08 | P1 | New-order state contaminated | Submit discounted order, restart | Empty cart, ₹0 total, blank name/promo, no prior confirmation | NOT RUN |

## Mandatory manual checks (to execute and record)

**M01 — Empty cart** (P0): Start from fresh page. Remove both products; fill name; click Place order. Expect an empty-cart error, no confirmation, preserved name, total ₹0. Record actual observation, date/browser version, screenshots, and PASS/FAIL.

**M02 — Rapid double-click** (P0): Start from fresh page. Enter a valid name, then physically double-click Place order as fast as possible. Expect exactly one confirmation and one reference. Record what happened and screenshot. (A05 stresses the same risk programmatically; this manual check validates the real UI gesture.)

## Exit criteria

- All P0 cases pass; no unaddressed critical failures.
- Three brief-mandated automated tests (A01/A02/A03) pass and have reproducible evidence.
- Both required manual checks (M01/M02) are executed and recorded honestly.
- If a defect exists, log reproduction steps, expected vs actual, evidence, and whether it was fixed/retested. If none exists, explicitly write `No defects observed in the tested scope`—not an invented defect.

## Evidence

After a real run: terminal output, `playwright-report/` (HTML screenshots), `test-results/junit.xml`, failure trace/video/screenshots if relevant, and screenshots for M01/M02. Include exact date/time, Node.js, browser and Playwright versions.
