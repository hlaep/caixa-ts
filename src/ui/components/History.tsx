import type { CashFlow } from "../App";
import OperationCard from "./OperationCard";

interface HistoryProps {
  cashFlowHistory: CashFlow[];
}

export default function History({ cashFlowHistory = [] }: HistoryProps) {
  return (
    <div className="history">
      <h2>Movimentações no Caixa</h2>

      <div>
        {cashFlowHistory.map((operation) => (
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
