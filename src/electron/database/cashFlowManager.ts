import db from "./dbManager.js";

interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: string | Date;
}

export type CashFlowOrder = "newestToOldest" | "oldestToNewest";

export function getCashFlow(order: CashFlowOrder): CashFlow[] {
  const sql =
    order === "newestToOldest"
      ? "SELECT * FROM cashFlow ORDER BY createdAt DESC"
      : "SELECT * FROM cashFlow ORDER BY createdAt ASC";
  const statement = db.prepare(sql);
  const response = statement.all() as CashFlow[];
  return response;
}

export function addEditionCashFlow(amount: number, reason: string) {
  const sql = `INSERT INTO cashFlow (amount, reason) VALUES (?, ?)`;
  const statement = db.prepare(sql);

  const result = statement.run(amount, reason);

  return { success: true, id: result.lastInsertRowid };
}
