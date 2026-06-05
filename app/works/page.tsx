"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Navbar from "@/components/Navbar";
import { ExternalLink, Star, Send } from "lucide-react";
import { useState } from "react";
import styles from "./works.module.css";

export default function WorksPage() {
  const works = useQuery(api.works.getWorks);
  const approvedReviews = useQuery(api.reviews.getApprovedReviews);

  return (
    <>
      <Navbar />
      <main className={styles.main}>
        {/* Hero */}
        <section className={styles.hero}>
          <div className="eyebrow">Portfolio</div>
          <h1 className={styles.heading}>
            OUR<br />WORKS.
          </h1>
          <p className={styles.sub}>
            Real websites. Real businesses. Real Punjab.
          </p>
        </section>

        {/* Works Grid */}
        <section className={styles.section}>
          {works === undefined ? (
            <div className={styles.loading}>
              <div className={styles.spinner} />
              <p>Loading works...</p>
            </div>
          ) : works.length === 0 ? (
            <div className={styles.empty}>
              <p>Portfolio coming soon. Check back shortly.</p>
            </div>
          ) : (
            <div className={styles.grid}>
              {works?.map((work: any) => (
                <WorkCard key={work._id} work={work} />
              ))}
            </div>
          )}
        </section>

        {/* Reviews Section */}
        <section className={styles.reviewSection}>
          <div className="eyebrow">Client Reviews</div>
          <h2 className={styles.h2}>WHAT CLIENTS<br />SAY.</h2>

          {approvedReviews && approvedReviews.length > 0 && (
            <div className={styles.reviewGrid}>
              {approvedReviews?.map((r: any) => (
                <div key={r._id} className={styles.reviewCard}>
                  <div className={styles.stars}>
                    {Array.from({ length: r.rating }).map((_: any, i: number) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className={styles.reviewText}>&ldquo;{r.text}&rdquo;</p>
                  <div className={styles.reviewer}>
                    <strong>{r.author}</strong>
                    {r.business && <span>{r.business}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Review Submission Form */}
          <ReviewForm />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>© 2025 WEBCORD — PHAGWARA, PUNJAB — ALL RIGHTS RESERVED</p>
      </footer>
    </>
  );
}

function WorkCard({ work }: { work: any }) {
  return (
    <div className={styles.premiumCard}>
      <div className={styles.premiumImgWrapper}>
        {work.imageUrl ? (
          <img src={work.imageUrl} alt={work.title} className={styles.premiumImg} />
        ) : (
          <div className={styles.imgPlaceholder}>
            <span>WEBCORD</span>
          </div>
        )}
      </div>
      
      <div className={styles.premiumBody}>
        <div className={styles.premiumHeader}>
          {work.category && (
            <div className={styles.premiumBadges}>
              <span className={styles.premiumBadge}>{work.category}</span>
            </div>
          )}
          <h3 className={styles.premiumTitle}>{work.title}</h3>
        </div>
        
        <p className={styles.premiumDesc}>
          {work.description || "A stunning website crafted with precision and care for our valued client."}
        </p>
        
        <div className={styles.premiumFooter}>
          <a
            href={work.link}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.premiumBtn}
          >
            Visit Site
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
}

function ReviewForm() {
  const submitReview = useMutation(api.reviews.submitReview);
  const [form, setForm] = useState({
    author: "",
    business: "",
    text: "",
    rating: 5,
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.author.trim() || !form.text.trim()) return;
    setLoading(true);
    try {
      await submitReview({
        author: form.author,
        business: form.business || undefined,
        text: form.text,
        rating: form.rating,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className={styles.submitSuccess}>
        <p>Thanks for your review! We&apos;ll publish it after a quick check.</p>
      </div>
    );
  }

  return (
    <div className={styles.reviewForm}>
      <h3>Leave a Review</h3>
      <p className={styles.formNote}>Reviews are moderated and published within 24 hours.</p>
      <form onSubmit={handleSubmit}>
        <div className={styles.formRow}>
          <div className="form-group">
            <label className="form-label">Your Name *</label>
            <input
              className="form-input"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              placeholder="Harpreet Singh"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Business Name</label>
            <input
              className="form-input"
              value={form.business}
              onChange={(e) => setForm({ ...form, business: e.target.value })}
              placeholder="Singh Auto Works, Phagwara"
            />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: "16px" }}>
          <label className="form-label">Rating</label>
          <div className={styles.ratingPicker}>
            {[1, 2, 3, 4, 5].map((n: number) => (
              <button
                key={n}
                type="button"
                className={`${styles.ratingBtn} ${form.rating >= n ? styles.ratingActive : ""}`}
                onClick={() => setForm({ ...form, rating: n })}
              >
                <Star size={20} fill={form.rating >= n ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: "24px" }}>
          <label className="form-label">Your Review *</label>
          <textarea
            className="form-input"
            rows={4}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Share your experience working with Webcord..."
            required
            style={{ resize: "vertical" }}
          />
        </div>
        <button
          type="submit"
          className="btn-primary"
          disabled={loading}
          style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}
        >
          {loading ? "Submitting..." : <>Submit Review <Send size={14} /></>}
        </button>
      </form>
    </div>
  );
}
