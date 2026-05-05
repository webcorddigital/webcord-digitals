# Webcord — Image Management Guide

## How to Update Images

All website images live in `public/images/`. To replace an image, simply
**drop a new file with the exact same filename** into the correct folder and redeploy.
No code changes needed.

---

## Folder Structure

```
public/images/
├── hero/
│   └── hero-bg.jpg          ← Main hero section background (recommended: 1920×1080px, JPG)
│
├── services/
│   ├── website-dev.jpg      ← Website Development service card (recommended: 800×600px)
│   ├── social-media.jpg     ← Social Media service card
│   ├── video-reels.jpg      ← Video & Reels service card
│   └── full-digital.jpg     ← Full Digital Package service card
│
├── plans/
│   ├── starter-website.jpg  ← Starter Site plan image
│   ├── business-website.jpg ← Business Site plan image
│   ├── premium-website.jpg  ← Premium Site plan image
│   ├── social-media-basic.jpg
│   ├── social-media-growth.jpg
│   ├── social-media-pro.jpg
│   ├── google-ads-management.jpg
│   ├── promo-reel.jpg
│   ├── service-video.jpg
│   ├── event-coverage.jpg
│   └── youtube-editing.jpg
│
├── team/
│   └── sinan.jpg            ← Founder/team photo (recommended: 400×400px, square)
│
└── logo/
    ├── webcord-logo.png     ← Dark background logo (transparent PNG)
    └── webcord-logo-white.png ← Light background logo (transparent PNG)
```

---

## Image Guidelines

| Section | Recommended Size | Format |
|---|---|---|
| Hero background | 1920 × 1080 px | JPG (compressed) |
| Service cards | 800 × 600 px | JPG or WebP |
| Plan images | 600 × 400 px | JPG or WebP |
| Team photo | 400 × 400 px | JPG (square) |
| Logo | Any | PNG with transparency |

**Tips:**
- Keep file sizes under 200KB where possible (use [Squoosh](https://squoosh.app) to compress)
- Use JPG for photos, PNG for logos/graphics with transparency
- WebP is fine if your device supports it

---

## Updating Contact Info or Plans

To change the **WhatsApp number**, **prices**, or **plan details**, edit:

```
data/plans.ts
```

Look for the `CONTACT_INFO` section at the bottom of the file to update WhatsApp number and email.

---

## Deploying Changes

After replacing images or editing `data/plans.ts`:

1. Save the file
2. Run `npm run build` in the project folder
3. Deploy to your hosting provider

Or if using Vercel, just push to GitHub — it deploys automatically.
