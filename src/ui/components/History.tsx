import { useEffect, useState } from "react";
import OperationCard from "./OperationCard";

export interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: Date;
}

export default function History() {
  const [cashFlow, setCashFlow] = useState<CashFlow[]>([]);

  async function getCashFlow() {
    try {
      const response = await window.electron.getCashFlow("newestToOldest");
      setCashFlow(response);
    } catch (error) {
      console.error("Erro ao carregar movimentações de caixa: ", error);
    }
  }

  useEffect(() => {
    getCashFlow();
  }, []);
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
