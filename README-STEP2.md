# CartCraft — Step 2: Checkout UI and behavior

A purely client-side demo checkout built with React, TypeScript, Vite, Tailwind CSS v4 (Vite integration), and Lucide icons. Product names and prices are synthetic. Nothing is sent to a server.

## Install into your existing Vite React + TypeScript project

1. Open your existing `cartcraft` project in VS Code.
2. Stop the current dev server (`Ctrl+C`).
3. Install packages (in the root of your `cartcraft` project):

   ```powershell
   npm install lucide-react
   npm install -D tailwindcss @tailwindcss/vite
   ```

4. Merge the folders/files from this ZIP into the root of your existing project, **replacing** `src/App.tsx`, `src/main.tsx`, `src/index.css`, and `vite.config.ts`. Add the new `src/components`, `src/data`, `src/lib`, and `public` SVG files. Do not delete `package.json` or `package-lock.json`.
5. Restart:

   ```powershell
   npm run dev
   ```

6. Verify a production build:

   ```powershell
   npm run build
   ```

## Functional smoke checks

- The initial cart contains one Studio Headphones (₹3,499) and one Arc Desk Lamp (₹1,899). Subtotal and total = ₹5,398.
- Increasing headphones quantity to 2 changes the headphones line total to ₹6,998 and subtotal/total to ₹8,897.
- `CRAFT10` gives 10% off the subtotal; shipping remains free.
- Place Order with blank name: inline validation displays, cart is untouched.
- Remove both items, enter a name, click Place Order: empty-cart error displays, name remains entered.
- Add an item, enter a name, place order: one confirmation with a `CC-YYYYMMDD-XXXXXX` reference.
- The confirmation screen has no Place Order button, and the synchronous submission guard also protects against duplicate submit events before a rerender.
- Start a new order resets the cart to empty and clears the form and promotion.

## Engineering notes

- Prices are integer **paise**, avoiding floating-point currency calculation errors.
- There is no localStorage persistence. Each fresh browser page starts from exactly the same seed cart, suitable for independent automated test cases.
- Generated references are demonstration identifiers, not backend records. A browser-only application cannot guarantee server-level exactly-once order fulfillment.
- Product art is stored locally in `public/`; no image CDN or API is needed.
- Playwright automation, evidence, detailed README and final test plan come in later steps.

## Where to copy the files

Extract the ZIP **into** your existing `cartcraft` folder, not into a new project folder. The ZIP contains `src/`, `public/`, `vite.config.ts`, `index.html`, and this README at its root. Keep your original `package.json`, lockfile, and `tsconfig*` files.
