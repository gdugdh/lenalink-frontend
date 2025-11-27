import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { BookingProvider } from "./lib/booking-context";
import { GlobalLoader } from "./components/shared/global-loader";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lena link",
  icons: {
    icon: [
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${geist.className} overflow-x-hidden`}>
      <body className={`${geist.className} antialiased overflow-x-hidden`} suppressHydrationWarning>
        <GlobalLoader />
        <BookingProvider>
          {children}
        </BookingProvider>
        <Analytics />
      </body>
    </html>
  );
}
