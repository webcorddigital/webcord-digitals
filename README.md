# Webcord — Next.js 14 Website

## Stack
- **Next.js 14** (App Router)
- **TypeScript**
- **CSS Modules** (zero Tailwind, zero external UI libs)
- **State**: React Context (Cart + Auth)
- **Database/Auth**: Placeholder — ready for Convex

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
app/
  layout.tsx          — Root layout with providers
  page.tsx            — Homepage (Hero, Services, Pricing, Results, Process, Contact)
  page.module.css     — Homepage styles
  globals.css         — Design system / CSS variables
  not-found.tsx       — 404 page

  plans/[slug]/
    page.tsx          — Plan detail server component (generateStaticParams)
    PlanDetailClient.tsx — Interactive plan detail page
    PlanDetail.module.css

  cart/
    page.tsx          — Full cart (3 steps: Cart → Details → WhatsApp Connect)
    cart.module.css

components/
  Navbar.tsx/.module.css       — Sticky nav with cart badge
  PricingSection.tsx/.module.css — Tabbed pricing (website/monthly/video)
  AddToCartButton.tsx          — Smart button (triggers AuthModal if not signed in)
  AuthModal.tsx/.module.css    — Sign in / Sign up modal

lib/
  plans.ts            — All plan data, reviews, contact info (replace with Convex queries)
  CartContext.tsx     — Cart state (localStorage persisted)
  AuthContext.tsx     — Auth state (MOCK — replace with Convex Auth)

types/
  index.ts            — TypeScript interfaces
```

---

## User Flow

1. **Homepage** → Browse plans in tabbed pricing section
2. **Plan Detail** (`/plans/[slug]`) → Full details, reviews, FAQs, sticky Add to Cart
3. **Add to Cart** → If not signed in, AuthModal appears → User creates account → Continues
4. **Cart** (`/cart`) → View/edit items with quantity controls
5. **Details step** → Fill Name, Business Name, Phone, City
6. **Connect step** → Pre-written WhatsApp message opens in one tap → Admin receives full order info

---

## Convex Integration (Next Steps)

### 1. Replace `lib/plans.ts` static data
```typescript
// Instead of PLANS array, use:
const plans = useQuery(api.plans.list);
const plan = useQuery(api.plans.getBySlug, { slug });
```

### 2. Replace AuthContext with Convex Auth
```typescript
// lib/AuthContext.tsx → replace mock signIn/signUp with:
import { useAuthActions } from "@convex-dev/auth/react";
const { signIn } = useAuthActions();
```

### 3. Save orders to Convex on WhatsApp connect step
```typescript
// In cart/page.tsx handleWhatsApp():
await mutation(api.orders.create, {
  items: items.map(i => ({ planId: i.plan.id, quantity: i.quantity })),
  details: form,
  userId: user.id,
  status: "pending",
});
```

### 4. Admin panel (future)
- Plans CRUD → `api.plans.*`
- Orders view → `api.orders.*`
- Contact details → `api.settings.*`

---

## WhatsApp Admin Number
Update `CONTACT_INFO.whatsappRaw` in `lib/plans.ts`:
```typescript
export const CONTACT_INFO = {
  whatsapp: "+91 XXXXX XXXXX",
  whatsappRaw: "91XXXXXXXXXX",  // ← update this
  ...
};
```

---

## Design System
All design tokens are in `app/globals.css` as CSS variables:
- `--bg`, `--black`, `--off-white`, `--grey-mid` — main palette
- `--font-hero` (Bebas Neue), `--font-body` (DM Sans), `--font-mono` (Space Mono)
- `--r-lg`, `--r-md`, `--r-sm` — border radii

Zero external CSS dependencies. Nothing OS / Teenage Engineering aesthetic preserved exactly from the prototype.
