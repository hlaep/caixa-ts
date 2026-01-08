export {};

declare global {
  interface Window {
    electron: {
      getCashFlow: (order: "newestToOldest" | "oldestToNewest") => Promise<any>;
      addEditionCashFlow: (amount: number, reason: string) => Promise<any>;
    };
  }
}
