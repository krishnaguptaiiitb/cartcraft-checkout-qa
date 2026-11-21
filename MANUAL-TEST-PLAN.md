# CartCraft — Manual Test Plan (Step 4)

## Scope and priority

The release-critical risks are incorrect totals, accepting an invalid checkout, and confirming one order more than once. These are covered by automated tests A01–A05 and supplemented by the mandatory manual checks below.

## Before each manual test

1. Ensure `npm run dev` is running.
2. Open `http://localhost:5173/` in Chromium.
3. Hard refresh or use a new incognito window; confirm the page is at its initial state.
4. Capture screenshots only after the expected condition is visible. Store under `evidence/`.

## M01 — Empty-cart validation (P0)

**Steps**

1. Remove both products from the cart using the UI.
2. Type `Alex Tester` in the required customer-name field.
3. Click `Place order`.
4. Observe the validation message and the name field.

**Expected**

- Checkout must not show an order confirmation or reference.
- A clear empty-cart error must be shown (or the button disabled with visible explanation, as implemented).
- `Alex Tester` remains in the name field; the cart remains empty.

**Actual:** [Enter exactly what happened]

**Status:** [PASS / FAIL]

**Evidence:** `evidence/manual-empty-cart.png`

## M02 — Rapid mouse double-click (P0)

**Steps**

1. Start a fresh order with at least one item.
2. Enter `Alex Tester` in the required name field.
3. Double-click the actual `Place order` button as quickly as practical with the mouse, rather than submitting a script/programmatic event.
4. Observe the confirmation screen, reference(s), and any repeated success notifications.

**Expected**

- Exactly one confirmation is displayed.
- Exactly one order reference is displayed.
- No second order/confirmation is created from the second click.

**Actual:** [Enter exactly what happened]

**Status:** [PASS / FAIL]

**Evidence:** `evidence/manual-double-click.png`

## Reporting notes

- Record the actual browser and time you tested.
- Add genuine issues to the defect report template; do not fabricate a defect.
- If both manual tests pass, report **No defects observed in the tested scenarios** rather than claiming proof the application has no defects.
- `A05` checks repeated synchronous submissions; it is related to but does not replace `M02`'s actual physical double-click.
