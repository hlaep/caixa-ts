export {};

declare global {
  interface Window {
    electron: {
      getCashFlow: () => Promise<any>;
      addEditionCashFlow: (amount: number, reason: string) => Promise<any>;
      getTotalBalance: () => Promise<number>;
      deleteItemCashFlow: (id: number) => Promise<any>;
      updateItemCashFlow: (id: number, values: any) => Promise<any>;
    };
  }
}
