"use client"

import { useEffect, useState, useRef, useMemo } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface MarketData {
  markPrice: string
  midPrice: string
  prevDayPrice: string
  dayVolume: string
  openInterest: string
}

export function MarketHeader() {
  const [data, setData] = useState<MarketData | null>(null)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    let cancelled = false
    let ws: WebSocket | null = null
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null

    function connect() {
      if (cancelled) return

      ws = new WebSocket("wss://api.hyperliquid.xyz/ws")

      ws.onopen = () => {
        if (cancelled) { ws?.close(); return }
        setConnected(true)
        ws!.send(
          JSON.stringify({
            method: "subscribe",
            subscription: { type: "activeAssetCtx", coin: "BTC" },
          })
        )
      }

      ws.onmessage = (event) => {
        if (cancelled) return
        try {
          const msg = JSON.parse(event.data)
          if (msg.channel === "activeAssetCtx" && msg.data?.ctx) {
            const ctx = msg.data.ctx
            setData({
              markPrice: ctx.markPx || "0",
              midPrice: ctx.midPx || ctx.markPx || "0",
              prevDayPrice: ctx.prevDayPx || "0",
              dayVolume: ctx.dayNtlVlm || "0",
              openInterest: ctx.openInterest || "0",
            })
          }
        } catch {
          // skip
        }
      }

      ws.onclose = () => {
        if (cancelled) return
        setConnected(false)
        reconnectTimer = setTimeout(connect, 3000)
      }

      ws.onerror = () => {
        ws?.close()
      }
    }

    connect()

    return () => {
      cancelled = true
      if (reconnectTimer) clearTimeout(reconnectTimer)
      if (ws) {
        ws.onclose = null
        ws.onerror = null
        ws.onmessage = null
        ws.close()
      }
    }
  }, [])

  const { markPrice, change24h, changePct, isPositive, volume, oi } = useMemo(() => {
    const mp = data ? parseFloat(data.markPrice) : 0
    const pdp = data ? parseFloat(data.prevDayPrice) : 0
    const ch = mp && pdp ? mp - pdp : 0
    const cp = pdp ? ((ch / pdp) * 100).toFixed(2) : "0.00"
    return {
      markPrice: mp,
      change24h: ch,
      changePct: cp,
      isPositive: ch >= 0,
      volume: data ? parseFloat(data.dayVolume) : 0,
      oi: data ? parseFloat(data.openInterest) : 0,
    }
  }, [data])

  return (
    <section className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full p-1.5 hover:bg-muted/30 transition-colors" aria-label="Favorite">
            <Star className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="text-sm font-semibold">BTC/USD</div>
          <span className="rounded-full bg-[color:var(--color-brand)]/30 px-2 py-0.5 text-[11px] text-foreground">
            Perps
          </span>
          <span className="flex items-center gap-1">
            <span
              className={cn(
                "inline-block h-1.5 w-1.5 rounded-full",
                connected ? "bg-[color:var(--color-up)] animate-pulse" : "bg-[color:var(--color-down)]"
              )}
            />
          </span>
        </div>

        <div className="ml-auto grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground sm:grid-cols-3 lg:grid-cols-6">
          <Metric
            label="Mark Price"
            value={markPrice > 0 ? `$${markPrice.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}` : "—"}
          />
          <Metric
            label="24h Change"
            value={
              markPrice > 0
                ? `${isPositive ? "+" : ""}${change24h.toFixed(1)} / ${isPositive ? "+" : ""}${changePct}%`
                : "—"
            }
            accent={isPositive ? "up" : "down"}
          />
          <Metric
            label="24h Volume"
            value={volume > 0 ? `$${formatCompact(volume)}` : "—"}
          />
          <Metric
            label="Open Interest"
            value={oi > 0 ? `$${formatCompact(oi)}` : "—"}
          />
          <Metric label="Network" value="Hyperliquid" />
          <Metric label="Leverage" value="Up to 100×" />
        </div>
      </div>
    </section>
  )
}

function formatCompact(n: number): string {
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(2)}K`
  return n.toFixed(2)
}

function Metric({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: "up" | "down"
}) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px]">{label}</span>
      <span
        className={cn(
          "font-mono text-foreground",
          accent === "up" && "text-[color:var(--color-up)]",
          accent === "down" && "text-[color:var(--color-down)]"
        )}
      >
        {value}
      </span>
    </div>
  )
}
