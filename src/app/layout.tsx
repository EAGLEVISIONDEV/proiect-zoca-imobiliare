import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zoca Real Estate | Agenție Imobiliară Premium",
  description:
    "Descoperiți proprietăți exclusive în București. Zoca Real Estate — partenerul dvs. de încredere în tranzacții imobiliare premium cu contracte de exclusivitate.",
  openGraph: {
    title: "Zoca Real Estate | Agenție Imobiliară Premium",
    description:
      "Excelență în imobiliare. Proprietăți exclusive, contracte de exclusivitate, servicii premium.",
    type: "website",
    url: "https://zoca.ro",
  },
  icons: {
    icon: "/brand/zoca-logo-transparent.png",
    apple: "/brand/zoca-logo-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ro"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
