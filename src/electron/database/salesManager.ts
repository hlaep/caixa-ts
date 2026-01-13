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
