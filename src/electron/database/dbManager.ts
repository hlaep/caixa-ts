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

export default db;
