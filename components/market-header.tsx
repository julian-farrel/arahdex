import { Star } from "lucide-react"

export function MarketHeader() {
  return (
    <section className="rounded-lg border border-border bg-card p-3">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <button className="rounded-full p-1.5 hover:bg-muted/30" aria-label="Favorite">
            <Star className="h-4 w-4 text-muted-foreground" />
          </button>
          <div className="text-sm font-semibold">BBCX/USDC</div>
          <span className="rounded-full bg-[color:var(--color-brand)]/30 px-2 py-0.5 text-[11px] text-foreground">
            Perps
          </span>
        </div>

        <div className="ml-auto grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-muted-foreground sm:grid-cols-3 lg:grid-cols-6">
          <Metric label="Price" value="46.2" />
          <Metric label="24h Change" value="+0.463 / +1.05%" accent="up" />
          <Metric label="24h Volume" value="10,364,848.48 USDC" />
          <Metric label="Market Cap" value="56.03B USDC" />
          <Metric label="Contract" value="0x0d01...11ec" />
          <Metric label="Network" value="Hyper" />
        </div>
      </div>
    </section>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[11px]">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  )
}
