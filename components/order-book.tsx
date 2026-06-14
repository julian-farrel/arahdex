"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { cn } from "@/lib/utils"

interface BookLevel {
  price: number
  size: number
}

interface BookState {
  bids: BookLevel[]
  asks: BookLevel[]
}

export function OrderBook() {
  const [book, setBook] = useState<BookState>({ bids: [], asks: [] })
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
            subscription: { type: "l2Book", coin: "BTC" },
          })
        )
      }

      ws.onmessage = (event) => {
        if (cancelled) return
        try {
          const msg = JSON.parse(event.data)
          if (msg.channel === "l2Book" && msg.data?.levels) {
            const rawBids: [string, string][] = msg.data.levels[0] || []
            const rawAsks: [string, string][] = msg.data.levels[1] || []

            const bids: BookLevel[] = rawBids
              .map(([p, s]) => ({ price: parseFloat(p), size: parseFloat(s) }))
              .filter((l) => l.size > 0)
              .sort((a, b) => b.price - a.price)
              .slice(0, 14)

            const asks: BookLevel[] = rawAsks
              .map(([p, s]) => ({ price: parseFloat(p), size: parseFloat(s) }))
              .filter((l) => l.size > 0)
              .sort((a, b) => a.price - b.price)
              .slice(0, 14)

            setBook({ bids, asks })
          }
        } catch {
          // skip invalid messages
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

  const spread = useMemo(() => {
    if (book.asks.length === 0 || book.bids.length === 0) return { abs: 0, pct: "0.00" }
    const bestAsk = book.asks[0].price
    const bestBid = book.bids[0].price
    const abs = bestAsk - bestBid
    const pct = ((abs / bestAsk) * 100).toFixed(3)
    return { abs, pct }
  }, [book])

  const midPrice = useMemo(() => {
    if (book.asks.length === 0 || book.bids.length === 0) return null
    return ((book.asks[0].price + book.bids[0].price) / 2)
  }, [book])

  return (
    <section className="rounded-lg border border-border bg-card p-0 overflow-hidden flex flex-col h-full">
      <div className="border-b border-border px-3 py-2 text-sm">
        <div className="flex items-center gap-4">
          <span className="font-medium">Order Book</span>
          <span className="text-xs text-muted-foreground">BTC-PERP</span>
          <span className="ml-auto flex items-center gap-1.5">
            <span
              className={cn(
                "inline-block h-1.5 w-1.5 rounded-full",
                connected ? "bg-[color:var(--color-up)] animate-pulse" : "bg-[color:var(--color-down)]"
              )}
            />
            <span className="text-[10px] text-muted-foreground">
              {connected ? "LIVE" : "OFFLINE"}
            </span>
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-3 text-[10px] uppercase tracking-wider text-muted-foreground px-3 py-1.5 border-b border-border/50">
        <div>Price (USD)</div>
        <div className="text-center">Size (BTC)</div>
        <div className="text-right pr-1">Total (BTC)</div>
      </div>

      {/* Asks - reversed so lowest ask is at bottom */}
      <div className="flex-1 overflow-hidden">
        <OBSide levels={book.asks} type="asks" />
      </div>

      {/* Spread / Mid Price */}
      <div className="grid grid-cols-3 text-[10px] border-y border-border bg-background/30 font-mono">
        <div className="px-3 py-1.5 text-muted-foreground">Spread</div>
        <div className="px-3 py-1.5 text-center text-foreground font-semibold">
          {midPrice ? midPrice.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : "—"}
        </div>
        <div className="px-3 py-1.5 text-right pr-1 text-muted-foreground">
          {spread.abs > 0 ? `${spread.abs.toFixed(1)} / ${spread.pct}%` : "—"}
        </div>
      </div>

      {/* Bids */}
      <div className="flex-1 overflow-hidden">
        <OBSide levels={book.bids} type="bids" />
      </div>
    </section>
  )
}

function OBSide({ levels, type }: { levels: BookLevel[]; type: "asks" | "bids" }) {
  const cumulative = useMemo(() => {
    let running = 0
    const rows = levels.map((l) => {
      running += l.size
      return { ...l, cumSize: running }
    })
    return rows
  }, [levels])

  const maxCum = cumulative.length > 0 ? cumulative[cumulative.length - 1].cumSize : 1

  // For asks, display reversed (highest ask at top, lowest ask at bottom near spread)
  const displayed = type === "asks" ? [...cumulative].reverse() : cumulative

  const isAsk = type === "asks"

  return (
    <div className="text-[11px] font-mono h-full flex flex-col justify-end">
      {displayed.map((row, idx) => {
        const depthPct = Math.min((row.cumSize / maxCum) * 100, 100)
        return (
          <div
            key={`${type}-${idx}`}
            className="relative grid grid-cols-3 px-3 py-[2px] hover:bg-foreground/5 transition-colors cursor-crosshair"
          >
            {/* Depth bar */}
            <div
              className={cn(
                "absolute inset-y-0 pointer-events-none",
                isAsk ? "right-0 bg-[color:var(--color-down)]/10" : "right-0 bg-[color:var(--color-up)]/10"
              )}
              style={{ width: `${depthPct}%` }}
            />

            <div className={cn("relative z-10", isAsk ? "text-[color:var(--color-down)]" : "text-[color:var(--color-up)]")}>
              {row.price.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </div>
            <div className="relative z-10 text-center text-foreground">
              {row.size.toFixed(4)}
            </div>
            <div className="relative z-10 text-right pr-1 text-foreground/70">
              {row.cumSize.toFixed(4)}
            </div>
          </div>
        )
      })}
      {displayed.length === 0 &&
        Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="grid grid-cols-3 px-3 py-[2px]">
            <div className="h-3 w-16 rounded bg-muted/20 animate-pulse" />
            <div className="h-3 w-12 mx-auto rounded bg-muted/20 animate-pulse" />
            <div className="h-3 w-12 ml-auto rounded bg-muted/20 animate-pulse" />
          </div>
        ))}
    </div>
  )
}
