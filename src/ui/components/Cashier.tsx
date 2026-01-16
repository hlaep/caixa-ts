import { useState, useEffect } from "react";
import { formatBRL } from "../utilities";
import EditAmountModal from "./EditAmountModal";
import AddSaleModal from "./AddSaleModal";

export default function Cashier({
  cashRefreshKey,
  saleRefreshKey,
  triggerError,
  triggerCashRefresh,
  triggerSaleRefresh,
}) {
  const [cash, setCash] = useState<number>(0);
  const [showEditCash, setShowEditCash] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string>("");
  const [showAddSale, setShowAddSale] = useState<boolean>(false);

  async function getTotalBalance() {
    try {
      const response = await window.electron.getTotalBalance();
      setCash(response);
    } catch (error) {
      triggerError("Erro ao carregar valor em caixa");
      console.error("Erro ao carregar valor em caixa: ", error);
    }
  }

  useEffect(() => {
    getTotalBalance();
  }, [cashRefreshKey, saleRefreshKey]);

  const showModal = (modalType) => {
    if (modalType === "add" || modalType === "remove") {
      setActiveModal(modalType);
      setShowEditCash(true);
    } else if (modalType === "sale") {
      setShowAddSale(true);
    } else {
      triggerError(
        "Ocorreu um erro, reinicie a aplicação ou entre em contato com o desenvolvedor."
      );
      throw new Error(`Invalid modal type: ${modalType}`);
    }
  };

  return (
    <div className="cashier">
      {showEditCash && (
        <EditAmountModal
          setShowEditCash={setShowEditCash}
          activeModal={activeModal}
          triggerCashRefresh={triggerCashRefresh}
          triggerError={triggerError}
          cash={cash}
        />
      )}
      {showAddSale && (
        <AddSaleModal
          setShowAddSale={setShowAddSale}
          triggerSaleRefresh={triggerSaleRefresh}
          triggerError={triggerError}
        />
      )}
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
