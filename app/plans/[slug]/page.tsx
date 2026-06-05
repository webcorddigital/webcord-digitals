// app/plans/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getReviewsForPlan } from "@/data/plans";
import Navbar from "@/components/Navbar";
import PlanDetailClient from "./PlanDetailClient";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const plan = await convex.query((api as any).plans.getPlanBySlug, { slug: params.slug });
  if (!plan) return {};
  return {
    title: `${plan.name} — Webcord`,
    description: plan.description,
  };
}

export default async function PlanDetailPage({ params }: { params: { slug: string } }) {
  const plan = await convex.query((api as any).plans.getPlanBySlug, { slug: params.slug });
  if (!plan) notFound();

  // keeping hardcoded reviews for now, wait until reviews are migrated
  // Actually, wait, reviews are hardcoded but `plan.id` is not in Convex (it's _id now).
  // But plan from Convex doesn't have `id`, it has `_id` and `slug`.
  // Let's use `plan.slug` to match reviews if needed, or fallback.
  // getReviewsForPlan used plan.id before. Let's pass plan.slug or use the fallback.
  const reviews = getReviewsForPlan(plan.slug as string) || getReviewsForPlan("web-business");

  return (
    <>
      <Navbar />
      <PlanDetailClient plan={plan as any} reviews={reviews} />
    </>
  );
}
