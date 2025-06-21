import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { generateOGMetadata } from "@/lib/og-image";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  ...generateOGMetadata({
    title: "Citrine.top - AI 協作開發的未來",
    description:
      "一個專注於 AI 與開發者協作的技術部落格，探索人工智能如何重塑軟體開發的未來",
    url: "https://citrine.top",
    type: "website",
  }),
  metadataBase: new URL("https://citrine.top"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-TW" className={inter.className}>
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        <Header />
        <main className="min-h-screen pt-16 lg:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
