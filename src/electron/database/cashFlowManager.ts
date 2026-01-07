import db from "./dbManager.js";

export function getCashFlow() {
  const sql = "SELECT * FROM cashFlow";
  const statement = db.prepare(sql);
  const response = statement.all();
  return response;
}

export function addEditionCashFlow(amount: number, reason: string) {
  const sql = `INSERT INTO cashFlow (amount, reason) VALUES (?, ?)`;
  const statement = db.prepare(sql);

  const result = statement.run(amount, reason);

  return { success: true, id: result.lastInsertRowid };
}
