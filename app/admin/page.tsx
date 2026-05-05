"use client";
// app/admin/page.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import { Plan } from "@/types";
import styles from "./admin.module.css";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"plans" | "services" | "settings">("plans");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  
  // Settings Form State
  const [contactInfo, setContactInfo] = useState({
    whatsapp: "",
    whatsappRaw: "",
    email: "",
    website: "",
    location: ""
  });

  useEffect(() => {
    fetch("/api/admin/plans")
      .then((res) => {
        if (!res.ok) throw new Error("Not in development mode or API failed");
        return res.json();
      })
      .then((json) => {
        setData(json);
        if (json.contactInfo) {
          setContactInfo(json.contactInfo);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const updatedData = {
        ...data,
        contactInfo
      };
      
      const res = await fetch("/api/admin/plans", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });
      
      if (!res.ok) throw new Error("Failed to save settings");
      setData(updatedData);
      alert("Settings saved successfully!");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
    setSaving(false);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    
    // Check if it's a PNG
    if (file.type !== "image/png") {
      alert("Please upload a .png file for the logo to ensure transparency.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("filename", "logo.png");
    formData.append("folder", "logo");

    try {
      setSaving(true);
      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      alert("Logo uploaded successfully! Refresh the live site to see changes.");
      // Force reload the image by adding a timestamp
      window.location.reload();
    } catch (err) {
      alert("Failed to upload logo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (error) return <div style={{ padding: "2rem", color: "red" }}>{error}</div>;

  const plans: Plan[] = data?.plans || [];
  const homepageServices = data?.homepageServices || [];
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

  const renderServicesGrid = (title: string, items: any[]) => (
    <div style={{ marginBottom: "3rem" }}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <div className={styles.grid}>
        {items.map((svc) => (
          <div key={svc.id} className={styles.card}>
            <div className={styles.cardMeta}>
              <span>{svc.numberLabel}</span>
            </div>
            <h3 className={styles.cardTitle} dangerouslySetInnerHTML={{ __html: svc.title }} />
            <div className={styles.cardPrice}>{svc.priceLabel}</div>
            
            <div className={styles.cardActions}>
              <Link href={`/admin/edit-service/${svc.id}`} className={styles.btnSecondary}>
                Edit Service
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
        <h1 className={styles.title}>Admin Dashboard</h1>
      </div>

      <div className={styles.tabs}>
        <button 
          className={`${styles.tabBtn} ${activeTab === "plans" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("plans")}
        >
          Plans & Pricing
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === "services" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("services")}
        >
          Homepage Services
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === "settings" ? styles.tabBtnActive : ""}`}
          onClick={() => setActiveTab("settings")}
        >
          General Settings
        </button>
      </div>
      
      {activeTab === "plans" && (
        <div style={{ animation: "fadeIn 0.3s ease-out" }}>
          {renderGrid("Website Packages", websitePlans)}
          {renderGrid("Monthly Services", monthlyPlans)}
          {renderGrid("Video Content", videoPlans)}
        </div>
      )}

      {activeTab === "services" && (
        <div style={{ animation: "fadeIn 0.3s ease-out" }}>
          {renderServicesGrid("Homepage Services Section", homepageServices)}
        </div>
      )}

      {activeTab === "settings" && (
        <div className={styles.editContainer} style={{ animation: "fadeIn 0.3s ease-out" }}>
          <h2 className={styles.sectionTitle} style={{ marginTop: 0 }}>Contact Information</h2>
          
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Display WhatsApp (e.g. +91 88914 19003)</label>
              <input 
                type="text" 
                className={styles.input} 
                value={contactInfo.whatsapp}
                onChange={(e) => setContactInfo({...contactInfo, whatsapp: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Raw WhatsApp (Used for links: 918891419003)</label>
              <input 
                type="text" 
                className={styles.input} 
                value={contactInfo.whatsappRaw}
                onChange={(e) => setContactInfo({...contactInfo, whatsappRaw: e.target.value})}
              />
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email Address</label>
              <input 
                type="text" 
                className={styles.input} 
                value={contactInfo.email}
                onChange={(e) => setContactInfo({...contactInfo, email: e.target.value})}
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Location / Address</label>
              <input 
                type="text" 
                className={styles.input} 
                value={contactInfo.location}
                onChange={(e) => setContactInfo({...contactInfo, location: e.target.value})}
              />
            </div>
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button 
              onClick={handleSaveSettings} 
              disabled={saving} 
              className={`${styles.btn} ${styles.btnAccent}`}
            >
              {saving ? "Saving..." : "Save Settings"}
            </button>
          </div>

          <h2 className={styles.sectionTitle}>Website Logo</h2>
          <div className={styles.formGroup}>
            <p style={{ color: "#aaa", marginBottom: "1rem" }}>
              Upload a .png image to replace the text logo. It will be displayed at the top left of the site.
            </p>
            <div className={styles.imageUpload}>
              <label className={styles.uploadLabel}>
                Upload Logo (.png)
                <input type="file" accept="image/png" onChange={handleLogoUpload} />
              </label>
              <div style={{ marginTop: "2rem" }}>
                <p style={{ fontSize: "12px", color: "#666", marginBottom: "0.5rem" }}>Current Logo Preview:</p>
                <img 
                  src={`/images/logo/logo.png?v=${new Date().getTime()}`} 
                  alt="Logo preview" 
                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  style={{ maxHeight: "60px", background: "rgba(255,255,255,0.05)", padding: "10px", borderRadius: "8px" }} 
                />
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
