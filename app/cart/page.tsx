"use client";
// app/cart/page.tsx
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/lib/CartContext";
import { CONTACT_INFO } from "@/lib/plans";
import { CheckoutDetails } from "@/types";
import styles from "./cart.module.css";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, totalPrice, setCheckoutDetails, clearCart } = useCart();
  const router = useRouter();

  const [step, setStep] = useState<"cart" | "details" | "connect">("cart");
  const [form, setForm] = useState<CheckoutDetails>({
    name: "",
    businessName: "",
    phone: "",
    city: "",
  });
  const [formErrors, setFormErrors] = useState<Partial<CheckoutDetails>>({});

  /* ── Step 1 → 2: proceed to details (no auth needed) ── */
  const handleProceedToDetails = () => {
    setStep("details");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Step 2 → 3: validate + submit details ── */
  const handleSubmitDetails = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Partial<CheckoutDetails> = {};
    if (!form.name.trim()) errors.name = "Required";
    if (!form.businessName.trim()) errors.businessName = "Required";
    if (!form.phone.trim() || form.phone.trim().length < 10)
      errors.phone = "Enter a valid phone number";
    if (!form.city.trim()) errors.city = "Required";
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }

    setCheckoutDetails(form);
    setStep("connect");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ── Build WhatsApp message ── */
  const buildWhatsAppMessage = (): string => {
    const planList = items
      .map((i) => `• ${i.plan.name} (${i.plan.priceLabel}) × ${i.quantity}`)
      .join("\n");

    const msg = `Hi Webcord!

I'd like to proceed with the following plan(s):

${planList}

Total: ₹${totalPrice.toLocaleString("en-IN")}

My Details:
Name: ${form.name}
Business: ${form.businessName}
Phone: ${form.phone}
City: ${form.city}

Please let me know the next steps. Thank you!`;

    return encodeURIComponent(msg);
  };

  const handleWhatsApp = () => {
    const url = `https://wa.me/${CONTACT_INFO.whatsappRaw}?text=${buildWhatsAppMessage()}`;
    window.open(url, "_blank");
  };

  /* ── Empty cart ── */
  if (items.length === 0 && step !== "connect") {
    return (
      <>
        <Navbar />
        <main className={styles.main}>
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>◈</div>
            <h2 className={styles.emptyTitle}>Your cart is empty</h2>
            <p className={styles.emptyDesc}>
              Browse our plans and add something you like.
            </p>
            <Link href="/#pricing" className="btn-primary">
              Browse Plans
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* ── STEP INDICATOR ── */}
        <div className={styles.steps}>
          {["Cart", "Your Details", "Connect"].map((s, i) => {
            const stepKeys = ["cart", "details", "connect"];
            const isActive = stepKeys[i] === step;
            const isDone =
              (step === "details" && i === 0) ||
              (step === "connect" && i <= 1);
            return (
              <div
                key={s}
                className={`${styles.step} ${isActive ? styles.stepActive : ""} ${isDone ? styles.stepDone : ""}`}
              >
                <span className={styles.stepNum}>{isDone ? "✓" : i + 1}</span>
                <span className={styles.stepLabel}>{s}</span>
              </div>
            );
          })}
        </div>

        {/* ════════════════ STEP 1: CART ════════════════ */}
        {step === "cart" && (
          <div className={styles.layout}>
            <div className={styles.cartLeft}>
              <h1 className={styles.pageTitle}>YOUR CART</h1>

              <div className={styles.itemList}>
                {items.map((item) => (
                  <div key={item.plan.id} className={styles.cartItem}>
                    <div className={styles.itemInfo}>
                      <div className={styles.itemBadge}>{item.plan.badge}</div>
                      <div className={styles.itemName}>{item.plan.name}</div>
                      <div className={styles.itemDelivery}>{item.plan.delivery}</div>
                    </div>

                    <div className={styles.itemRight}>
                      <div className={styles.qtyControl}>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.plan.id, item.quantity - 1)}
                        >−</button>
                        <span className={styles.qtyNum}>{item.quantity}</span>
                        <button
                          className={styles.qtyBtn}
                          onClick={() => updateQuantity(item.plan.id, item.quantity + 1)}
                        >+</button>
                      </div>
                      <div className={styles.itemPrice}>
                        ₹{(item.plan.price * item.quantity).toLocaleString("en-IN")}
                      </div>
                      <button
                        className={styles.removeBtn}
                        onClick={() => removeFromCart(item.plan.id)}
                        aria-label="Remove"
                      >✕</button>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/#pricing" className={styles.addMoreLink}>
                + Add another plan
              </Link>
            </div>

            <div className={styles.cartRight}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryTitle}>ORDER SUMMARY</div>

                {items.map((item) => (
                  <div key={item.plan.id} className={styles.summaryLine}>
                    <span>{item.plan.name} × {item.quantity}</span>
                    <span>₹{(item.plan.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}

                <div className={styles.summaryDivider} />

                <div className={styles.summaryTotal}>
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>

                <p className={styles.summaryNote}>
                  This is not a payment. You'll connect with us on WhatsApp to finalise everything.
                </p>

                <button
                  className="btn-primary"
                  style={{ width: "100%", justifyContent: "center" }}
                  onClick={handleProceedToDetails}
                >
                  Continue to Details →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ STEP 2: DETAILS ════════════════ */}
        {step === "details" && (
          <div className={styles.formLayout}>
            <div className={styles.formLeft}>
              <h1 className={styles.pageTitle}>YOUR DETAILS</h1>
              <p className={styles.formIntro}>
                Tell us a bit about yourself and your business. This helps us understand your project before we connect.
              </p>

              <form onSubmit={handleSubmitDetails} className={styles.detailsForm} noValidate>
                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input
                      className={`form-input ${formErrors.name ? styles.inputError : ""}`}
                      type="text"
                      placeholder="Harpreet Singh"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {formErrors.name && <span className={styles.fieldError}>{formErrors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Business / Team Name *</label>
                    <input
                      className={`form-input ${formErrors.businessName ? styles.inputError : ""}`}
                      type="text"
                      placeholder="My Business Name"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    />
                    {formErrors.businessName && <span className={styles.fieldError}>{formErrors.businessName}</span>}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className="form-group">
                    <label className="form-label">WhatsApp / Phone *</label>
                    <input
                      className={`form-input ${formErrors.phone ? styles.inputError : ""}`}
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    />
                    {formErrors.phone && <span className={styles.fieldError}>{formErrors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      className={`form-input ${formErrors.city ? styles.inputError : ""}`}
                      type="text"
                      placeholder="Phagwara, Punjab"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                    />
                    {formErrors.city && <span className={styles.fieldError}>{formErrors.city}</span>}
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setStep("cart")}
                  >
                    ← Back
                  </button>
                  <button type="submit" className="btn-primary">
                    Review & Connect →
                  </button>
                </div>
              </form>
            </div>

            {/* Mini order recap */}
            <div className={styles.formRight}>
              <div className={styles.recapCard}>
                <div className={styles.recapTitle}>YOUR ORDER</div>
                {items.map((item) => (
                  <div key={item.plan.id} className={styles.recapItem}>
                    <span className={styles.recapName}>{item.plan.name}</span>
                    <span className={styles.recapPrice}>₹{(item.plan.price * item.quantity).toLocaleString("en-IN")}</span>
                  </div>
                ))}
                <div className={styles.recapTotal}>
                  <span>Total</span>
                  <span>₹{totalPrice.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════ STEP 3: CONNECT ════════════════ */}
        {step === "connect" && (
          <div className={styles.connectLayout}>
            <div className={styles.connectCard}>
              <div className={styles.connectIcon}>✓</div>
              <h1 className={styles.connectTitle}>ALMOST DONE</h1>
              <p className={styles.connectDesc}>
                Your order is ready. Hit the button below to open WhatsApp — your message is pre-written with all your details. Just tap Send.
              </p>

              {/* Message preview */}
              <div className={styles.messagePreview}>
                <div className={styles.messagePreviewTitle}>
                  <span className={styles.mpTitleEye}>Preview Message</span>
                </div>
                <pre className={styles.messageText}>
{`Hi Webcord!

I'd like to proceed with:

${items.map((i) => `• ${i.plan.name} (${i.plan.priceLabel}) × ${i.quantity}`).join("\n")}

Total: ₹${totalPrice.toLocaleString("en-IN")}

My Details:
Name: ${form.name}
Business: ${form.businessName}
Phone: ${form.phone}
City: ${form.city}`}
                </pre>
              </div>

              <button
                className={styles.connectBtn}
                onClick={handleWhatsApp}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Send on WhatsApp
              </button>

              <p className={styles.connectNote}>
                After sending, our team will reply within a few hours to confirm your order and discuss next steps.
              </p>

              <button
                className={styles.startOverBtn}
                onClick={() => { clearCart(); router.push("/"); }}
              >
                Back to Home
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
