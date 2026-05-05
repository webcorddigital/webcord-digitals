"use client";
// app/admin/edit-service/[id]/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { HomepageService } from "@/types";
import styles from "../../admin.module.css";

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [fullData, setFullData] = useState<any>(null);
  const [service, setService] = useState<HomepageService | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/plans")
      .then((res) => res.json())
      .then((data) => {
        setFullData(data);
        const found = data.homepageServices?.find((s: HomepageService) => s.id === params.id);
        setService(found || null);
        setLoading(false);
      });
  }, [params.id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updatedServices = fullData.homepageServices.map((s: HomepageService) =>
      s.id === service?.id ? service : s
    );

    const newData = { ...fullData, homepageServices: updatedServices };

    try {
      const res = await fetch("/api/admin/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData),
      });
      if (res.ok) {
        alert("Saved successfully!");
        router.push("/admin");
      } else {
        alert("Error saving service");
      }
    } catch (err) {
      alert("Error saving service");
    }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!service) return <div style={{ padding: "2rem" }}>Service not found.</div>;

  return (
    <div>
      <div className={styles.headerRow}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin" className={styles.btnSecondary}>← Back</Link>
          <h1 className={styles.title}>Edit Service: {service.numberLabel}</h1>
        </div>
        <button onClick={handleSave} disabled={saving} className={`${styles.btn} ${styles.btnAccent}`}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className={styles.editContainer}>
        <form id="editForm" onSubmit={handleSave}>
          
          <h2 className={styles.sectionTitle}>Basic Info</h2>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Number/Label (e.g. "01 — WEBSITE")</label>
              <input
                type="text"
                className={styles.input}
                value={service.numberLabel}
                onChange={(e) => setService({ ...service, numberLabel: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Title (Use &lt;br/&gt; for line breaks)</label>
              <input
                type="text"
                className={styles.input}
                value={service.title}
                onChange={(e) => setService({ ...service, title: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Price Label (e.g. From ₹7,000)</label>
              <input
                type="text"
                className={styles.input}
                value={service.priceLabel}
                onChange={(e) => setService({ ...service, priceLabel: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Delivery Label (e.g. 5–10 DAY DELIVERY)</label>
              <input
                type="text"
                className={styles.input}
                value={service.deliveryLabel}
                onChange={(e) => setService({ ...service, deliveryLabel: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={service.description}
              onChange={(e) => setService({ ...service, description: e.target.value })}
            />
          </div>

          <h2 className={styles.sectionTitle}>Features List</h2>
          {service.features.map((feature, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                type="text"
                className={styles.input}
                value={feature}
                onChange={(e) => {
                  const newArr = [...service.features];
                  newArr[i] = e.target.value;
                  setService({ ...service, features: newArr });
                }}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => setService({ ...service, features: service.features.filter((_, idx) => idx !== i) })}
              >X</button>
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={() => setService({ ...service, features: [...service.features, ""] })}>
            + Add Feature
          </button>

        </form>
      </div>
    </div>
  );
}
