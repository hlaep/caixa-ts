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

export function addEditionCashFlow(amount: number, reason: string) {
  const sql = `INSERT INTO cashFlow (amount, reason) VALUES (?, ?)`;
  const statement = db.prepare(sql);

  return statement.run(amount, reason);
}

export function deleteItemCashFlow(id: number) {
  const sql = `DELETE FROM cashFlow WHERE id = ?`;
  const statement = db.prepare(sql);

  return statement.run(id);
}
