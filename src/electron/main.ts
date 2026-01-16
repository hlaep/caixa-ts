import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./util.js";
import { getPreloadPath } from "./pathResolver.js";
import { getTotalBalance } from "./database/dbManager.js";
import {
  getCashFlow,
  addEditionCashFlow,
  deleteItemCashFlow,
} from "./database/cashFlowManager.js";
import { addSale, getSales, deleteItemSales } from "./database/salesManager.js";

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

ipcMain.handle("get-cash-flow", () => {
  const response = getCashFlow();

  response.forEach((obj) => {
    obj.createdAt = new Date(obj.createdAt + "Z");
  });

  return response;
});

ipcMain.handle(
  "add-edition-cash-flow",
  (_event, amount: number, reason: string) => {
    return addEditionCashFlow(amount, reason);
  }
);

ipcMain.handle("get-total-balance", () => {
  return getTotalBalance();
});

ipcMain.handle(
  "delete-item",
  (_event, table: "cashFlow" | "sales", id: number) => {
    if (table === "cashFlow") {
      return deleteItemCashFlow(id);
    } else {
      return deleteItemSales(id);
    }
  }
);

ipcMain.handle(
  "add-sale",
  (_event, product, unitPrice, quantity, discount, customer) => {
    return addSale(product, unitPrice, quantity, discount, customer);
  }
);

ipcMain.handle("get-sales", () => {
  const response = getSales();

  response.forEach((obj) => {
    obj.createdAt = new Date(obj.createdAt + "Z");
  });

  return response;
});
