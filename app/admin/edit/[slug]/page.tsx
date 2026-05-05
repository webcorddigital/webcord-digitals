"use client";
// app/admin/edit/[slug]/page.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plan } from "@/types";
import styles from "../../admin.module.css";

export default function EditPlanPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [fullData, setFullData] = useState<any>(null);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/plans")
      .then((res) => res.json())
      .then((data) => {
        setFullData(data);
        const found = data.plans.find((p: Plan) => p.slug === params.slug);
        setPlan(found || null);
        setLoading(false);
      });
  }, [params.slug]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const updatedPlans = fullData.plans.map((p: Plan) =>
      p.id === plan?.id ? plan : p
    );

    const newData = { ...fullData, plans: updatedPlans };

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
        alert("Error saving plan");
      }
    } catch (err) {
      alert("Error saving plan");
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "plans"); // Hardcoded folder for plan images
    // Enforce matching slug name for consistency
    formData.append("filename", `${plan?.slug}.jpg`);

    try {
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        alert("Image uploaded successfully! It will appear on the site.");
      } else {
        alert("Failed to upload image.");
      }
    } catch (err) {
      alert("Failed to upload image.");
    }
    setUploading(false);
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!plan) return <div style={{ padding: "2rem" }}>Plan not found.</div>;

  return (
    <div>
      <div className={styles.headerRow}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/admin" className={styles.btnSecondary}>← Back</Link>
          <h1 className={styles.title}>Edit {plan.name}</h1>
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
              <label className={styles.label}>Name</label>
              <input
                type="text"
                className={styles.input}
                value={plan.name}
                onChange={(e) => setPlan({ ...plan, name: e.target.value })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Badge (e.g. Most Popular)</label>
              <input
                type="text"
                className={styles.input}
                value={plan.badge}
                onChange={(e) => setPlan({ ...plan, badge: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Price (Number, used for math)</label>
              <input
                type="number"
                className={styles.input}
                value={plan.price}
                onChange={(e) => setPlan({ ...plan, price: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Price Label (e.g. ₹14,000)</label>
              <input
                type="text"
                className={styles.input}
                value={plan.priceLabel}
                onChange={(e) => setPlan({ ...plan, priceLabel: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Delivery Timeline</label>
            <input
              type="text"
              className={styles.input}
              value={plan.delivery}
              onChange={(e) => setPlan({ ...plan, delivery: e.target.value })}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Description</label>
            <textarea
              className={styles.textarea}
              value={plan.description}
              onChange={(e) => setPlan({ ...plan, description: e.target.value })}
            />
          </div>

          <h2 className={styles.sectionTitle}>Image</h2>
          <p style={{ color: "#aaa", fontSize: 14 }}>
            Upload a new image for this plan. It will automatically overwrite the existing one at <code>/images/plans/{plan.slug}.jpg</code>. Use JPG format.
          </p>
          <div className={styles.imageUpload}>
            {uploading ? (
              <div>Uploading...</div>
            ) : (
              <>
                <input type="file" id="imageUpload" accept="image/jpeg, image/jpg" onChange={handleImageUpload} />
                <label htmlFor="imageUpload" className={styles.uploadLabel}>
                  Choose New Image
                </label>
              </>
            )}
          </div>

          <h2 className={styles.sectionTitle}>Features List</h2>
          {plan.features.map((feature, i) => (
            <div key={i} className={styles.arrayItem}>
              <input
                type="text"
                className={styles.input}
                value={feature}
                onChange={(e) => {
                  const newArr = [...plan.features];
                  newArr[i] = e.target.value;
                  setPlan({ ...plan, features: newArr });
                }}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => setPlan({ ...plan, features: plan.features.filter((_, idx) => idx !== i) })}
              >X</button>
            </div>
          ))}
          <button type="button" className={styles.addBtn} onClick={() => setPlan({ ...plan, features: [...plan.features, ""] })}>
            + Add Feature
          </button>

        </form>
      </div>
    </div>
  );
}
