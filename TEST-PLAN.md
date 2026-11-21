# CartCraft — Risk-Based Browser and Manual Test Plan

## Objective and strategy

Detect checkout failures in the order of risk: **(1) incorrect money, (2) invalid or duplicate orders, (3) broken recovery, (4) usability / accessibility, (5) state isolation**.
All browser tests run in Chromium with Playwright `expect` assertions against visible UI. Each test receives an isolated page/browser context and navigates to the deterministic starting cart. Assertions use no fixed waits.

**Seed:** headphones ₹3,499 × 1, lamp ₹1,899 × 1 = **₹5,398**. Quantities 0–99. Promo `CRAFT10` yields 10% off, rounded to the nearest rupee in the UI.

| ID | Priority | Risk being tested | Expected user-observable result | Method |
|---|---|---|---|---|
| A01 | P0 | Successful order missing or duplicated | One confirmation + one formatted reference | Automated |
| A02 | P0 | Blank name accepted | Clear required-field error; cart totals unchanged | Automated |
| A03 | P0 | Wrong quantity math | Headphones quantity 2 = ₹6,998; total ₹8,897 | Automated |
| A04 | P0 | Empty cart checked out | No confirmation, visible error, name preserved | Automated |
| A05 | P0 | Double synchronous submit | One confirmation and one reference | Automated |
| A06 | P1 | Wrong promo effect | Invalid code changes nothing; `CRAFT10` total ₹4,858 | Automated |
| A07 | P1 | Remove/re-add breaks state | Correct product restored and total recalculated | Automated |
| A08 | P1 | New-order flow leaks old data | Cart reset, name and discount cleared | Automated |
| A09 | P0 | Lost rapid updates / quantity overflow | Three rapid increments accumulate; cap 99, exact ₹3,48,300 total | Automated |
| A10 | P0 | Whitespace bypasses validation | Name `'   '` blocked and preserved | Automated |
| A11 | P1 | Discount stale after quantity edit | Subtotal ₹8,897, discount −₹890, grand total ₹8,007 | Automated |
| A12 | P1 | Mobile checkout unusable | No horizontal overflow at 375px, order succeeds | Automated |
| A13 | P1 | Keyboard interaction fails | Skip link, Enter submit, focus on confirmation | Automated |
| A14 | P1 | Errors persist after correction | Errors disappear when name + cart fixed | Automated |
| A15 | P1 | Errors invisible to assistive tech | Promo error associated with input using ARIA | Automated |
| A16 | P2 | State leaks between sessions | Reload starts with seed cart and blank name | Automated |
| M01 | P0 | Empty-cart UX broken under physical use | User sees blocked checkout; entered name remains | Manual |
| M02 | P0 | Rapid physical double-click duplicates order | Exactly one confirmation and one order reference | Manual |

## Manual reproducibility

**M01 — Empty cart**: start from a fresh reload; remove headphones and lamp; type `Alex Tester`; click **Place order**; confirm a visible empty-cart error, no confirmation, and preserved `Alex Tester`; capture `evidence/manual-empty-cart.png`.

**M02 — Physical double-click**: reload; enter `Alex Tester`; quickly double-click the actual **Place order** button with a mouse; count on-screen confirmations and references; capture `evidence/manual-double-click.png`. Programmatically dispatched events in A05 complement but do not replace this test.

For each manual case, record the actual outcome in `TEST-RESULTS.md` and attach browser/version/time/screenshot evidence if available. The project owner explicitly confirmed M01 PASS and M02 PASS on 21 November 2026; exact browser details and manual screenshots were not supplied. Do not claim evidence that does not exist.

## Defect reporting and priority

If a real defect is found, write `DEFECT-REPORT-TEMPLATE.md`: summary and severity, environment, prerequisites, numbered steps, expected vs actual results, evidence screenshot/trace, and retest status. **No fabricated defects.**

## Release gate

- All P0 browser tests and a production build should pass.
- M01 and M02 must have manual tester confirmation recorded before final submission (both PASS confirmed and recorded; additional screenshots not supplied).
- GitHub Actions result must be inspected directly before claiming CI success.
