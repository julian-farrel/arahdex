import { TopNav } from "@/components/top-nav"
import { MarketHeader } from "@/components/market-header"
import { ChartPanel } from "@/components/chart-panel"
import { OrderBook } from "@/components/order-book"
import { TradePanel } from "@/components/trade-panel"
import { BottomTabs } from "@/components/bottom-tabs"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopNav />

      <main className="px-3 md:px-4 pt-3 md:pt-4">
        <MarketHeader />

        <div className="mt-3 md:mt-4 grid grid-cols-1 lg:grid-cols-[minmax(0,70%)_minmax(0,15%)_minmax(0,15%)] gap-3 md:gap-4">
          <ChartPanel />
          <OrderBook />
          <TradePanel />
        </div>

        <div className="mt-2">
          <BottomTabs />
        </div>
      </main>
    </div>
  )
}
