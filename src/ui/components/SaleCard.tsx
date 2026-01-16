import { formatDateHourMinute, formatBRL } from "../utilities";
import OpenOptionsButton from "./OpenOptionsButton";

interface SaleCardProps {
  id: number;
  product: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  customer: string;
  createdAt: Date;
  triggerError: any;
  triggerSaleRefresh: any;
}

export default function SaleCard({
  id,
  product,
  unitPrice,
  quantity,
  discount,
  customer,
  createdAt,
  triggerError,
  triggerSaleRefresh,
}: SaleCardProps) {
  return (
    <div className="sale-card card">
      <ul>
        <li>
          <p className="product-name">{product}</p>
        </li>
        <li>
          <label>Cliente: </label>
          <p>{customer || "(não especificado)"}</p>
        </li>
        <li>
          <label>Total Cobrado: </label>
          <p className="positive-amount">
            {formatBRL(unitPrice * quantity - discount)}
          </p>
        </li>
      </ul>
      <div className="vertical-divider" />
      <ul>
        <li>
          <label>Preço: </label>
          <p>{formatBRL(unitPrice)}</p>
        </li>
        <li>
          <label>Quantidade:</label>
          <p>{quantity}</p>
        </li>
        <li>
          <label>Desconto:</label>
          {discount ? (
            <p className="negative-amount"> {formatBRL(-discount)}</p>
          ) : (
            <p>(Sem disconto)</p>
          )}
        </li>
      </ul>
      <OpenOptionsButton
        id={id}
        table={"sales"}
        triggerError={triggerError}
        triggerCashRefresh={triggerSaleRefresh}
      />

      <div className="time">
        <p>{formatDateHourMinute(createdAt)}</p>
      </div>
    </div>
  );
}
