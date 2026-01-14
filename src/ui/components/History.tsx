import { useEffect, useState } from "react";
import OperationCard from "./OperationCard";
import SaleCard from "./SaleCard";
import "../styles/History.css";

interface Sale {
  id: number;
  product: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  customer: string;
  createdAt: Date;
}

export interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: Date;
}

export default function History({
  cashRefreshKey,
  triggerError,
  triggerCashRefresh,
}) {
  const [sales, setSales] = useState<Sale[]>([]);
  const [cashFlow, setCashFlow] = useState<CashFlow[]>([]);

  async function getCashFlow() {
    try {
      const response = await window.electron.getCashFlow();
      setCashFlow(response);
    } catch (error) {
      triggerError("Erro ao carregar movimentações de caixa.");
      console.error("Erro ao carregar movimentações de caixa: ", error);
    }
  }

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
    getCashFlow();
  }, [cashRefreshKey]);

  useEffect(() => {
    getSales();
  }, []);

  return (
    <div className="history">
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
          />
        ))}
      </section>
      <section>
        <h2>Movimentações no Caixa</h2>
        {cashFlow.map((operation) => (
          <OperationCard
            key={operation.id}
            id={operation.id}
            amount={operation.amount}
            reason={operation.reason}
            createdAt={operation.createdAt}
            triggerError={triggerError}
            triggerCashRefresh={triggerCashRefresh}
          />
        ))}
        {cashFlow.length < 1 && (
          <p className="empty-list-message">(Nenhuma movimentação)</p>
        )}
      </section>
    </div>
  );
}
