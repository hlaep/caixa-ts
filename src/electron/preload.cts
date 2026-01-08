import { contextBridge, ipcRenderer } from "electron";
import type { CashFlowOrder } from "./database/cashFlowManager.js";

contextBridge.exposeInMainWorld("electron", {
  getStaticData: () => console.log("static"),
  getCashFlow: (order: CashFlowOrder) =>
    ipcRenderer.invoke("get-cash-flow", order),
  addEditionCashFlow: (amount: number, reason: string) =>
    ipcRenderer.invoke("add-edition-cash-flow", amount, reason),
});
