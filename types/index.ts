// types/index.ts

export interface PlanFeature {
  text: string;
}

export interface PlanFAQ {
  question: string;
  answer: string;
}

export interface Plan {
  id: string;
  slug: string;
  category: "website" | "monthly" | "video";
  badge: string;
  name: string;
  price: number;
  priceLabel: string;
  delivery: string;
  features: string[];
  featured?: boolean;
  description: string;
  whatYouGet: string[];
  idealFor: string[];
  faqs: PlanFAQ[];
  reviewCount: number;
  reviewAvg: number;
}

export interface CartItem {
  plan: Plan;
  quantity: number;
}

export interface CheckoutDetails {
  name: string;
  businessName: string;
  phone: string;
  city: string;
}

export interface Review {
  name: string;
  business: string;
  rating: number;
  text: string;
  date: string;
}

export interface HomepageService {
  id: string;
  numberLabel: string;
  title: string;
  description: string;
  features: string[];
  priceLabel: string;
  deliveryLabel: string;
}
