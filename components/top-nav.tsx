"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, CircleHelp, Settings, Bell, Link2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image" // 1. Import the Image component

export function TopNav() {
  const navItems = [
    { title: "Trade", href: "/" },
    { title: "Portfolio", href: "/portfolio" },
    { title: "Referrals", href: "/referrals" },
    { title: "Leaderboard", href: "/leaderboard" },
    { title: "Blocks", href: "/blocks" },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-[color:var(--color-card)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-card)]/60">
      <div className="mx-auto flex h-12 items-center justify-between px-3 md:h-14 md:px-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            {/* 2. Replace the circular div with your logo */}
            <Image
              src="/Arah logo.png" // <-- Make sure this path matches your logo file in the /public folder
              alt="Arah Logo"
              width={12} // Adjust width as needed
              height={12} // Adjust height as needed
              className="h-3 w-3" // This ensures the size is consistent
            />
            <span className="text-sm font-semibold tracking-tight md:text-base">Arah</span>
          </div>
          <nav className="hidden items-center gap-4 text-xs text-muted-foreground md:flex">
            {navItems.map((item) => (
              <Link key={item.title} href={item.href} className="transition-colors hover:text-foreground">
                {item.title}
              </Link>
            ))}
            <div className="flex items-center gap-1">
              <a href="#" className="transition-colors hover:text-foreground">
                More
              </a>
              <ChevronDown className="h-3.5 w-3.5" />
            </div>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            className="hidden text-muted-foreground hover:text-foreground sm:inline-flex"
          >
            <Link2 className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <CircleHelp className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
            <Settings className="h-4 w-4" />
          </Button>
          <Button size="sm" className={cn("bg-[color:var(--color-brand)] text-foreground hover:opacity-90")}>
            Connect
          </Button>
        </div>
      </div>
    </header>
  )
}