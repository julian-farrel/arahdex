import { Button } from "@/components/ui/button";
import React from "react";

// Define prop types for StatCard
type StatCardProps = {
  title: string;
  value: string;
};

// Helper component for the summary cards
const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="bg-card p-4 rounded-lg border border-border">
    <div className="text-sm text-muted-foreground">{title}</div>
    <div className="text-2xl font-semibold mt-2 font-mono">{value}</div>
  </div>
);

// Mock data for the leaderboard table
const leaderboardData = [
  { rank: 1, trader: "0x9a9b**...****", points: "103297.46" },
  { rank: 2, trader: "0x15aa**...****", points: "100755.92" },
  { rank: 3, trader: "0x92a2**...****", points: "65686.79" },
  { rank: 4, trader: "0x6a4f**...****", points: "58042.04" },
  { rank: 5, trader: "0x4a4a**...****", points: "54561.96" },
  { rank: 6, trader: "0x2f35**...****", points: "53681.99" },
  { rank: 7, trader: "0x5f9b**...****", points: "53179.02" },
  { rank: 8, trader: "0x1a14**...****", points: "52954.97" },
  { rank: 9, trader: "0x8f9d**...****", points: "51457.54" },
  { rank: 10, trader: "0x6b9b**...****", points: "51441.68" },
];

const currentUserData = {
  rank: "113594",
  trader: "0x3c0D...7845",
  points: "0"
};

export default function LeaderboardPage() {
  return (
    <div className="p-8 bg-background text-foreground">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Points</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-card">Competition</Button>
          <Button variant="outline" size="sm">Invite</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">All</Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground">Last week</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Points" value="-" />
        <StatCard title="Rank" value="#113594" />
        <StatCard title="Total Referrals" value="0" />
        <StatCard title="Referral Points" value="-" />
      </div>

      {/* Leaderboard Table */}
      <div className="bg-card mt-6 rounded-lg border border-border">
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-muted-foreground">
                    <tr className="border-b border-border">
                        <th className="p-4 font-normal w-1/6">Rank</th>
                        <th className="p-4 font-normal w-3/6">Trader</th>
                        <th className="p-4 font-normal w-2/6">Points</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((user) => (
                        <tr key={user.rank} className="border-b border-border last:border-b-0 hover:bg-background/30">
                            <td className="p-4 font-mono">{user.rank}</td>
                            <td className="p-4 font-mono">{user.trader}</td>
                            <td className="p-4 font-mono">{user.points}</td>
                        </tr>
                    ))}
                    {/* Highlighted current user row */}
                    <tr className="bg-background/50 border-t-2 border-border">
                         <td className="p-4 font-mono">{currentUserData.rank}</td>
                         <td className="p-4 font-mono">{currentUserData.trader}</td>
                         <td className="p-4 font-mono">{currentUserData.points}</td>
                    </tr>
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
}

