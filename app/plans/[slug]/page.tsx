// app/plans/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getPlanBySlug, getReviewsForPlan } from "@/data/plans";
import Navbar from "@/components/Navbar";
import PlanDetailClient from "./PlanDetailClient";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const plan = getPlanBySlug(params.slug);
  if (!plan) return {};
  return {
    title: `${plan.name} — Webcord`,
    description: plan.description,
  };
}

export default function PlanDetailPage({ params }: { params: { slug: string } }) {
  const plan = getPlanBySlug(params.slug);
  if (!plan) notFound();

  const reviews = getReviewsForPlan(plan.id);

  return (
    <>
      <Navbar />
      <PlanDetailClient plan={plan} reviews={reviews} />
    </>
  );
}
