import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getCashFlow: () => ipcRenderer.invoke("get-cash-flow"),
  addEditionCashFlow: (amount: number, reason: string) =>
    ipcRenderer.invoke("add-edition-cash-flow", amount, reason),
  getTotalBalance: () => ipcRenderer.invoke("get-total-balance"),
  deleteItemCashFlow: (id: number) =>
    ipcRenderer.invoke("delete-item-cash-flow", id),
  addSale: (
    product: string,
    unitPrice: number | string,
    quantity: number | string,
    discount: number | string,
    customer: string
  ) =>
    ipcRenderer.invoke(
      "add-sale",
      product,
      unitPrice,
      quantity,
      discount,
      customer
    ),
  getSales: () => ipcRenderer.invoke("get-sales"),
});
