# CartCraft — QA Execution Results

## Run overview

| Field | Recorded result |
|---|---|
| Test framework | Playwright |
| Browser project | Chromium |
| Date shown in report | November 21, 2026 |
| Time shown in report | 11:35:40 AM (report UI; timezone not stated) |
| Total suite time | 31.1 seconds |
| Passed | 8 |
| Failed | 0 |
| Flaky | 0 |
| Skipped | 0 |
| Source of results | User-provided Playwright HTML report screenshot |

## Automated scenarios (observed in screenshot)

| ID | Test scenario | Result |
|---|---|---|
| A01 | Valid order displays one confirmation and a reference | PASS |
| A02 | Missing required name blocks checkout without changing the cart | PASS |
| A03 | Increasing quantity changes the exact line and order totals | PASS |
| A04 | Empty cart is blocked and entered name is preserved | PASS |
| A05 | Repeated synchronous submits produce only one confirmation | PASS |
| A06 | Invalid promo doesn't change totals; valid promo applies 10% | PASS |
| A07 | Removed item can be added back and totals recover | PASS |
| A08 | Starting another order resets cart, name, and discount | PASS |

Evidence: `evidence/playwright-8-passed.png`

## Manual test execution (complete after running locally)

| ID | Scenario | Actual result observed | Status | Evidence |
|---|---|---|---|---|
| M01 | Empty-cart validation preserves entered name | NOT YET RECORDED | NOT RUN | Add `evidence/manual-empty-cart.png` |
| M02 | Rapid physical mouse double-click gives one confirmation | NOT YET RECORDED | NOT RUN | Add `evidence/manual-double-click.png` |

**Do not mark manual tests PASS until you perform them and verify the results.**

## Defects

No defects were identified by the eight automated checks. Manual testing is pending, so do not claim the full application is defect-free.

If a defect occurs, fill in `DEFECT-REPORT-TEMPLATE.md` with reproducible steps, expected vs. actual behavior and the evidence file.
