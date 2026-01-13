import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";

const dbPath = path.join(app.getPath("userData"), "database.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS cashFlow (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    amount REAL NOT NULL,
    reason TEXT,
    createdAt TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

db.exec(`
CREATE TABLE IF NOT EXISTS sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product TEXT NOT NULL,
  unitPrice REAL NOT NULL,
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  discount REAL DEFAULT 0,
  customer TEXT,
  createdAt TEXT DEFAULT CURRENT_TIMESTAMP
);
`);

export function getTotalBalance(): number {
  const sql = `
    SELECT
      COALESCE(
        (SELECT SUM(amount) FROM cashFlow), 0
      ) +
      COALESCE(
        (SELECT SUM((unitPrice * quantity) - discount) FROM sales), 0
      ) AS total
  `;
  const statement = db.prepare(sql);
  const row = statement.get() as { total: number };

  return row.total ?? 0;
}

export default db;
