// app/admin/layout.tsx
import { ReactNode } from "react";
import Link from "next/link";
import styles from "./admin.module.css";

import PushButton from "./PushButton";

export const metadata = {
  title: "Admin Dashboard — Webcord",
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  // Hard security check: Admin panel only works locally
  if (process.env.NODE_ENV !== "development") {
    return (
      <div className={styles.adminLayout}>
        <div className={styles.lockedError}>
          <h1>Access Denied</h1>
          <p>The admin dashboard is only accessible in local development mode.</p>
          <Link href="/" className={styles.btn}>Return to Website</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      <nav className={styles.adminNav}>
        <Link href="/admin" className={styles.adminLogo}>
          WEBCORD <span className={styles.adminBadge}>Local Admin</span>
        </Link>
        <div style={{ display: "flex", gap: "1rem" }}>
          <PushButton />
          <Link href="/" target="_blank" className={styles.btnSecondary}>
            View Live Site ↗
          </Link>
        </div>
      </nav>
      <main className={styles.adminMain}>{children}</main>
    </div>
  );
}
