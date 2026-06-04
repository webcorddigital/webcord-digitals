// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata: Metadata = {
  title: "Webcord — Digital Agency, Punjab",
  description:
    "Websites, social media management, and video production for local businesses in Punjab. Fast delivery, honest pricing.",
  openGraph: {
    title: "Webcord — Digital Agency, Punjab",
    description: "Websites, social media management, and video production for local businesses in Punjab.",
    url: "https://webcord.in",
    siteName: "Webcord",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ConvexClientProvider>
          <CartProvider>{children}</CartProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
