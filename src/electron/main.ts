import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import { getCashFlow, addEditionCashFlow } from "./database/cashFlowManager.js";
import type { CashFlowOrder } from "./database/cashFlowManager.js";

app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath(),
    },
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }
});

ipcMain.handle("get-cash-flow", (_event, order: CashFlowOrder) => {
  const response = getCashFlow(order);

  response.forEach((obj) => {
    obj.createdAt = new Date(obj.createdAt);
  });

  return response;
});

ipcMain.handle(
  "add-edition-cash-flow",
  (_event, amount: number, reason: string) => {
    return addEditionCashFlow(amount, reason);
  }
);
