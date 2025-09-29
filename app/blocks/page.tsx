import React from 'react';
import { Info } from 'lucide-react';

// Define prop types for a single transaction item
type TransactionItemProps = {
  type: string;
  status: string;
  account: string;
  hash: string;
  timestamp: string;
};

// Mock data for the transactions list
const transactions: TransactionItemProps[] = [
    { type: "L2CreateOrder", status: "Packed", account: "Account 151121", hash: "b96d6ffa2d285ca2849c782277057f836ef7ac2aa3bf3830ba70b3a3bfce70846e0e4af6c2844dcc", timestamp: "26 seconds ago" },
    { type: "InternalClaimOrder", status: "Packed", account: "Account 88832", hash: "000000234af0bc100000299938283ba000000000000000000000000000000000000000000000", timestamp: "26 seconds ago" },
    { type: "InternalClaimOrder", status: "Packed", account: "Account 281474976710868", hash: "000000234af0bc100000299938283ba00000000000000000000000000000000000000000000", timestamp: "26 seconds ago" },
    { type: "L2CreateOrder", status: "Packed", account: "Account 281474976710869", hash: "6667f9a26946344f34032352ce4cf2f0f95a210a84ef8f421618032f54c467da39e78f805698faa", timestamp: "26 seconds ago" },
    { type: "L2CreateOrder", status: "Packed", account: "Account 151976", hash: "2ba122dcc29c86844baaacdaadec756d7f3dfe5ed972048caa1b5aae60b7f8059c4b3fe574d129", timestamp: "26 seconds ago" },
    { type: "L2CreateOrder", status: "Packed", account: "Account 151300", hash: "d2021a9e0cb21ac565d6001c7980fc488fd198e01fa3500e4d8f95aae8d0882848448d53cdc2", timestamp: "26 seconds ago" },
];


// Helper component for each transaction item in the list
const TransactionItem: React.FC<TransactionItemProps> = ({ type, status, account, hash, timestamp }) => (
  <div className="flex justify-between items-center bg-card p-4 rounded-lg border border-border">
    <div className="flex items-center gap-4">
      <div>
        <div className="flex items-center gap-2">
            <span className="text-sm font-medium">{type}</span>
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-[color:var(--brand)] text-foreground">{status}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-1">{account}</div>
      </div>
    </div>
    <div className="flex items-center gap-6">
        <p className="text-sm font-mono text-muted-foreground truncate hidden md:block">
            <span className="text-foreground">↳</span> {hash}
        </p>
        <div className="text-xs text-muted-foreground whitespace-nowrap">{timestamp}</div>
    </div>
  </div>
);

export default function BlocksPage() {
  return (
    <div className="p-8 bg-background text-foreground">
      {/* Header section can be added here if it's not part of the global layout */}
      {/* For now, we assume TopNav is in layout.tsx */}

      {/* Beta Notice Banner */}
      <div className="bg-card border border-border rounded-lg p-3 flex items-center text-sm mb-6">
        <Info className="h-4 w-4 mr-3 text-muted-foreground" />
        <p>Block Explorer is currently in beta. We are working on new features and improvements.</p>
      </div>

      {/* Block Details Card */}
      <div className="bg-card p-6 rounded-lg border border-border mb-6">
        <h1 className="text-3xl font-bold font-mono mb-4">Block #54381647</h1>
        <div className="flex items-center text-sm">
            <span className="w-24 text-muted-foreground">Timestamp:</span>
            <span>9/29/2025, 10:27:21 AM</span>
        </div>
         <div className="flex items-center text-sm mt-2">
            <span className="w-24 text-muted-foreground">Status:</span>
            <span className="px-2 py-0.5 text-xs rounded-full border border-border bg-background">Pending</span>
        </div>
      </div>

      {/* Transactions List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Transactions (6)</h2>
        <div className="space-y-3">
            {transactions.map((tx, index) => (
                <TransactionItem key={index} {...tx} />
            ))}
        </div>
      </div>
    </div>
  );
}
