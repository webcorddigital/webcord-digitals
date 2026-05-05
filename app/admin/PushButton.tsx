"use client";
import styles from "./admin.module.css";

export default function PushButton() {
  return (
    <button 
      onClick={async (e) => {
        const btn = e.target as HTMLButtonElement;
        const originalText = btn.innerText;
        btn.innerText = "Pushing...";
        btn.disabled = true;
        try {
          const res = await fetch("/api/admin/push", { method: "POST" });
          const data = await res.json();
          if (data.success) {
            alert(data.message || "Successfully pushed to GitHub! Vercel will now deploy your changes.");
          } else {
            alert("Error: " + data.error);
          }
        } catch (err) {
          alert("Failed to trigger push.");
        }
        btn.innerText = originalText;
        btn.disabled = false;
      }} 
      className={styles.btn}
      style={{ background: "#0070f3", color: "white", border: "none" }}
    >
      Push to Live 🚀
    </button>
  );
}
