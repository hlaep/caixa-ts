import { useState } from "react";
import { formatBRL } from "../utilities";

export default function Cashier({
  setShowEditCash,
  setCashEditionType,
  setShowAddSale,
}) {
  const [cash, setCash] = useState<number>(0);

  const showModal = (modalType) => {
    if (modalType === "add" || modalType === "remove") {
      setCashEditionType(modalType);
      setShowEditCash(true);
      setCash(0);
    } else if (modalType === "sale") {
      setShowAddSale(true);
    } else {
      throw new Error(`Invalid modal type: ${modalType}`);
    }
  };

  return (
    <div className="cashier">
      <div className="amount">
        <h2>Valor em caixa:</h2>
        <p>{formatBRL(cash)}</p>
      </div>
      <div className="buttons-container">
        <button onClick={() => showModal("add")}>Depositar valor</button>
        <button onClick={() => showModal("remove")}>Retirar valor</button>
        <button onClick={() => showModal("sale")}>Registrar venda</button>
      </div>
    </div>
  );
}
