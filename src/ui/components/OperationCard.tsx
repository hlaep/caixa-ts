import { formatBRL, formatDateHourMinute } from "../utilities";
import OpenOptionsButton from "./OpenOptionsButton";

interface OperationCardProps {
  id: number;
  amount: number;
  reason: string;
  createdAt: Date;
  triggerError: (message: string) => void;
  triggerCashRefresh: any;
}

export default function OperationCard({
  id,
  amount,
  reason,
  createdAt,
  triggerError,
  triggerCashRefresh,
}: OperationCardProps) {
  return (
    <div className="operation-card card">
      <div className="info">
        <label>Movimentação:</label>
        <p className={amount < 0 ? "negative-amount" : "positive-amount"}>
          {amount > 0 && "+"}
          {formatBRL(amount)}
        </p>
      </div>

      <OpenOptionsButton
        id={id}
        table={"cashFlow"}
        triggerError={triggerError}
        triggerCashRefresh={triggerCashRefresh}
      />

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
