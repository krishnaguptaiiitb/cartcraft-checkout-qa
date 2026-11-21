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
| M01 manual empty-cart check | **PASS — owner confirmed** | `evidence/MANUAL-TEST-CONFIRMATION.md` |
| M02 manual rapid double-click check | **PASS — owner confirmed** | `evidence/MANUAL-TEST-CONFIRMATION.md` |

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

## Required manual scenarios — confirmed by the tester

The project owner explicitly reported **M01 PASS and M02 PASS** on 21 November 2026. These are **manual test results confirmed by the tester**, not automated test outcomes or independent screenshot verification. The acceptance criteria below come from `TEST-PLAN.md`; no more detailed manual observations were supplied.

| ID | Scenario | Result | Acceptance criteria covered by the owner's PASS confirmation | Evidence | 
|---|---|---|---|---|
| M01 | Empty cart with name entered, attempt checkout | **PASS (owner-reported)** | Empty cart is blocked, validation is visible, and entered name is retained | `evidence/MANUAL-TEST-CONFIRMATION.md` |
| M02 | Rapid physical mouse double-click of **Place order** | **PASS (owner-reported)** | Exactly one order confirmation and one reference appear | `evidence/MANUAL-TEST-CONFIRMATION.md` |

**Manual evidence limitations:** The tester has not supplied manual screenshots, exact browser version, execution timestamps, or a step-by-step observation log. Do not create fake screenshot references or represent the owner's confirmation as a separate browser recording. The original tester confirmation is transcribed verbatim in `evidence/MANUAL-TEST-CONFIRMATION.md`.

**Manual defect disposition:** The tester reported both cases passed; no defect was reported for M01 or M02. If subsequent testing uncovers an issue, create a defect record with real reproduction steps and evidence.

## Known warnings and boundaries

- The CI job screenshot includes **one non-blocking annotation** concerning deprecation of Node.js 20 for an action. CI and tests passed; the action/dependency causing the warning should be identified before making a targeted update.
- Browser automation currently covers Chromium. Firefox and WebKit have not been shown passing.
- The app is demo-only and client-side. Confirmation references are not backed by a server, database, or global uniqueness mechanism.

## Defects

No product defect was observed in the provided 16-test automated run, and the tester reported both required manual checks as PASS. **Defects reported from the documented runs: 0.** This is not a claim that the product is defect-free under all conditions. The non-blocking CI deprecation annotation is recorded as an infrastructure warning, not a product defect.
