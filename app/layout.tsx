import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"
import { TopNav } from "@/components/top-nav" // 1. Import your TopNav component

export const metadata: Metadata = {
  title: "arah.xyz",
  description: "Trade Indonesia's Future, Decentralized",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark antialiased">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <TopNav /> {/* 2. Add the TopNav component here */}
        <main> {/* It's good practice to wrap your page content in a <main> tag */}
          <Suspense fallback={null}>{children}</Suspense>
        </main>
        <Analytics />
      </body>
    </html>
  )
}