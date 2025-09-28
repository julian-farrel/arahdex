import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export function BottomTabs() {
  return (
    <section className="rounded-lg border border-border bg-card p-0 overflow-hidden text-[10px]">
      <div className="px-2 pt-1">
        <Tabs defaultValue="balances">
          <TabsList className="w-full grid grid-cols-6">
            {["Balances", "Positions", "Open Orders", "TWAP", "Trade History", "Order History"].map((t) => (
              <TabsTrigger key={t} value={t.toLowerCase().replace(/ /g, "-")}>
                {t}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="balances" className="p-0">
            <div className="mt-1 overflow-x-auto">
              <table className="w-full">
                <thead className="text-[10px]">
                  <tr className="border-b border-border">
                    <th className="px-2 py-1 text-left font-normal">Coin</th>
                    <th className="px-2 py-1 text-left font-normal">Total Balance</th>
                    <th className="px-2 py-1 text-left font-normal">Available Balance</th>
                    <th className="px-2 py-1 text-left font-normal">USDC Value</th>
                    <th className="px-2 py-1 text-left font-normal">PNL (ROE %)</th>
                    <th className="px-2 py-1 text-left font-normal">Contract</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={6} className="px-2 py-2 text-center text-foreground/80">
                      No balances yet
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </TabsContent>

          {["positions", "open-orders", "twap", "trade-history", "order-history"].map((id) => (
            <TabsContent key={id} value={id} className="p-2 text-foreground/80">
              Empty state
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
