# CartCraft — Extended Quality Test Plan (Step 5)

## Focus

Prioritize errors that change cart value, compromise successful checkout, impair keyboard users, or prevent checkout on a phone. Every automated case loads a fresh app page in a separate Playwright browser context; no fixed sleeps.

| ID | Priority | Risk | Evidence / success condition |
|---|---|---|---|
| A09 | P0 | Rapid increment loses updates / quantity over 99 | 3 synchronous clicks raise quantity 1→4; burst reaches cap 99 with exact line and grand total |
| A10 | P0 | Space-only name incorrectly passes | Error shown, typed spaces preserved, no order reference |
| A11 | P1 | Discount becomes stale after quantity change | ₹8,897 subtotal, −₹890 displayed discount, ₹8,007 displayed total |
| A12 | P1 | Unusable phone viewport | 375px layout no horizontal overflow; checkout produces confirmation |
| A13 | P1 | Keyboard user gets lost after checkout | Skip link works; pressing Enter submits; confirmation heading receives focus |
| A14 | P1 | Validation remains stuck after correction | Both errors clear when name and item are fixed; checkout succeeds |
| A15 | P1 | Promo errors not announced to assistive tech | Input has valid ARIA error association; resolves when corrected |
| A16 | P2 | Test-state leakage / unexpected persistence | Reload returns deterministic ₹5,398 seed cart, blank name |

## Regression policy

Run the unchanged A01–A08 suite together with A09–A16 and `npm run build`. Existing assertions must continue to pass. Do not mark these new tests successful without actual execution output.

## Mandatory manual tests

M01: empty cart → submission blocked, clear message, name preserved.
M02: actual fast mouse double-click → exactly one confirmation and one reference.

Actual results and evidence belong in `QA-RESULTS.md` and `evidence/`. If something fails, include exact steps, expected and actual results, browser, screenshot/trace. Do not invent defects.
