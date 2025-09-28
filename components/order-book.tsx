import { cn } from "@/lib/utils"

export function OrderBook() {
  return (
    <section className="rounded-lg border border-border bg-card p-0 overflow-hidden">
      <div className="border-b border-border px-3 py-2 text-sm">
        <div className="flex items-center gap-4">
          <span className="font-medium">Order Book</span>
          <span className="text-xs text-muted-foreground">1</span>
        </div>
      </div>

      {/* Asks */}
      <OBTable type="asks" />

      {/* Spread */}
      <div className="grid grid-cols-3 text-[11px] text-muted-foreground border-y border-border">
        <div className="px-3 py-1">Spread</div>
        <div className="px-3 py-1">1.000</div>
        <div className="px-3 py-1 text-right pr-3">2.247%</div>
      </div>

      {/* Bids */}
      <OBTable type="bids" />

      <div className="flex items-center justify-between border-t border-border px-3 py-2 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <label className="text-muted-foreground">Filter</label>
          <div className="h-4 w-10 rounded bg-muted/40" />
        </div>
        <label className="flex items-center gap-2">
          <input type="checkbox" className="accent-[color:var(--color-brand)]" defaultChecked />
          Hide Small Balances
        </label>
      </div>
    </section>
  )
}

function OBTable({ type }: { type: "asks" | "bids" }) {
  const rows = Array.from({ length: 10 }).map((_, i) => ({
    price: (type === "asks" ? 55 - i : 44 - i).toFixed(3),
    size: Math.floor(3000 + Math.sin(i) * 20000).toLocaleString(),
    total: Math.floor(30000 + i * 9000).toLocaleString(),
  }))

  const bg = type === "asks" ? "before:bg-[color:var(--color-down)]/20" : "before:bg-[color:var(--color-up)]/20"

  return (
    <div className="relative">
      <div className="grid grid-cols-3 text-[11px] text-foreground px-3 py-1">
        <div>Price</div>
        <div className="text-center">Size (BBCX)</div>
        <div className="text-right pr-3">Total (BBCX)</div>
      </div>
      <div className="text-xs">
        {rows.map((r, idx) => (
          <div
            key={idx}
            className={cn(
              "relative grid grid-cols-3 px-3 py-1",
              "before:absolute before:inset-y-0 before:right-0 before:w-[65%] before:rounded-l before:content-['']",
              bg,
            )}
          >
            {/* all text white */}
            <div className="text-foreground">{r.price}</div>
            <div className="text-center text-foreground">{r.size}</div>
            <div className="text-right pr-3 text-foreground">{r.total}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
