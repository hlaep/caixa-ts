import { useState, useEffect } from "react";
import SaleCard from "./SaleCard";

interface Sale {
  id: number;
  product: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  customer: string;
  createdAt: Date;
}

export default function SalesList({
  triggerError,
  saleRefreshKey,
  triggerSaleRefresh,
}) {
  const [sales, setSales] = useState<Sale[]>([]);

  async function getSales() {
    try {
      const response = await window.electron.getSales();
      setSales(response);
    } catch (error) {
      triggerError("Erro ao carregar vendas.");
      console.error("Erro ao carregar vendas: ", error);
    }
  }

  useEffect(() => {
    getSales();
  }, [saleRefreshKey]);
  return (
    <section>
      <h2>Vendas</h2>
      {sales.map((sale) => (
        <SaleCard
          key={sale.id}
          id={sale.id}
          product={sale.product}
          unitPrice={sale.unitPrice}
          quantity={sale.quantity}
          discount={sale.discount}
          customer={sale.customer}
          createdAt={sale.createdAt}
          triggerError={triggerError}
          triggerSaleRefresh={triggerSaleRefresh}
        />
      ))}
      {sales.length < 1 && (
        <p className="empty-list-message">(Nenhuma movimentação)</p>
      )}
    </section>
  );
}
