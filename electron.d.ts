export {};

declare global {
  interface Window {
    electron: {
      getCashFlow: () => Promise<any>;
      addEditionCashFlow: (amount: number, reason: string) => Promise<any>;
      getTotalBalance: () => Promise<number>;
    };
  }
}
