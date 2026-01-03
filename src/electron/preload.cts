import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  getStaticData: () => console.log("static"),
  getCashFlow: () => ipcRenderer.invoke("get-cash-flow"),
  addEditionCashFlow: (amount: number, reason: string) =>
    ipcRenderer.invoke("add-edition-cash-flow", amount, reason),
});
