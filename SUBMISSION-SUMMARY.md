# CartCraft — Final Evaluator Submission Summary

**Project:** Mini Checkout and Browser Test Suite (CartCraft)  
**Submission date:** 21 November 2026  
**Release evidence:** 16/16 automated browser scenarios passing in GitHub Actions; 2/2 mandatory manual scenarios PASS as reported by the project owner.

## What to evaluate

1. **Correct price calculation:** Two fixed-price synthetic products, live line totals, exact grand total, add/remove, and quantity changes.
2. **Validation and recovery:** Blank/whitespace-only name blocked; empty cart blocked; entered customer data retained during validation.
3. **Single confirmation:** One order reference generated per accepted checkout; repeat synchronous submissions and rapid physical double-click were checked.
4. **Reproducible automated checks:** Playwright Chromium, isolated tests, UI assertions, all 16 checks passing with zero retries in GitHub Actions.
5. **Evidence and traceability:** Source/tests in the GitHub repository, risk-ranked test plan, case-by-case results, workflow reports, and the owner's manual-test confirmation.

## Summary of actual results

| Evidence stream | Recorded result |
|---|---|
| Chromium automated CI (`A01–A16`) | **16 PASS, 0 failed, 18.8s**, 1 worker, 0 retries |
| Typecheck and Vite production build (GitHub Actions) | **PASS** |
| Manual M01 — Empty cart with required name preserved | **PASS — tester-confirmed** |
| Manual M02 — Rapid physical double-click | **PASS — tester-confirmed** |
| Reported application defects from documented tests | **0** |
| CI workflow annotation | 1 non-blocking Node.js action/runtime deprecation warning |

**Limitations:** Manual screenshot evidence was not supplied. Automated test logs and CI images are preserved under `evidence/`. Only Chromium was evidenced; no Firefox/WebKit or payment/backend integration is claimed. Client-generated order references are demo-only and do not prove global uniqueness.

## Run commands

```powershell
npm ci
npx playwright install chromium
npm run build
npm run test:e2e -- --project=chromium --workers=1 --retries=0
npm run test:e2e:report
```

To view the UI: `npm run dev` and open `http://localhost:5173/`.

**Source submission:** The already-published CartCraft GitHub repository, plus these updated documents and `evidence/` files. The documentation/evidence archive alone is **not** a complete source-code repository.
