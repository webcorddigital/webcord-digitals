// data/plans.ts
// ─────────────────────────────────────────────────────────────
// SINGLE SOURCE OF TRUTH (TypeScript Wrapper)
// The actual data lives in data/content.json to make it easy
// for the local Admin Dashboard to edit.
// ─────────────────────────────────────────────────────────────

import type { Plan, Review } from "@/types";
import content from "./content.json";

export const PLANS: Plan[] = content.plans as Plan[];
export const CONTACT_INFO = content.contactInfo;
export const REVIEWS: Record<string, Review[]> = content.reviews;

// ─────────────────────────────────────────────────────────────
// HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────
export const getPlanBySlug = (slug: string): Plan | undefined =>
  PLANS.find((p) => p.slug === slug);

export const getPlansByCategory = (category: string): Plan[] =>
  PLANS.filter((p) => p.category === category);

export const getReviewsForPlan = (planIdOrSlug: string): Review[] => {
  // Try exact match, otherwise fallback to generic reviews
  return REVIEWS[planIdOrSlug] ?? REVIEWS["web-business"] ?? [];
};
