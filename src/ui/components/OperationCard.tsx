import { formatBRL, formatDateHourMinute } from "../utilities";
import CardOptionsButton from "./CardOptionsButton";

interface OperationCardProps {
  amount: number;
  reason: string;
  createdAt: Date;
}

export default function OperationCard({
  amount,
  reason,
  createdAt,
}: OperationCardProps) {
  return (
    <div className="operation-card">
      <div className="info">
        <label>Movimentação:</label>
        <p className={amount < 0 ? "negative-amount" : "positive-amount"}>
          {amount > 0 && "+"}
          {formatBRL(amount)}
        </p>
      </div>
      <CardOptionsButton />

      <div className="info description">
        <label>Descrição:</label>
        <p>{reason || "(Sem descrição)"}</p>
      </div>

      <div className="time">
        <p>{formatDateHourMinute(createdAt)}</p>
      </div>
    </div>
  );
}
