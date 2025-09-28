"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

export function TradePanel() {
  const [side, setSide] = useState<"buy" | "sell">("buy")

  return (
    <section className="rounded-lg border border-border bg-card p-0 overflow-hidden">
      <div className="border-b border-border px-3 py-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="font-medium">Trade</div>
          <div className="text-xs text-muted-foreground">BBCX</div>
        </div>
      </div>

      <Tabs defaultValue="limit" className="px-3 pt-3">
        <div className="flex items-center justify-between">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="market">Market</TabsTrigger>
            <TabsTrigger value="limit">Limit</TabsTrigger>
            <TabsTrigger value="pro">Pro</TabsTrigger>
          </TabsList>
        </div>

        <div className="mt-3 grid grid-cols-2 rounded-md bg-muted/30 p-1 text-sm">
          <button
            onClick={() => setSide("buy")}
            className={cn(
              "rounded px-3 py-1.5",
              side === "buy" ? "bg-[color:var(--color-brand)]/25 text-foreground" : "text-foreground/60",
            )}
          >
            Buy
          </button>
          <button
            onClick={() => setSide("sell")}
            className={cn(
              "rounded px-3 py-1.5",
              side === "sell" ? "bg-[color:var(--color-brand)]/25 text-foreground" : "text-foreground/60",
            )}
          >
            Sell
          </button>
        </div>

        <TabsContent value="limit" className="mt-3">
          <Field label="Available to Trade" hint="0.00 USDC" />
          <Field label="Price (USDC)">
            <Input placeholder="46.2" className="h-9 bg-background/60" />
          </Field>
          <Field label="Size" hint="BBCX">
            <Input placeholder="0.0" className="h-9 bg-background/60" />
            {/* slider mimic */}
            <div className="mt-3 flex items-center gap-2 px-1">
              <div className="h-1 flex-1 rounded bg-muted/40">
                <div className="h-1 w-2/5 rounded bg-[color:var(--color-brand)]" />
              </div>
              <div className="text-xs text-muted-foreground">0%</div>
            </div>
          </Field>
          <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
            <span>TIF</span>
            <span>GTC</span>
          </div>

          <Button className="mt-3 w-full bg-[color:var(--color-brand)] text-foreground hover:opacity-90">
            Connect
          </Button>
        </TabsContent>

        <TabsContent value="market" className="mt-3">
          <Field label="Size" hint="HYPE">
            <Input placeholder="0.0" className="h-9 bg-background/60" />
          </Field>
          <Button className="mt-3 w-full bg-[color:var(--color-brand)] text-foreground hover:opacity-90">
            Connect
          </Button>
        </TabsContent>

        <TabsContent value="pro" className="mt-3">
          <div className="rounded-md border border-dashed border-border p-4 text-xs text-muted-foreground">
            Advanced settings placeholder
          </div>
        </TabsContent>

        <div className="my-3 h-px bg-border" />

        <div className="space-y-2 pb-3">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" className="w-full bg-muted/30">
              Deposit
            </Button>
            <Button variant="secondary" className="w-full bg-muted/30">
              Withdraw
            </Button>
          </div>
          <div className="rounded-lg border border-border p-3 text-xs">
            <div className="text-muted-foreground mb-2">Account Equity</div>
            <div className="flex items-center justify-between">
              <span>Perps</span>
              <span className="text-muted-foreground">$0.00</span>
            </div>
          </div>
        </div>
      </Tabs>
    </section>
  )
}

function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children?: React.ReactNode
}) {
  return (
    <div className="mt-3 text-sm">
      <div className="flex items-center justify-between">
        <label className="text-xs text-muted-foreground">{label}</label>
        {hint ? <span className="text-xs text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </div>
  )
}
