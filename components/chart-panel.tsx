"use client"

// 1. Add this import statement at the top
import TradingViewWidget from './TradingViewWidget';

export function ChartPanel() {
  return (
    <section className="relative rounded-lg border border-border bg-card p-0 overflow-hidden">
      <div className="relative h-[360px] md:h-[420px] lg:h-[520px]">
        
        {/* 2. Replace the old img tag with this component */}
        <TradingViewWidget />

      </div>  
    </section>
  )
}
