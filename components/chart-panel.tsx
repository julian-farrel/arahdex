"use client"

import dynamic from "next/dynamic"

const LightweightChart = dynamic(() => import("./LightweightChart"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center bg-card">
      <div className="flex flex-col items-center gap-2">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[color:var(--color-brand)] border-t-transparent" />
        <span className="text-xs text-muted-foreground">Loading chart…</span>
      </div>
    </div>
  ),
})

export function ChartPanel() {
  return (
    <section className="relative rounded-lg border border-border bg-card p-0 overflow-hidden">
      <div className="relative h-[360px] md:h-[420px] lg:h-[520px]">
        <LightweightChart />
      </div>
    </section>
  )
}
