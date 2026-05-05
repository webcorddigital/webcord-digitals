"use client";
// app/admin/page.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plan } from "@/types";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/plans")
      .then((res) => {
        if (!res.ok) throw new Error("Not in development mode or API failed");
        return res.json();
      })
      .then((data) => {
        setPlans(data.plans || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  const websitePlans = plans.filter((p) => p.category === "website");
  const monthlyPlans = plans.filter((p) => p.category === "monthly");
  const videoPlans = plans.filter((p) => p.category === "video");

  const renderGrid = (title: string, items: Plan[]) => (
    <div style={{ marginBottom: "3rem" }}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>
        {items.map((plan) => (
          <div key={plan.id} className={styles.card}>
            <div className={styles.cardMeta}>
              <span>{plan.id}</span>
              <span>{plan.badge || "Standard"}</span>
            </div>
            <h3 className={styles.cardTitle}>{plan.name}</h3>
            <div className={styles.cardPrice}>{plan.priceLabel}</div>
            
            <div className={styles.cardActions}>
              <Link href={`/admin/edit/${plan.slug}`} className={styles.btnSecondary}>
                Edit Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Manage Plans</h1>
      </div>
      
      {renderGrid("Website Packages", websitePlans)}
      {renderGrid("Monthly Services", monthlyPlans)}
      {renderGrid("Video Content", videoPlans)}
    </div>
  );
}
