"use client";
// app/plans/[slug]/PlanDetailClient.tsx
import { useState } from "react";
import Link from "next/link";
import { Plan } from "@/types";
import AddToCartButton from "@/components/AddToCartButton";
import styles from "./PlanDetail.module.css";

interface Review {
  name: string;
  business: string;
  rating: number;
  text: string;
  date: string;
}

export default function PlanDetailClient({
  plan,
  reviews,
}: {
  plan: Plan;
  reviews: Review[];
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <main className={styles.main}>
      {/* ── BACK NAV ── */}
      <div className={styles.backRow}>
        <Link href="/#pricing" className={styles.backLink}>
          ← Back to Plans
        </Link>
      </div>

      <div className={styles.layout}>
        {/* ════ LEFT COLUMN ════ */}
        <div className={styles.left}>
          {/* Header */}
          <div className={styles.planHeader}>
            <div className={styles.planMeta}>
              <span className={styles.planBadge}>{plan.badge}</span>
              <span className={styles.planCategory}>{plan.category}</span>
            </div>
            <h1 className={styles.planTitle}>{plan.name}</h1>

            {/* Rating */}
            <div className={styles.ratingRow}>
              <span className={styles.stars}>
                {"★".repeat(Math.floor(plan.reviewAvg))}
                {plan.reviewAvg % 1 >= 0.5 ? "½" : ""}
              </span>
              <span className={styles.ratingNum}>{plan.reviewAvg.toFixed(1)}</span>
              <span className={styles.reviewCount}>
                ({plan.reviewCount} reviews)
              </span>
            </div>

            <p className={styles.planDescription}>{plan.description}</p>
          </div>

          {/* What You Get */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>WHAT YOU GET</h2>
            <ul className={styles.getList}>
              {plan.whatYouGet.map((item) => (
                <li key={item} className={styles.getItem}>
                  <span className={styles.getCheck}>✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Ideal For */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>IDEAL FOR</h2>
            <div className={styles.idealGrid}>
              {plan.idealFor.map((item) => (
                <div key={item} className={styles.idealItem}>
                  <span className={styles.idealIcon}>→</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>FREQUENTLY ASKED</h2>
            <div className={styles.faqList}>
              {plan.faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`${styles.faqItem} ${openFaq === i ? styles.faqOpen : ""}`}
                >
                  <button
                    className={styles.faqQ}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.question}</span>
                    <span className={styles.faqToggle}>{openFaq === i ? "−" : "+"}</span>
                  </button>
                  {openFaq === i && (
                    <p className={styles.faqA}>{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div className={styles.block}>
            <h2 className={styles.blockTitle}>CLIENT REVIEWS</h2>
            <div className={styles.reviews}>
              {reviews.map((r, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewTop}>
                    <div>
                      <div className={styles.reviewName}>{r.name}</div>
                      <div className={styles.reviewBusiness}>{r.business}</div>
                    </div>
                    <div className={styles.reviewRight}>
                      <div className={styles.reviewStars}>
                        {"★".repeat(r.rating)}
                      </div>
                      <div className={styles.reviewDate}>{r.date}</div>
                    </div>
                  </div>
                  <p className={styles.reviewText}>{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ════ RIGHT COLUMN — STICKY CART ════ */}
        <div className={styles.right}>
          <div className={styles.cartSticky}>
            <div className={styles.cartCard}>
              <div className={styles.cartPriceRow}>
                <div className={styles.cartPrice}>{plan.priceLabel}</div>
                <div className={styles.cartDelivery}>{plan.delivery}</div>
              </div>

              <div className={styles.cartDivider} />

              <div className={styles.cartFeatures}>
                {plan.features.map((f) => (
                  <div key={f} className={styles.cartFeature}>
                    <span>✓</span> {f}
                  </div>
                ))}
              </div>

              <div className={styles.cartDivider} />

              <AddToCartButton plan={plan} fullWidth />

<Link
  href={`https://wa.me/918891419003?text=Hi%20Webcord%2C%20I'm%20interested%20in%20the%20${encodeURIComponent(plan.name)}%20plan%20(${encodeURIComponent(plan.priceLabel)}).%20Can%20you%20tell%20me%20more%3F`}
  target="_blank"
  rel="noopener noreferrer"
  className={styles.waBtn}
>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Ask on WhatsApp
              </Link>

              <p className={styles.cartNote}>
                Questions? We reply within a few hours via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
