import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { JobProvider } from "@/context/JobContext";
import { clashDisplay, epilogue } from "@/lib/fonts";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const metadata: Metadata = {
  title: "QuickHire",
  description: "AI-Powered Job Search and Application Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.variable} ${epilogue.variable} font-epilogue antialiased`}
      >
        <Toaster richColors />
        <NuqsAdapter>
          <TooltipProvider>
            <JobProvider>
              <Header />
              {children}
              <Footer />
            </JobProvider>
          </TooltipProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
