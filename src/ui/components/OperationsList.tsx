import { useState, useEffect } from "react";
import OperationCard from "./OperationCard";

export interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: Date;
}

export default function OperationsList({
  triggerError,
  cashRefreshKey,
  triggerCashRefresh,
}) {
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

  useEffect(() => {
    getCashFlow();
  }, [cashRefreshKey]);

  return (
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
  );
}
