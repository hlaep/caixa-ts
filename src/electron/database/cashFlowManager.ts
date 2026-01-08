import db from "./dbManager.js";

interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: string | Date;
}

export function getCashFlow(): CashFlow[] {
  const sql = "SELECT * FROM cashFlow";
  const statement = db.prepare(sql);
  const response = statement.all() as CashFlow[];

  response.forEach((obj) => {
    obj.createdAt = new Date(obj.createdAt);
  });

  return response;
}

export function addEditionCashFlow(amount: number, reason: string) {
  const sql = `INSERT INTO cashFlow (amount, reason) VALUES (?, ?)`;
  const statement = db.prepare(sql);

  const result = statement.run(amount, reason);

  return { success: true, id: result.lastInsertRowid };
}
