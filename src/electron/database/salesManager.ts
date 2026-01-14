import db from "./dbManager.js";

interface Sale {
  id: number;
  product: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  customer: string;
  createdAt: string | Date;
}

export function getSales(): Sale[] {
  const sql = "SELECT * FROM sales ORDER BY createdAt DESC";
  const statement = db.prepare(sql);
  const response = statement.all() as Sale[];
  return response;
}

function turnIntoNumber(value: string | number): number {
  const number = typeof value === "number" ? value : Number(value);

  if (Number.isNaN(number)) {
    throw new Error("Valor numérico inválido");
  }

  return number;
}

export function addSale(
  product: string,
  unitPrice: number | string,
  quantity: number | string,
  discount: number | string,
  customer: string
) {
  const numberUnitPrice: number = turnIntoNumber(unitPrice);
  const integerQuantity: number = Math.floor(turnIntoNumber(quantity));

  if (integerQuantity <= 0) {
    throw new Error("Quantidade deve ser maior que zero");
  }

  const numberDiscount: number = turnIntoNumber(discount);

  const sql = `INSERT INTO sales (product, unitPrice, quantity, discount, customer) VALUES (?, ?, ?, ?, ?)`;
  const statement = db.prepare(sql);

  return statement.run(
    product,
    numberUnitPrice,
    integerQuantity,
    numberDiscount,
    customer
  );
}
