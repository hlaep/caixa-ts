import { formatBRL } from "../utilities";

interface OperationCardProps {
  amount: number;
  reason: string;
  createdAt: string;
}

export default function OperationCard({
  amount,
  reason,
  createdAt,
}: OperationCardProps) {
  return (
    <div className="operation-card">
      <div className="short-info-container">
        <div className="info">
          <label>Movimentação:</label>
          <p className={amount < 0 ? "negative-amount" : "positive-amount"}>
            {amount > 0 && "+"}
            {formatBRL(amount)}
          </p>
        </div>
        <div className="vertical-divider" />
        <div className="info">
          <label>Data:</label>
          <p>{createdAt}</p>
        </div>
      </div>

      <div className="info description">
        <label>Descrição:</label>
        <p>{reason || "(Sem descrição)"}</p>
      </div>
    </div>
  );
}
