import { Urbanist } from "next/font/google"
import { ReactQueryClientProvider } from '@/components/ReactQueryClientProvider'

import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Family OS",
  description: "Everything you need to manage your family's digital life.",
};

export const font = Urbanist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['300', '400', '700']
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReactQueryClientProvider>    
    <html lang="en" className={font.className}>
      <body className="bg-background text-foreground">
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        <main className="min-h-screen flex flex-col items-center">
          {children}
        </main>
        <Toaster />
        </ThemeProvider>
      </body>
    </html>
    </ReactQueryClientProvider>
  );
}
