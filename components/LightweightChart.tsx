"use client"

import { useEffect, useRef, useState } from "react"
import {
  createChart,
  CandlestickSeries,
  type IChartApi,
  type ISeriesApi,
  type CandlestickData,
  type Time,
  ColorType,
  CrosshairMode,
} from "lightweight-charts"

interface HLCandle {
  t: number
  T: number
  s: string
  i: string
  o: string
  c: string
  h: string
  l: string
  v: string
  n: number
}

const INTERVALS = ["1m", "5m", "15m", "1h", "4h", "1d"] as const
type Interval = (typeof INTERVALS)[number]

async function fetchHistoricalCandles(interval: Interval): Promise<CandlestickData<Time>[]> {
  const intervalMs: Record<Interval, number> = {
    "1m": 60_000,
    "5m": 300_000,
    "15m": 900_000,
    "1h": 3_600_000,
    "4h": 14_400_000,
    "1d": 86_400_000,
  }
  const now = Date.now()
  const startTime = now - 300 * intervalMs[interval]

  const res = await fetch("https://api.hyperliquid.xyz/info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "candleSnapshot",
      req: {
        coin: "BTC",
        interval: interval,
        startTime: startTime,
        endTime: now,
      },
    }),
  })

  const data: HLCandle[] = await res.json()

  return data.map((c) => ({
    time: (Math.floor(c.t / 1000)) as Time,
    open: parseFloat(c.o),
    high: parseFloat(c.h),
    low: parseFloat(c.l),
    close: parseFloat(c.c),
  }))
}

export default function LightweightChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const seriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const [interval, setInterval] = useState<Interval>("15m")
  const [connected, setConnected] = useState(false)

  // Create chart once on mount
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const chart = createChart(container, {
      width: container.clientWidth,
      height: container.clientHeight,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "rgba(255,255,255,0.5)",
        fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
        fontSize: 11,
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.03)" },
        horzLines: { color: "rgba(255,255,255,0.03)" },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
        vertLine: {
          color: "rgba(255,255,255,0.15)",
          labelBackgroundColor: "rgba(25,0,255,0.8)",
        },
        horzLine: {
          color: "rgba(255,255,255,0.15)",
          labelBackgroundColor: "rgba(25,0,255,0.8)",
        },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.06)",
        scaleMargins: { top: 0.1, bottom: 0.08 },
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.06)",
        timeVisible: true,
        secondsVisible: false,
      },
    })

    const series = chart.addSeries(CandlestickSeries, {
      upColor: "oklch(0.73 0.17 145)",
      downColor: "oklch(0.61 0.2 27)",
      borderUpColor: "oklch(0.73 0.17 145)",
      borderDownColor: "oklch(0.61 0.2 27)",
      wickUpColor: "oklch(0.73 0.17 145 / 0.6)",
      wickDownColor: "oklch(0.61 0.2 27 / 0.6)",
    })

    chartRef.current = chart
    seriesRef.current = series

    const ro = new ResizeObserver(() => {
      if (container) {
        chart.applyOptions({
          width: container.clientWidth,
          height: container.clientHeight,
        })
      }
    })
    ro.observe(container)

    return () => {
      ro.disconnect()
      chart.remove()
      chartRef.current = null
      seriesRef.current = null
    }
  }, [])

  // WebSocket + historical data — reconnects when interval changes
  useEffect(() => {
    let cancelled = false
    let ws: WebSocket | null = null
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null

    // Load historical candles
    fetchHistoricalCandles(interval)
      .then((candles) => {
        if (cancelled || !seriesRef.current) return
        if (candles.length > 0) {
          seriesRef.current.setData(candles)
          chartRef.current?.timeScale().fitContent()
        }
      })
      .catch(() => {
        // silent
      })

    function connect() {
      if (cancelled) return

      ws = new WebSocket("wss://api.hyperliquid.xyz/ws")

      ws.onopen = () => {
        if (cancelled) { ws?.close(); return }
        setConnected(true)
        ws!.send(
          JSON.stringify({
            method: "subscribe",
            subscription: { type: "candle", coin: "BTC", interval: interval },
          })
        )
      }

      ws.onmessage = (event) => {
        if (cancelled) return
        try {
          const msg = JSON.parse(event.data)
          if (msg.channel === "candle" && msg.data) {
            const c = msg.data as HLCandle
            const bar: CandlestickData<Time> = {
              time: (Math.floor(c.t / 1000)) as Time,
              open: parseFloat(c.o),
              high: parseFloat(c.h),
              low: parseFloat(c.l),
              close: parseFloat(c.c),
            }
            seriesRef.current?.update(bar)
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
  }, [interval])

  return (
    <div className="relative h-full w-full">
      {/* Interval selector */}
      <div className="absolute top-2 left-2 z-20 flex items-center gap-1 rounded-md bg-background/60 backdrop-blur p-1">
        {INTERVALS.map((iv) => (
          <button
            key={iv}
            onClick={() => setInterval(iv)}
            className={`px-2 py-0.5 text-[10px] font-medium rounded transition-all ${
              interval === iv
                ? "bg-[color:var(--color-brand)] text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
            }`}
          >
            {iv}
          </button>
        ))}
      </div>

      {/* Connection indicator */}
      <div className="absolute top-2 right-2 z-20 flex items-center gap-1.5 rounded-md bg-background/60 backdrop-blur px-2 py-1">
        <span
          className={`inline-block h-1.5 w-1.5 rounded-full ${
            connected ? "bg-[color:var(--color-up)] animate-pulse" : "bg-[color:var(--color-down)]"
          }`}
        />
        <span className="text-[10px] text-muted-foreground font-medium">BTC-PERP</span>
      </div>

      {/* Chart container */}
      <div ref={containerRef} className="h-full w-full" />
    </div>
  )
}
