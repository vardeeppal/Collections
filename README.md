# Priya Collections — Women's Garments E-Commerce

A full-stack, responsive luxury e-commerce application for Priya Collections women's garments crafted with React 19, TypeScript, Tailwind CSS, Express, and Stripe.

---

## Architecture Overview

- **Frontend**: React 19, Tailwind CSS v4, Lucide icons, responsive luxury aesthetic (warm travertine/sand neutrals, Cormorant Garamond editorial display typography, Plus Jakarta Sans body, tabular numerals).
- **Backend**: Node.js & Express server with integrated Vite middleware on port 3000.
- **Database**: Persistent typed JSON database (`/data/store.json`) with strict schema, atomic updates, and pre-seeded catalog of 14 women's garments.
- **Payments**: Stripe Checkout and raw-body webhook listener (`/api/webhook/stripe`), plus an in-app test simulator for Stripe card `4242 4242 4242 4242` that verifies prices on the server and decrements stock only after payment confirmation.
- **Authentication**: Salted PBKDF2 cryptographic password hashing, user registration/login, session persistence, saved addresses, and a password reset flow with token verification.
- **Order Status Tracking**: Dedicated customer tracking portal (`/track` or via navigation & footer) allowing customers to enter their Order Reference and email to view real-time atelier fulfillment progress, courier dispatch status, tracking codes, destination address, and itemized receipts.
- **Administration**: Manager dashboard protected by passkey with inventory editor, instant sold-out toggle, order status management, promotional discount engine, and sales KPIs.

---

## Quickstart

Run the full-stack app with a single command:

```bash
npm run dev
```

The application runs on `http://localhost:3000`.

---

## Environment Variables Configuration

Copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `STRIPE_SECRET_KEY` | Stripe Secret Key for test mode | `sk_test_...` |
| `VITE_STRIPE_PUBLISHABLE_KEY` | Stripe Publishable Key | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret from Stripe CLI or dashboard | `whsec_...` |
| `EMAIL_API_KEY` | Transactional email provider key (e.g. Resend) | `re_placeholder_key` |
| `ADMIN_SECRET_KEY` | Administrative console passkey | `atelier_admin_2026` |
| `APP_URL` | Base application URL | `http://localhost:3000` |

> **Note on Simulator Mode**: When `STRIPE_SECRET_KEY` is not set or set to a placeholder, the store operates in interactive Stripe Test Simulator mode. You can test card payments, stock decrementing, and order confirmation immediately with test card `4242 4242 4242 4242`!

---

## Setting Up Stripe Webhook Locally (Stripe CLI)

To test live webhooks with the Stripe CLI:

1. Install the [Stripe CLI](https://stripe.com/docs/stripe-cli):
   ```bash
   brew install stripe/stripe-cli/stripe # macOS
   # or scoop install stripe # Windows
   ```
2. Log in to your Stripe account:
   ```bash
   stripe login
   ```
3. Forward webhook events to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```
4. Copy the webhook signing secret (starts with `whsec_...`) printed in the terminal into your `.env`:
   ```bash
   STRIPE_WEBHOOK_SECRET="whsec_1234567890abcdef..."
   ```
5. Trigger a test payment event:
   ```bash
   stripe trigger checkout.session.completed
   ```

---

## Verification & Test Checklist

Follow these steps to verify end-to-end purchasing and inventory behavior:

1. **Browse & Select**:
   - Open `http://localhost:3000`.
   - Click on **"The Camille Silk Slip Dress"** (Price: $285).
   - In the Product Detail view, select **Size S** (Note starting stock: 8 units).
   - Click **"Add to Bag"**.

2. **Apply Promotional Code**:
   - In the Shopping Bag drawer, enter discount code `WELCOME10` and click **Apply** (10% off).
   - Click **"Proceed to Checkout"**.

3. **Enter Shipping Address & Select Delivery**:
   - Provide customer details (e.g. Eleanor Vance, San Francisco, CA 94108).
   - Notice the regional sales tax automatically calculates based on the California tax table (9.25%).
   - Select **Atelier Standard Delivery** (Complimentary on orders over $150).

4. **Process Payment with Test Card**:
   - On the payment step, verify or click **"Auto-fill Test Card 4242"**:
     - Card Number: `4242 4242 4242 4242`
     - Expiry: `12/28`
     - CVC: `123`
   - Click **"Pay"**.

5. **Verify Order Confirmation & Stock Decrement**:
   - Confirm the **Order Confirmation Screen** displays order number (e.g., `#AUR-82914`) and confirms the email receipt was dispatched.
   - Click the **Shield Icon** in the top navigation to open the **Admin Console** (Passkey: `atelier_admin_2026`).
   - In the **Customer Orders** tab, verify the new order is present with status **"Paid"**.
   - In the **Garments & Stock** tab, verify **The Camille Silk Slip Dress** stock in Size S has decremented by 1 (from 8 to 7).
