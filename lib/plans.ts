// lib/plans.ts
// Re-exports from the static data file.
// All plan data, reviews, and contact info live in data/plans.ts

export {
  PLANS,
  CONTACT_INFO,
  REVIEWS,
  getPlanBySlug,
  getPlansByCategory,
  getReviewsForPlan,
} from "@/data/plans";
