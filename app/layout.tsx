// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/lib/CartContext";

export const metadata: Metadata = {
  title: "Webcord — Digital Agency, Punjab",
  description:
    "Websites, social media management, and video production for local businesses in Punjab. Fast delivery, honest pricing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{ __html: `
          document.addEventListener('contextmenu', event => event.preventDefault());
          document.addEventListener('copy', event => {
            const tagName = event.target.tagName.toLowerCase();
            if (tagName !== 'input' && tagName !== 'textarea') {
              event.preventDefault();
            }
          });
        `}} />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
