import db from "./dbManager.js";

export const getCashFlow = () => {
  const sql = "SELECT * FROM cashFlow";
  const statment = db.prepare(sql);
  let response = statment.all();
  return response;
};
