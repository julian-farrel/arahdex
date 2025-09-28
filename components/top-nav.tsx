"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ChevronDown, CircleHelp, Settings, Bell, Link2 } from "lucide-react"

export function TopNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-[color:var(--color-card)]/80 backdrop-blur supports-[backdrop-filter]:bg-[color:var(--color-card)]/60">
      <div className="mx-auto flex h-12 md:h-14 items-center justify-between px-3 md:px-4">
        <div className="flex items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[color:var(--color-brand)]" />
            <span className="font-semibold tracking-tight text-sm md:text-base">Arah</span>
          </div>
          <nav className="hidden md:flex items-center gap-4 text-xs text-muted-foreground">
            {["Trade", "Vaults", "Portfolio", "Staking", "Referrals", "Leaderboard"].map((item) => (
              <a key={item} href="#" className="hover:text-foreground transition-colors">
                {item}
              </a>
            ))}
            <div className="flex items-center gap-1">
              <a href="#" className="hover:text-foreground transition-colors">
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
            className="hidden sm:inline-flex text-muted-foreground hover:text-foreground"
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
