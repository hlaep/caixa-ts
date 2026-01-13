import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getStaticData: () => console.log("static"),
  getCashFlow: () => ipcRenderer.invoke("get-cash-flow"),
  addEditionCashFlow: (amount: number, reason: string) =>
    ipcRenderer.invoke("add-edition-cash-flow", amount, reason),
  getTotalBalance: () => ipcRenderer.invoke("get-total-balance"),
  deleteItemCashFlow: (id: number) =>
    ipcRenderer.invoke("delete-item-cash-flow", id),
});
