// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--grey-lt)",
        }}
      >
        404 · Page Not Found
      </div>
      <h1
        style={{
          fontFamily: "var(--font-hero)",
          fontSize: "clamp(4rem, 10vw, 10rem)",
          letterSpacing: "0.04em",
          color: "var(--black)",
          lineHeight: 0.9,
        }}
      >
        LOST?
      </h1>
      <p style={{ color: "var(--grey-mid)", fontSize: "0.93rem" }}>
        This page doesn't exist. Head back home.
      </p>
      <Link href="/" className="btn-primary">
        Back to Home
      </Link>
    </main>
  );
}
