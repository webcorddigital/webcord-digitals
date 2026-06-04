"use client";
// components/Navbar.tsx
import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <nav>
      <Link href="/" className="nav-logo" onClick={closeMenu} style={{ display: "flex", alignItems: "center" }}>
        {!logoError ? (
          <img 
            src="/images/logo/logo.png" 
            alt="Webcord Logo" 
            onError={() => setLogoError(true)}
            style={{ height: "30px", width: "auto" }}
          />
        ) : (
          <><span className="nav-dot"></span>WEBCORD</>
        )}
      </Link>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`} id="navLinks">
        <li><Link href="/works" onClick={closeMenu}>Works</Link></li>
        <li><Link href="/#services" onClick={closeMenu}>Services</Link></li>
        <li><Link href="/#pricing" onClick={closeMenu}>Pricing</Link></li>
        <li><Link href="/#results" onClick={closeMenu}>Results</Link></li>
        <li><Link href="/#why" onClick={closeMenu}>About</Link></li>
        <li>
          <div className={styles.actions}>
            <Link
              href="/cart"
              className="nav-cta"
              onClick={closeMenu}
              style={{ display: "flex", alignItems: "center", gap: "8px", position: "relative" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              Cart
              {totalItems > 0 && (
                <span className={styles.cartBadge}>{totalItems}</span>
              )}
            </Link>
          </div>
        </li>
      </ul>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span><span></span><span></span>
      </div>
    </nav>
  );
}
