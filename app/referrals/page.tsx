import { Button } from "@/components/ui/button";
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define prop types for StatCard
type StatCardProps = {
  title: string;
  value: string;
};

// Helper component for the summary cards
const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-card p-4 rounded-lg border border-border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-3xl font-semibold mt-2 font-mono">{value}</div>
  </div>
);

export default function ReferralsPage() {
  return (
    <div className="p-8 bg-background text-foreground">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold">Referrals</h1>
          <p className="text-muted-foreground mt-1">
            Refer users to earn rewards. <a href="#" className="underline hover:text-foreground">Learn more</a>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">Enter Code</Button>
          <Button variant="outline" size="sm">Create Code</Button>
          <Button size="sm" className="bg-[color:var(--brand)] hover:opacity-90 text-foreground">Claim Rewards</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Traders Referred" value="0" />
        <StatCard title="Rewards Earned" value="$0.00" />
        <StatCard title="Claimable Rewards" value="$0.00" />
      </div>

      {/* Referrals Table */}
      <div className="bg-card mt-6 rounded-lg border border-border">
        {/* Tabs */}
        <div className="flex items-center border-b border-border">
          <button className="px-4 py-3 text-sm font-semibold border-b-2 border-[color:var(--brand)]">
            Referrals
          </button>
          <button className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground">
            Legacy Reward History
          </button>
        </div>

        {/* Table Content */}
        <div className="min-h-[300px] flex flex-col justify-between">
            {/* Table Header */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-muted-foreground">
                        <tr className="border-b border-border">
                            <th className="p-4 font-normal w-1/4">Address</th>
                            <th className="p-4 font-normal w-1/4">Date Joined</th>
                            <th className="p-4 font-normal w-1/4">Total Volume ⌄</th>
                            <th className="p-4 font-normal w-1/4">Fees Paid</th>
                            <th className="p-4 font-normal w-1/4">Your Rewards</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} className="text-center p-10 text-muted-foreground">
                                No referrals yet
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Pagination/Footer */}
            <div className="flex justify-end items-center p-4 text-sm text-muted-foreground border-t border-border">
                <span>1-0 of 0</span>
                <div className="flex items-center ml-4">
                    <button className="p-1 disabled:opacity-50" disabled><ChevronLeft className="h-4 w-4" /></button>
                    <button className="p-1 disabled:opacity-50" disabled><ChevronRight className="h-4 w-4" /></button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
