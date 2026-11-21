# CartCraft — Test Execution Results

## Observed automated results (screenshots supplied by project owner)

| Run | Date | Browser | Cases visible | Observed status | Evidence |
|---|---|---|---|---|---|
| Initial checkout suite | Nov 21, 2026 | Chromium | A01–A08 | 8 tests marked passed; report header showed 0 failed / 0 flaky / 0 skipped | `evidence/automation-a01-a08-original.png` |
| Post-hardening regression | Nov 21, 2026 | Chromium | A01–A08 | All 8 listed tests marked passed | `evidence/automation-a01-a08-regression.png` |
| Extended quality suite | Nov 21, 2026 | Chromium | A09–A16 | All 8 listed tests marked passed | `evidence/automation-a09-a16-quality.png` |

**Latest observed A01–A16 evidence: 16 green/passed test entries across the two newly supplied screenshots.** These are local browser results, not GitHub CI results. The new screenshots do not show the full aggregate report header; consequently, this report does not assume additional unseen tests or metrics.

## Detailed latest automated results

| ID | Status | What was checked |
|---|---|---|
| A01 | PASS | Valid order, one confirmation and reference |
| A02 | PASS | Name required; cart preserved |
| A03 | PASS | Exact quantity and order totals |
| A04 | PASS | Empty cart blocked; name preserved |
| A05 | PASS | Double synchronous submit yields one confirmation |
| A06 | PASS | Invalid/valid promo calculations |
| A07 | PASS | Remove and re-add products |
| A08 | PASS | Starting another order resets state |
| A09 | PASS | Rapid quantity events and 99 cap |
| A10 | PASS | Spaces-only name validation |
| A11 | PASS | Dynamic promo recalculation |
| A12 | PASS | Mobile 375px flow without overflow |
| A13 | PASS | Skip link, keyboard submit, confirmation focus |
| A14 | PASS | Error clearance after fixing inputs |
| A15 | PASS | ARIA association for promo validation |
| A16 | PASS | State reset after reload |

## Required manual execution — results still need to be confirmed

The owner reported that **both manual tests were run**. The actual observations, PASS/FAIL results, and screenshots were not shared; therefore they remain **EXECUTED — OUTCOME UNCONFIRMED** rather than being marked passed.

| ID | Priority | Execution | Result | Actual observation | Screenshot |
|---|---|---|---|---|---|
| M01 empty-cart interaction | P0 | User says executed | OUTCOME UNCONFIRMED | **Fill in what was seen** | `evidence/manual-empty-cart.png` (not provided) |
| M02 rapid physical double-click | P0 | User says executed | OUTCOME UNCONFIRMED | **Fill in whether exactly one reference appeared** | `evidence/manual-double-click.png` (not provided) |

### Manual execution record to complete

- M01 actual: ______________________________
- M01 result (PASS/FAIL): ___________________
- M02 actual: ______________________________
- M02 result (PASS/FAIL): ___________________
- Test environment and timestamp: __________
- Screenshot files attached: ________________

## CI execution

| Check | Current status |
|---|---|
| GitHub Actions workflow file | Provided in Step 6 |
| Remote GitHub CI run | NOT YET RUN / NOT VERIFIED |
| Local `npm run build` after Step 6 | Awaiting confirmation |

## Defects

No defects are *demonstrated by the 16 passed automated cases*. Manual outcomes are not yet documented, and this is not a claim that the entire application is defect-free. Only report defects for which actual failing behavior and reproducing evidence exist.
