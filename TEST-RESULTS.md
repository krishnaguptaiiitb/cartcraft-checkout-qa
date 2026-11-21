# CartCraft — Verified Test Results

**As of:** 21 November 2026  
**Primary environment:** Chromium / Playwright  
**CI:** GitHub Actions `CartCraft Quality Gate #1`, branch `main`, commit `5e604c7`

## Executive test summary

| Verification | Actual observation | Evidence |
|---|---|---|
| Original browser suite (A01–A08) | 8 passed, 0 failed, 0 flaky, 0 skipped (31.1s) | `evidence/automation-a01-a08-original.png` |
| Post-quality local checks (A01–A08) | 8 named tests passed | `evidence/automation-a01-a08-regression.png` |
| Expanded local checks (A09–A16) | 8 named tests passed | `evidence/automation-a09-a16-quality.png` |
| GitHub CI — Chromium suite (A01–A16) | **16 passed (18.8s), 1 worker, 0 retries** | `evidence/ci-chromium-16-passed.txt` |
| GitHub CI — production build | Step *Typecheck and production build* succeeded | `evidence/ci-job-steps-success.png` |
| GitHub CI — HTML report & raw artifacts | Both upload steps succeeded | `evidence/ci-job-steps-success.png` |
| GitHub workflow | Successful, 58s overall; build-and-test job screenshot shows 51s | `evidence/ci-workflow-success.png`, `evidence/ci-job-steps-success.png` |

**Interpretation:** All 16 automated scenarios are verified as passed in a remote CI run, not just locally. This is **not** a claim of defect-free software, production payments, or cross-browser coverage. The CI log is a user-pasted transcript recorded faithfully by test title and timing, not a synthetic execution. See the original workflow or its uploaded Playwright HTML artifact for independent verification.

## Case-by-case observed CI status

| ID | Status | Scenario |
|---|---|---|
| A01 | PASS | Successful checkout, one confirmation and reference |
| A02 | PASS | Missing required name blocks and retains cart |
| A03 | PASS | Quantity updates exact line and order total |
| A04 | PASS | Empty-cart validation; typed name retained |
| A05 | PASS | Repeated synchronous submit gives one confirmation |
| A06 | PASS | Invalid/valid promotional code handling |
| A07 | PASS | Removing and re-adding a product |
| A08 | PASS | New-order state reset |
| A09 | PASS | Rapid quantity events and upper boundary 99 |
| A10 | PASS | Whitespace-only name validation and data retention |
| A11 | PASS | Promo recomputation after quantity changes |
| A12 | PASS | 375px mobile layout without horizontal overflow |
| A13 | PASS | Keyboard skip link and Enter checkout |
| A14 | PASS | Error clearing once inputs corrected |
| A15 | PASS | Accessible promo error association |
| A16 | PASS | Independent cart on fresh navigation |

## Required manual scenarios — outcomes still unverified

The project owner reported **running both** required manual checks. Neither actual observations nor PASS/FAIL confirmation has been provided. **Do not mark either PASS solely because A04 and A05 passed.**

| ID | Manual scenario | Execution | Result | Actual observation | Screenshot |
|---|---|---|---|---|---|
| M01 | Empty-cart attempt with customer name entered | Reported run | **Outcome unconfirmed** | To be recorded by tester | Not provided |
| M02 | Rapid physical double-click on Place order | Reported run | **Outcome unconfirmed** | To be recorded by tester | Not provided |

### Manual execution form

- Browser and OS:
- Date and time:
- M01 actual behavior:
- M01 result (PASS/FAIL):
- M01 evidence filename (if available):
- M02 actual behavior:
- M02 result (PASS/FAIL):
- M02 evidence filename (if available):

If either result was FAIL, add an authentic defect report with steps, expected behavior, actual behavior, and the supporting evidence. Do not invent a failure to fill the template.

## Known warnings and boundaries

- The CI job screenshot includes **one non-blocking annotation** concerning deprecation of Node.js 20 for an action. CI and tests passed; the action/dependency causing the warning should be identified before making a targeted update.
- Browser automation currently covers Chromium. Firefox and WebKit have not been shown passing.
- The app is demo-only and client-side. Confirmation references are not backed by a server, database, or global uniqueness mechanism.

## Defects

No actual failing product behavior has been demonstrated in the provided automated evidence. Manual results are not yet fully documented; the defect count cannot be asserted as universally zero.
