export {};

declare global {
  interface Window {
    electron: {
      getCashFlow: () => Promise<any>;
      addEditionCashFlow: (amount: number, reason: string) => Promise<any>;
      getTotalBalance: () => Promise<number>;
      updateItemCashFlow: (id: number, values: any) => Promise<any>;
      deleteItem: (table: "cashFlow" | "sales", id: number) => Promise<any>;
      addSale: (
        product: string,
        unitPrice: number | string,
        quantity: number | string,
        discount: number | string,
        customer: string
      ) => Promise<any>;
      getSales: () => Promise<any>;
    };
  }
}
