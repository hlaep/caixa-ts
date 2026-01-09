import db from "./dbManager.js";

interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: string | Date;
}

export function getCashFlow(): CashFlow[] {
  const sql = "SELECT * FROM cashFlow ORDER BY createdAt DESC";
  const statement = db.prepare(sql);
  const response = statement.all() as CashFlow[];
  return response;
}

export function getTotalBalance(): number {
  const sql = `
    SELECT SUM(amount) AS total
    FROM cashFlow
  `;
  const statement = db.prepare(sql);
  const row = statement.get() as { total: number | null };

  return row.total ?? 0;
}

export function getCashFlowAmounts() {}

export function addEditionCashFlow(amount: number, reason: string) {
  const sql = `INSERT INTO cashFlow (amount, reason) VALUES (?, ?)`;
  const statement = db.prepare(sql);

  const result = statement.run(amount, reason);

  return { success: true, id: result.lastInsertRowid };
}
