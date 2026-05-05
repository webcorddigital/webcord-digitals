"use client";
// components/PricingSection.tsx
import { useState, useEffect } from "react";
import Link from "next/link";
import { getPlansByCategory } from "@/data/plans";
import { Plan } from "@/types";

type Tab = "website" | "monthly" | "video";

export default function PricingSection() {
  const [tab, setTab] = useState<Tab>("website");

  const plans: Plan[] = getPlansByCategory(tab);

  // Trigger scroll reveal for newly rendered cards when tab changes
  useEffect(() => {
    const els = document.querySelectorAll(`#tab-${tab} .reveal`);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    els.forEach((el) => {
      el.classList.remove("visible"); // reset
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, [tab]);

  return (
    <section id="pricing">
      <div className="pricing-top reveal">
        <div>
          <div className="eyebrow">Transparent Pricing</div>
          <h2>HONEST<br/>PRICES.</h2>
        </div>
        <div className="pricing-note">
          20% annual discount on all packages.<br />
          EMI available on orders above ₹10,000.<br />
          No hidden fees — quoted price is final price.
        </div>
      </div>

      {/* Tabs */}
      <div className="pricing-tabs reveal">
        {(["website", "monthly", "video"] as Tab[]).map((t) => (
          <button
            key={t}
            className={`tab-btn ${tab === t ? "active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "website" && "Websites"}
            {t === "monthly" && "Monthly Services"}
            {t === "video" && "Video Content"}
          </button>
        ))}
      </div>

      {/* Cards Panel */}
      <div className="pricing-panel active" id={`tab-${tab}`}>
        {plans.length === 0 ? (
          <p style={{ color: "var(--gray)", padding: "40px 0" }}>No plans found.</p>
        ) : (
          plans.map((plan, i) => (
            <PlanCard key={plan.id} plan={plan} index={i + 1} />
          ))
        )}
      </div>
    </section>
  );
}

function PlanCard({ plan, index }: { plan: Plan; index: number }) {
  const delayClass = `reveal-d${Math.min(index, 5)}`;

  return (
    <Link
      href={`/plans/${plan.slug}`}
      style={{ textDecoration: "none" }}
      className={`price-card ${plan.featured ? "featured" : ""} reveal ${delayClass}`}
    >
      <span className="price-badge">{plan.badge || (plan.featured ? "Most Popular" : "Standard")}</span>
      <div className="price-name">{plan.name}</div>
      <div className="price-amt">{plan.priceLabel}</div>
      <div className="price-delivery">{plan.delivery}</div>
      <div className="price-divider" />
      <ul className="price-features">
        {plan.features.map((f) => (
          <li key={f}>{f}</li>
        ))}
      </ul>
      <div className="price-cta">View Details</div>
    </Link>
  );
}
