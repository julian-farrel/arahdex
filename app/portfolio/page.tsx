import { Button } from "@/components/ui/button";
import { HelpCircle, ArrowUpRight, Copy, Filter, X } from "lucide-react";
import React from "react";

// Define prop types for StatCard
type StatCardProps = {
  title: string;
  value: string;
  hasIcon?: boolean;
};

// Helper component for the summary cards
const StatCard: React.FC<StatCardProps> = ({ title, value, hasIcon = true }) => (
  <div className="bg-card p-4 rounded-lg border border-border">
    <div className="flex items-center text-sm text-muted-foreground">
      <span>{title}</span>
      {hasIcon && <HelpCircle className="h-3 w-3 ml-1.5" />}
    </div>
    <div className="text-2xl font-semibold mt-2">{value}</div>
  </div>
);

// Define prop types for PnlStat
type PnlStatProps = {
    label: string;
    value: string;
    hasIcon?: boolean;
};

// Helper component for PnL stats list
const PnlStat: React.FC<PnlStatProps> = ({ label, value, hasIcon = false }) => (
    <div className="flex justify-between items-center text-sm py-1.5">
        <div className="flex items-center text-muted-foreground">
            <span>{label}</span>
            {hasIcon && <Copy className="h-3 w-3 ml-2 text-muted-foreground/50" />}
        </div>
        <span className="font-mono">{value}</span>
    </div>
);

export default function PortfolioPage() {
  const positionTabs = ["Positions (1)", "Open Orders (2)", "Order History", "Trade History", "Funding History", "Liquidations"];
  
  return (
    <div className="p-8 bg-background text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Invite</Button>
          <Button size="sm" className="bg-[color:var(--brand)] hover:opacity-90 text-foreground">Deposit</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Equity" value="$42.70" />
        <StatCard title="Trading Equity" value="$42.70" />
        <StatCard title="Available Balance" value="$21.04" />
        <StatCard title="Public Pools Equity" value="-" />
      </div>

      {/* PnL & Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,2.5fr)] gap-4 mt-6">
        {/* PnL Details */}
        <div className="bg-card p-4 rounded-lg border border-border">
            <div className="flex justify-between items-center mb-2">
                <Button variant="ghost" size="sm" className="bg-background">Total Equity</Button>
                <Button variant="outline" size="sm">1M ⌄</Button>
            </div>
            <PnlStat label="PnL" value="-$5.07" hasIcon={true} />
            <PnlStat label="Volume" value="$206,326.79" />
            <PnlStat label="Return Percentage" value="-10.68%" />
            <PnlStat label="Average Daily PnL" value="-$0.84" hasIcon={true} />
            <PnlStat label="PnL Volatility" value="$7.06" hasIcon={true} />
            <PnlStat label="Sharpe Ratio" value="-2.28" hasIcon={true} />
            <PnlStat label="Maximum Drawdown" value="$17.48" hasIcon={true} />
        </div>

        {/* Chart Placeholder */}
        <div className="bg-card p-4 rounded-lg border border-border flex flex-col">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2 text-sm">
                    <button className="px-3 py-1 bg-background rounded-md">Total Equity</button>
                    <button className="px-3 py-1 text-muted-foreground">Cumulative PnL</button>
                    <button className="px-3 py-1 text-muted-foreground">Return Percentage</button>
                </div>
                 <Button variant="outline" size="sm">1M ⌄</Button>
            </div>
            <div className="flex-grow w-full h-48 md:h-full bg-background/50 rounded-md flex items-center justify-center">
              <p className="text-muted-foreground">Chart would be displayed here</p>
            </div>
        </div>
      </div>

      {/* Positions Table */}
      <div className="bg-card mt-6 rounded-lg border border-border">
        <div className="flex justify-between items-center p-2 border-b border-border overflow-x-auto">
            <div className="flex items-center gap-1 text-sm whitespace-nowrap">
                {positionTabs.map((tab, index) => (
                    <button key={tab} className={`px-3 py-1.5 rounded-md ${index === 0 ? 'bg-background font-semibold' : 'hover:bg-background/50'}`}>
                        {tab}
                    </button>
                ))}
            </div>
             <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground"><Filter className="h-4 w-4 mr-1"/>All</Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">⌄</Button>
            </div>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
                <thead className="text-muted-foreground">
                    <tr className="border-b border-border">
                        <th className="p-3 font-normal">Market</th>
                        <th className="p-3 font-normal">Size</th>
                        <th className="p-3 font-normal">Position Value</th>
                        <th className="p-3 font-normal">Entry Price</th>
                        <th className="p-3 font-normal">Mark Price</th>
                        <th className="p-3 font-normal">Liq. Price</th>
                        <th className="p-3 font-normal">Unrealized PnL</th>
                        <th className="p-3 font-normal">Margin</th>
                        <th className="p-3 font-normal">Funding</th>
                        <th className="p-3 font-normal">TP / SL</th>
                        <th className="p-3 font-normal text-right"><button className="text-[color:var(--down)] hover:underline">Close All</button></th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="border-b border-border hover:bg-background/30">
                        <td className="p-3"><span className="font-bold text-[color:var(--up)]">STBL 3x</span></td>
                        <td className="p-3 font-mono">139.9 STBL</td>
                        <td className="p-3 font-mono">$64.97</td>
                        <td className="p-3 font-mono">$0.42892</td>
                        <td className="p-3 font-mono">$0.46441</td>
                        <td className="p-3 font-mono">$0.16899</td>
                        <td className="p-3 text-[color:var(--up)] font-mono flex items-center">$4.97 (24.63%) <ArrowUpRight className="h-3 w-3 ml-1" /></td>
                        <td className="p-3 font-mono">$21.65</td>
                        <td className="p-3 text-[color:var(--down)] font-mono">-$0.19</td>
                        <td className="p-3 font-mono">$1.00000 / $0.36974</td>
                        <td className="p-3">
                            <div className="flex items-center justify-end gap-2">
                                <button className="hover:text-foreground text-muted-foreground"><Copy className="h-3.5 w-3.5"/></button>
                                <button className="hover:text-foreground text-muted-foreground"><X className="h-4 w-4"/></button>
                            </div>
                        </td>
                    </tr>
                    {/* You can add more rows here for other positions */}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

