# Final CartCraft Submission — Release Checklist

**Status: READY FOR SUBMISSION** — all 16 automated CI checks passed, the production build passed, and both required manual checks were confirmed PASS by the project owner. Manual screenshots were not supplied.

## Submission contents

Submit your **existing GitHub repository** as the authoritative source code. This ZIP is a documentation and evidence overlay, **not a replacement for your current checked-out source or lockfile**.

Your repository should contain:

- `src/` and `public/` (React + TypeScript demo checkout)
- `tests/checkout.spec.ts` and `tests/quality.spec.ts` (16 Playwright tests)
- `package.json`, **committed `package-lock.json`**, TypeScript and Vite config, and Playwright config
- `.github/workflows/quality-gate.yml` (verified CI workflow)
- `README.md`, `TEST-PLAN.md`, `TEST-RESULTS.md`
- `evidence/` (unchanged user-supplied screenshots and CI log transcript)
- `DEFECT-REPORT-TEMPLATE.md` (fill only for a real defect)

## Reproduce locally

From the repository root:

```powershell
npm ci
npx playwright install chromium
npm run build
npm run test:e2e -- --project=chromium --workers=1 --retries=0
npm run test:e2e:report
```

For the demo UI:

```powershell
npm run dev
```

Then open `http://localhost:5173/`.

## Verified checkpoints

- [x] Successful checkout test A01 passed in remote CI.
- [x] Missing required name A02 passed.
- [x] Exact quantity math A03 passed.
- [x] Duplicate synchronous submission A05 passed.
- [x] Remaining automated cases A04, A06–A16 passed.
- [x] Successful CI TypeScript check and production build.
- [x] Successful CI Playwright HTML report upload.
- [x] Evidence assets bundled and indexed.
- [x] **M01 PASS — confirmed by the manual tester.**
- [x] **M02 PASS — confirmed by the manual tester.**
- [x] Manual outcomes recorded accurately in `TEST-RESULTS.md`; original owner confirmation preserved as text in `evidence/MANUAL-TEST-CONFIRMATION.md`.
- [ ] Optional: attach actual manual screenshots *if available*; none were supplied, so the submission does not claim they exist.
- [ ] Commit and push this final documentation/evidence update to GitHub.

## Short evaluator walkthrough

1. From a fresh visit, demonstrate two fixed-price products and initial ₹5,398 total.
2. Change headphones quantity to 2; show ₹6,998 line and ₹8,897 total.
3. Attempt a checkout with blank customer name; show a validation error and preserved cart.
4. Fill customer name; show one confirmation with a client-generated order reference.
5. Show the Playwright HTML report or run `npm run test:e2e`.
6. Open GitHub Actions > CartCraft Quality Gate #1 and show all 16 tests passed with zero retries.
7. Show M01/M02 PASS outcomes in `TEST-RESULTS.md` and the tester confirmation under `evidence/`. Explain that manual screenshots were not provided.

## Evidence provenance and limits

The PNG files are copies of screenshots shared by the project owner. The `ci-chromium-16-passed.txt` file is a structured transcription of the user's pasted CI log, not a fresh execution. The manual PASS statements are a verbatim transcription of owner-reported results, not independently inspected manual browser screenshots. GitHub's original logs and downloadable artifacts are the primary CI evidence. Do not claim cross-browser coverage, real payment processing, global reference uniqueness, or a universally defect-free application.
