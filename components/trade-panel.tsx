"use client"

import type React from "react"
import { useState, useMemo, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

type Side = "buy" | "sell"
type OrderType = "market" | "limit"

export function TradePanel() {
  const [side, setSide] = useState<Side>("buy")
  const [orderType, setOrderType] = useState<OrderType>("limit")
  const [price, setPrice] = useState("")
  const [size, setSize] = useState("")
  const [sliderValue, setSliderValue] = useState([0])
  const [leverage, setLeverage] = useState("10")

  const totalValue = useMemo(() => {
    const p = parseFloat(price) || 0
    const s = parseFloat(size) || 0
    return p * s
  }, [price, size])

  const handleSliderChange = useCallback(
    (val: number[]) => {
      setSliderValue(val)
      // Simulate sizing based on hypothetical balance
      const pct = val[0]
      if (pct > 0 && parseFloat(price) > 0) {
        const hypotheticalBalance = 1000 // Placeholder
        const maxSize = (hypotheticalBalance * (pct / 100)) / parseFloat(price)
        setSize(maxSize.toFixed(6))
      }
    },
    [price]
  )

  const handlePlaceOrder = useCallback(() => {
    const p = parseFloat(price) || 0
    const s = parseFloat(size) || 0
    if (s <= 0) return
    if (orderType === "limit" && p <= 0) return

    // In a real implementation this would send to the Hyperliquid API
    console.log(`[${side.toUpperCase()}] ${orderType.toUpperCase()} order: ${s} BTC @ ${orderType === "market" ? "MARKET" : `$${p}`} (Total: $${totalValue.toFixed(2)})`)
  }, [side, orderType, price, size, totalValue])

  const isBuy = side === "buy"

  return (
    <section className="rounded-lg border border-border bg-card p-0 overflow-hidden flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-border px-3 py-2 text-sm">
        <div className="flex items-center justify-between">
          <div className="font-medium">Trade</div>
          <div className="text-xs text-muted-foreground">BTC-PERP</div>
        </div>
      </div>

      <div className="flex-1 px-3 pt-3 pb-3 flex flex-col">
        {/* Buy / Sell toggle */}
        <div className="grid grid-cols-2 rounded-md bg-muted/30 p-1 text-sm">
          <button
            onClick={() => setSide("buy")}
            className={cn(
              "rounded px-3 py-1.5 font-medium transition-all",
              side === "buy"
                ? "bg-[color:var(--color-up)]/20 text-[color:var(--color-up)] shadow-sm"
                : "text-foreground/50 hover:text-foreground/70"
            )}
          >
            Long
          </button>
          <button
            onClick={() => setSide("sell")}
            className={cn(
              "rounded px-3 py-1.5 font-medium transition-all",
              side === "sell"
                ? "bg-[color:var(--color-down)]/20 text-[color:var(--color-down)] shadow-sm"
                : "text-foreground/50 hover:text-foreground/70"
            )}
          >
            Short
          </button>
        </div>

        {/* Order Type tabs */}
        <Tabs
          value={orderType}
          onValueChange={(v) => setOrderType(v as OrderType)}
          className="mt-3"
        >
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="limit">Limit</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>

          {/* Limit order content */}
          <TabsContent value="limit" className="mt-0 space-y-0">
            <Field label="Price" hint="USD">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.00"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="h-9 bg-background/60 pr-12 font-mono text-sm"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                  USD
                </span>
              </div>
            </Field>

            <Field label="Size" hint="BTC">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.000000"
                  value={size}
                  onChange={(e) => {
                    setSize(e.target.value)
                    setSliderValue([0])
                  }}
                  className="h-9 bg-background/60 pr-12 font-mono text-sm"
                  step="0.0001"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                  BTC
                </span>
              </div>

              {/* Size slider */}
              <div className="mt-3 px-1">
                <Slider
                  value={sliderValue}
                  onValueChange={handleSliderChange}
                  max={100}
                  step={1}
                  className="[&_[data-slot=slider-range]]:bg-[color:var(--color-brand)] [&_[data-slot=slider-thumb]]:border-[color:var(--color-brand)] [&_[data-slot=slider-thumb]]:bg-[color:var(--color-brand)]"
                />
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
                  {[0, 25, 50, 75, 100].map((v) => (
                    <button
                      key={v}
                      onClick={() => handleSliderChange([v])}
                      className="hover:text-foreground transition-colors"
                    >
                      {v}%
                    </button>
                  ))}
                </div>
              </div>
            </Field>
          </TabsContent>

          {/* Market order content */}
          <TabsContent value="market" className="mt-0 space-y-0">
            <Field label="Size" hint="BTC">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="0.000000"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="h-9 bg-background/60 pr-12 font-mono text-sm"
                  step="0.0001"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                  BTC
                </span>
              </div>
            </Field>
          </TabsContent>
        </Tabs>

        {/* Leverage */}
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Leverage</span>
          <div className="flex items-center gap-1">
            <Input
              type="number"
              value={leverage}
              onChange={(e) => setLeverage(e.target.value)}
              className="h-6 w-14 bg-background/60 text-center text-[11px] font-mono px-1"
              min="1"
              max="100"
            />
            <span className="text-muted-foreground">×</span>
          </div>
        </div>

        {/* Order summary */}
        <div className="my-3 h-px bg-border" />

        <div className="space-y-1.5 text-xs">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Order Value</span>
            <span className="font-mono text-foreground">
              {totalValue > 0 ? `$${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Margin Required</span>
            <span className="font-mono text-foreground">
              {totalValue > 0 && parseInt(leverage)
                ? `$${(totalValue / parseInt(leverage)).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                : "—"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Est. Liq. Price</span>
            <span className="font-mono text-muted-foreground">—</span>
          </div>
        </div>

        <div className="my-3 h-px bg-border" />

        {/* Place Order button */}
        <Button
          onClick={handlePlaceOrder}
          className={cn(
            "w-full font-semibold transition-all",
            isBuy
              ? "bg-[color:var(--color-up)] hover:bg-[color:var(--color-up)]/80 text-white"
              : "bg-[color:var(--color-down)] hover:bg-[color:var(--color-down)]/80 text-white"
          )}
        >
          {isBuy ? "Long" : "Short"} BTC
          {orderType === "limit" && price ? ` @ $${parseFloat(price).toLocaleString()}` : ""}
        </Button>

        {/* Bottom section */}
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" size="sm" className="w-full bg-muted/30 text-xs">
              Deposit
            </Button>
            <Button variant="secondary" size="sm" className="w-full bg-muted/30 text-xs">
              Withdraw
            </Button>
          </div>
          <div className="rounded-lg border border-border p-3 text-xs">
            <div className="text-muted-foreground mb-2">Account Equity</div>
            <div className="flex items-center justify-between">
              <span>Perps</span>
              <span className="text-muted-foreground font-mono">$0.00</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>Available</span>
              <span className="text-muted-foreground font-mono">$0.00</span>
            </div>
          </div>
        </div>
      </div>
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
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-[11px] text-muted-foreground">{label}</label>
        {hint ? <span className="text-[10px] text-muted-foreground">{hint}</span> : null}
      </div>
      {children}
    </div>
  )
}
