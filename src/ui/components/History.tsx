import { useEffect, useState } from "react";
import OperationCard from "./OperationCard";
import "../styles/History.css";

export interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: Date;
}

export default function History({ cashRefreshKey, triggerError }) {
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
    <div className="history">
      <h2>Movimentações no Caixa</h2>

      <div>
        {cashFlow.map((operation) => (
          <OperationCard
            key={operation.id}
            amount={operation.amount}
            reason={operation.reason}
            createdAt={operation.createdAt}
          />
        ))}
      </div>
    </div>
  );
}
