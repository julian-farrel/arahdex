"use client"

export function ChartPanel() {
  return (
    <section className="relative rounded-lg border border-border bg-card p-0 overflow-hidden">
      <div className="relative h-[360px] md:h-[420px] lg:h-[520px]">
        <img
          src="/charts/BBCA TV.PNG" // Use your new image with the correct dimensions
          alt="Chart placeholder — replace this image with your API-driven chart later"
          className="h-full w-full object-cover" // Switch back to object-cover
          crossOrigin="anonymous"
        />
      </div>
    </section>
  )
}
