// 1. The TopNav import has been removed from here.
import { MarketHeader } from "@/components/market-header"
import { ChartPanel } from "@/components/chart-panel"
import { OrderBook } from "@/components/order-book"
import { TradePanel } from "@/components/trade-panel"
import { BottomTabs } from "@/components/bottom-tabs"

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* 2. The <TopNav /> component that was here has been deleted. */}

      <main className="px-3 pt-3 md:px-4 md:pt-4">
        <MarketHeader />

        <div className="mt-3 grid grid-cols-1 gap-3 md:mt-4 md:gap-4 lg:grid-cols-[minmax(0,70%)_minmax(0,15%)_minmax(0,15%)]">
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