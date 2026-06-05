"use client";
// app/page.tsx
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import PricingSection from "@/components/PricingSection";
import { 
  UtensilsCrossed, Scissors, Stethoscope, Store, Dumbbell, Coffee, Home, Rocket,
  Zap, Tags, MapPin, BarChart3, Handshake, CheckCircle2, Ban, CreditCard, MessageSquare
} from "lucide-react";
import content from "@/data/content.json";

const { contactInfo, homepageServices } = content;

export default function HomePage() {
  // Scroll-reveal observer
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
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
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <PricingSection />
        <ResultsSection />
        <ProcessSection />
        <IndustriesSection />
        <WhySection />
        <GuaranteesSection />
        <CTASection contactInfo={contactInfo} />
        <ContactSection contactInfo={contactInfo} />
      </main>
      <Footer contactInfo={contactInfo} />
    </>
  );
}

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="hero">
      <div id="fp">
        {[
          { dur: "6.2s", del: "0s" },
          { dur: "8.1s", del: "-2.1s" },
          { dur: "5.8s", del: "-4.3s" },
          { dur: "9.4s", del: "-1.0s" },
          { dur: "7.0s", del: "-5.5s" },
          { dur: "6.6s", del: "-3.2s" },
          { dur: "10.2s", del: "-0.7s" },
          { dur: "7.8s", del: "-6.1s" },
          { dur: "5.5s", del: "-2.8s" },
          { dur: "8.9s", del: "-4.9s" },
          { dur: "6.3s", del: "-1.6s" },
          { dur: "9.1s", del: "-7.0s" },
          { dur: "7.4s", del: "-3.8s" },
          { dur: "5.9s", del: "-0.3s" },
          { dur: "8.5s", del: "-5.2s" },
          { dur: "6.7s", del: "-2.5s" },
          { dur: "10.0s", del: "-6.8s" },
          { dur: "7.2s", del: "-1.3s" },
          { dur: "5.7s", del: "-4.0s" },
          { dur: "8.3s", del: "-3.5s" }
        ].map((s, i) => (
          <div key={i} className="fp-col" style={{ "--dur": s.dur, "--del": s.del } as React.CSSProperties}></div>
        ))}
      </div>
      <div id="hero-vig"></div>

      <div className="hero-eyebrow">Digital Agency — Phagwara, Punjab</div>
      <h1>GROW YOUR<br/>BUSINESS<br/>ONLINE.</h1>
      <div className="hero-sub-title">WEBSITES · SOCIAL MEDIA · VIDEO · ADS</div>
      <div className="hero-location">Phagwara · Jalandhar · Ludhiana · Punjab</div>
      <div className="hero-btns">
        <Link href="#cta" className="btn-primary">
          Get a Free Quote
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </Link>
        <Link href="#pricing" className="btn-secondary">See Pricing</Link>
      </div>
      <div className="hero-stats">
        <div className="stat-pill"><span className="stat-num">340%</span><span className="stat-label">Avg. Reach Increase</span></div>
        <div className="stat-pill"><span className="stat-num">₹7K</span><span className="stat-label">Starting Price</span></div>
        <div className="stat-pill"><span className="stat-num">5 Days</span><span className="stat-label">Website Delivery</span></div>
        <div className="stat-pill"><span className="stat-num">4.9★</span><span className="stat-label">Google Rating</span></div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES
══════════════════════════════════════════ */
function ServicesSection() {
  return (
    <section id="services">
      <div className="services-top reveal">
        <div>
          <div className="eyebrow">What We Do</div>
          <h2>FOUR<br/>SERVICES.</h2>
        </div>
        <p className="section-desc">Everything a local business needs to get found online, build trust, and bring in more customers — delivered fast.</p>
      </div>
      <div className="services-grid">
        {homepageServices.map((svc: any, index: number) => (
          <div key={svc.id} className={`service-card reveal reveal-d${index + 1}`}>
            <div className="svc-num">{svc.numberLabel}</div>
            <h3 dangerouslySetInnerHTML={{ __html: svc.title }}></h3>
            <p>{svc.description}</p>
            <ul className="svc-list">
              {svc.features.map((feature: string, fIndex: number) => (
                <li key={fIndex}>{feature}</li>
              ))}
            </ul>
            <div className="svc-price">
              {svc.priceLabel}
              {svc.deliveryLabel && <span>{svc.deliveryLabel}</span>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   RESULTS
══════════════════════════════════════════ */
function ResultsSection() {
  return (
    <section id="results">
      <div className="results-top reveal">
        <div className="eyebrow">Proven Results</div>
        <h2>REAL<br/>NUMBERS.</h2>
      </div>
      <div className="results-grid">
        <div className="result-card reveal reveal-d1">
          <span className="result-label">REACH</span>
          <div className="result-metric">340%</div><div className="result-line"></div>
          <h4>Average Reach Increase</h4>
          <p>Across Webcord's client base after 6 months of consistent digital presence.</p>
        </div>
        <div className="result-card reveal reveal-d2">
          <span className="result-label">ENQUIRIES</span>
          <div className="result-metric">2.8×</div><div className="result-line"></div>
          <h4>More Enquiries</h4>
          <p>Average increase in customer enquiries after a new Webcord website goes live.</p>
        </div>
        <div className="result-card reveal reveal-d3">
          <span className="result-label">GOOGLE SEO</span>
          <div className="result-metric">68%</div><div className="result-line"></div>
          <h4>Organic Search Leads</h4>
          <p>Of all client leads come from free Google search — not paid ads.</p>
        </div>
        <div className="result-card reveal reveal-d4">
          <span className="result-label">PERFORMANCE</span>
          <div className="result-metric">94/100</div><div className="result-line"></div>
          <h4>PageSpeed Score</h4>
          <p>Average Google PageSpeed score across all Webcord-built websites.</p>
        </div>
      </div>
      <div className="results-grid" style={{ marginTop: '12px' }}>
        <div className="result-card reveal reveal-d1">
          <span className="result-label">REPUTATION</span>
          <div className="result-metric">4.9★</div><div className="result-line"></div>
          <h4>Google Rating</h4>
          <p>Average client Google rating after 6 months of Webcord digital management.</p>
        </div>
        <div className="result-card reveal reveal-d2">
          <span className="result-label">SEO AUDIT</span>
          <div className="result-metric">91/100</div><div className="result-line"></div>
          <h4>SEO Lighthouse Score</h4>
          <p>Average Lighthouse SEO score on all websites built by Webcord.</p>
        </div>
        <div className="result-card reveal reveal-d3">
          <span className="result-label">ENGAGEMENT</span>
          <div className="result-metric">6.8%</div><div className="result-line"></div>
          <h4>Social Engagement Rate</h4>
          <p>vs. 3% industry average. Webcord content generates 2× more engagement.</p>
        </div>
        <div className="result-card reveal reveal-d4">
          <span className="result-label">RETENTION</span>
          <div className="result-metric">94%</div><div className="result-line"></div>
          <h4>Client Retention</h4>
          <p>94% of clients continue with Webcord beyond their first 6 months.</p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PROCESS
══════════════════════════════════════════ */
function ProcessSection() {
  return (
    <section id="process">
      <div className="process-top reveal">
        <div className="eyebrow">How We Work</div>
        <h2>SIMPLE.<br/>FOUR STEPS.</h2>
      </div>
      <div className="process-grid">
        <div className="process-card reveal reveal-d1">
          <div className="process-ghost">01</div><div className="step-tag">Step 01</div>
          <h4>FREE CONSULT</h4>
          <p>We start with a free consultation — no commitment, no charge. We learn about your business, goals, and what's holding you back online.</p>
        </div>
        <div className="process-card reveal reveal-d2">
          <div className="process-ghost">02</div><div className="step-tag">Step 02</div>
          <h4>QUOTE &amp; PLAN</h4>
          <p>You get a clear quote with no hidden fees. We build a simple content or build plan tailored to your business and budget.</p>
        </div>
        <div className="process-card reveal reveal-d3">
          <div className="process-ghost">03</div><div className="step-tag">Step 03</div>
          <h4>FAST DELIVERY</h4>
          <p>We get to work immediately. Websites delivered in 5–10 days. Social content goes live within the week. No long waits.</p>
        </div>
        <div className="process-card reveal reveal-d4">
          <div className="process-ghost">04</div><div className="step-tag">Step 04</div>
          <h4>GROW &amp; SCALE</h4>
          <p>We track performance, report monthly, and keep improving. 94% of clients stay with us because the results keep coming.</p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   INDUSTRIES
══════════════════════════════════════════ */
function IndustriesSection() {
  return (
    <section id="industries">
      <div className="industries-top reveal">
        <div className="eyebrow">Who We Work With</div>
        <h2>LOCAL BUSINESSES<br/>ACROSS PUNJAB.</h2>
      </div>
      <div className="industries-grid">
        <div className="industry-card reveal reveal-d1"><div className="ind-circle"><UtensilsCrossed size={32} /></div><h4>RESTAURANTS</h4><p>Menus, delivery pages, Google presence, and food reels that fill tables.</p></div>
        <div className="industry-card reveal reveal-d2"><div className="ind-circle"><Scissors size={32} /></div><h4>SALONS &amp; SPAS</h4><p>Booking pages, service galleries, and Instagram content that builds clientele.</p></div>
        <div className="industry-card reveal reveal-d3"><div className="ind-circle"><Stethoscope size={32} /></div><h4>CLINICS</h4><p>Professional websites, appointment systems, and local SEO for healthcare providers.</p></div>
        <div className="industry-card reveal reveal-d4"><div className="ind-circle"><Store size={32} /></div><h4>BOUTIQUES</h4><p>Product showcases, WhatsApp catalogues, and Reels that drive walk-ins.</p></div>
        <div className="industry-card reveal reveal-d1"><div className="ind-circle"><Dumbbell size={32} /></div><h4>GYMS &amp; STUDIOS</h4><p>Class schedules, membership pages, and content that builds a local fitness brand.</p></div>
        <div className="industry-card reveal reveal-d2"><div className="ind-circle"><Coffee size={32} /></div><h4>CAFÉS</h4><p>Ambience reels, Google Maps presence, and menus that attract the right crowd.</p></div>
        <div className="industry-card reveal reveal-d3"><div className="ind-circle"><Home size={32} /></div><h4>REAL ESTATE</h4><p>Property showcases, lead capture pages, and Google Ads for brokers and developers.</p></div>
        <div className="industry-card reveal reveal-d4"><div className="ind-circle"><Rocket size={32} /></div><h4>STARTUPS</h4><p>Go-to-market websites, social presence, and digital infrastructure for new ventures.</p></div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   WHY
══════════════════════════════════════════ */
function WhySection() {
  return (
    <section id="why">
      <div className="why-layout">
        <div className="why-left reveal">
          <div className="eyebrow">Why Webcord</div>
          <h2>FAST.<br/>HONEST.<br/>LOCAL.</h2>
          <p className="section-desc">Unlike large agencies that take months and charge lakhs, Webcord delivers in days and starts at ₹7,000. Founded by Sinan in Phagwara — we know Punjab businesses because we are one.</p>
          <div className="why-list">
            <div className="why-list-item"><span className="why-dot"></span>Free consultation — no commitment, no charge</div>
            <div className="why-list-item"><span className="why-dot"></span>Delivered in days, not months</div>
            <div className="why-list-item"><span className="why-dot"></span>No hidden fees — quoted price is final price</div>
            <div className="why-list-item"><span className="why-dot"></span>100% satisfaction — free revisions until happy</div>
            <div className="why-list-item"><span className="why-dot"></span>EMI available on orders above ₹10,000</div>
            <div className="why-list-item"><span className="why-dot"></span>Reply within hours on WhatsApp &amp; email</div>
          </div>
        </div>
        <div className="why-grid reveal reveal-d1">
          <div className="why-card"><div className="why-card-icon"><Zap size={32} /></div><h5>FAST DELIVERY</h5><p>Websites in 5–7 days. Social content live within the week. No waiting.</p></div>
          <div className="why-card"><div className="why-card-icon"><Tags size={32} /></div><h5>HONEST PRICES</h5><p>Starting at ₹7,000. No hidden costs. EMI available. Annual discount of 20%.</p></div>
          <div className="why-card"><div className="why-card-icon"><MapPin size={32} /></div><h5>LOCAL EXPERTISE</h5><p>Based in Phagwara. We understand Punjab markets, customers, and culture.</p></div>
          <div className="why-card"><div className="why-card-icon"><BarChart3 size={32} /></div><h5>REAL RESULTS</h5><p>340% average reach increase. 2.8× more enquiries. 94% client retention.</p></div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   GUARANTEES
══════════════════════════════════════════ */
function GuaranteesSection() {
  return (
    <section id="guarantees">
      <div className="guarantees-top reveal">
        <div className="eyebrow">Our Guarantees</div>
        <h2>WE STAND<br/>BEHIND OUR WORK.</h2>
        <p className="section-desc">Every project comes with these commitments — no fine print.</p>
      </div>
      <div className="guarantees-grid">
        <div className="guarantee-card reveal reveal-d1">
          <span className="g-icon"><Handshake size={32} /></span>
          <h5>FREE CONSULTATION</h5>
          <p>Start with a no-obligation consultation. We talk, we listen, we quote — for free.</p>
        </div>
        <div className="guarantee-card reveal reveal-d2">
          <span className="g-icon"><CheckCircle2 size={32} /></span>
          <h5>100% SATISFACTION</h5>
          <p>Free revisions until you're completely happy with the result. No arguments.</p>
        </div>
        <div className="guarantee-card reveal reveal-d3">
          <span className="g-icon"><Ban size={32} /></span>
          <h5>NO HIDDEN FEES</h5>
          <p>Quoted price is the final price. What we say is what you pay. Always.</p>
        </div>
        <div className="guarantee-card reveal reveal-d4">
          <span className="g-icon"><CreditCard size={32} /></span>
          <h5>EMI AVAILABLE</h5>
          <p>Orders above ₹10,000 can be paid in easy instalments. No stress.</p>
        </div>
        <div className="guarantee-card reveal reveal-d5">
          <span className="g-icon"><MessageSquare size={32} /></span>
          <h5>FAST RESPONSE</h5>
          <p>We reply within a few hours on WhatsApp and email. You're never left waiting.</p>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CTA
══════════════════════════════════════════ */
function CTASection({ contactInfo }: { contactInfo: any }) {
  return (
    <section id="cta">
      <svg className="cta-waveform" viewBox="0 0 800 110" xmlns="http://www.w3.org/2000/svg" fill="white">
        <rect x="150" y="0" width="2" height="110"/><rect x="166" y="0" width="2" height="110"/>
        <rect x="182" y="0" width="2" height="110"/><rect x="202" y="0" width="2" height="110"/>
        <rect x="218" y="0" width="2" height="110"/><rect x="226" y="0" width="2" height="110"/>
        <rect x="314" y="0" width="2" height="110"/><rect x="354" y="0" width="2" height="110"/>
        <rect x="370" y="0" width="2" height="110"/><rect x="390" y="10" width="2" height="90"/>
      </svg>
      <div className="cta-inner reveal">
        <div className="eyebrow">Get Started Today</div>
        <h2>READY TO GROW<br/>YOUR BUSINESS?</h2>
        <p className="section-desc">Book a free consultation. We'll look at your current online presence and show you exactly what needs to change — no pitch, no pressure.</p>
        <div className="cta-actions">
          <a href={`mailto:${contactInfo.email}`} className="btn-inv">
            Email Us
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1 6.5h11M6.5 1l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </a>
          <a href={`https://wa.me/${contactInfo.whatsappRaw}`} className="btn-whatsapp" target="_blank" rel="noopener">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" fill="currentColor"/></svg>
            WhatsApp
          </a>
        </div>
        <p className="cta-note">Free consultation · No commitment · Based in Phagwara, Punjab</p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CONTACT STRIP
══════════════════════════════════════════ */
function ContactSection({ contactInfo }: { contactInfo: any }) {
  return (
    <section id="contact">
      <div className="contact-grid">
        <div className="contact-item">
          <span className="contact-label">WhatsApp</span>
          <a href={`https://wa.me/${contactInfo.whatsappRaw}`} className="contact-value" target="_blank" rel="noopener noreferrer">{contactInfo.whatsapp}</a>
        </div>
        <div className="contact-item">
          <span className="contact-label">Email</span>
          <a href={`mailto:${contactInfo.email}`} className="contact-value">{contactInfo.email}</a>
        </div>
        <div className="contact-item">
          <span className="contact-label">Website</span>
          <a href={`https://${contactInfo.website}`} className="contact-value" target="_blank" rel="noopener noreferrer">{contactInfo.website}</a>
        </div>
        <div className="contact-item">
          <span className="contact-label">Location</span>
          <span className="contact-value">{contactInfo.location}</span>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer({ contactInfo }: { contactInfo: any }) {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer>
      <div className="footer-top">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-logo" style={{ display: "flex", alignItems: "center" }}>
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
          <p>Premium digital agency in Phagwara, Punjab. Websites, social media, video &amp; ads for local businesses. Founded by Sinan. Fast delivery. Honest prices. Real results.</p>
        </div>
        <div className="footer-col">
          <h6>Services</h6>
          <ul>
            <li><Link href="/#services">Website Development</Link></li>
            <li><Link href="/#services">Social Media Management</Link></li>
            <li><Link href="/#services">Video &amp; Reels</Link></li>
            <li><Link href="/#services">Google Ads</Link></li>
            <li><Link href="/#services">Full Digital Package</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h6>Company</h6>
          <ul>
            <li><Link href="/#why">About Webcord</Link></li>
            <li><Link href="/#results">Results</Link></li>
            <li><Link href="/#process">Our Process</Link></li>
            <li><Link href="/#guarantees">Guarantees</Link></li>
            <li><Link href="/#cta">Free Consultation</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h6>Contact</h6>
          <ul>
            <li><a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a></li>
            <li><a href={`https://wa.me/${contactInfo.whatsappRaw}`} target="_blank" rel="noopener noreferrer">WhatsApp Us</a></li>
            <li><a href={`https://${contactInfo.website}`} target="_blank" rel="noopener noreferrer">{contactInfo.website}</a></li>
            <li><a href="#">{contactInfo.location}</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 WEBCORD — PHAGWARA, PUNJAB — ALL RIGHTS RESERVED</p>
        <div className="social-links">
          <a href="#" className="social-link" aria-label="Instagram">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--off-white)" strokeWidth="1.6"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1" fill="var(--off-white)" stroke="none"/></svg>
          </a>
          <a href="#" className="social-link" aria-label="Facebook">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--off-white)" strokeWidth="1.6"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
          <a href="#" className="social-link" aria-label="YouTube">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--off-white)" strokeWidth="1.6"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="var(--off-white)" stroke="none"/></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
