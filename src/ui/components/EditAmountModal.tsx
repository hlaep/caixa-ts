import { useState } from "react";
import "../styles/EditAmountModal.css";

export default function EditAmountModal({
  setShowEditCash,
  cashEditionType,
  triggerCashRefresh,
  triggerError,
  cash,
}) {
  const [amount, setAmount] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  function handleAmountChange(e) {
    const v = e.target.value;

    if (v === "") {
      setAmount("");
      return;
    }

    if (/^\d*\.?\d*$/.test(v)) {
      setAmount(v);
    }
  }

  function closeModal() {
    setShowEditCash(false);
    setAmount("");
    setDescription("");
  }

  async function editCash(event) {
    event.preventDefault();
    const numberAmount = Number(amount);
    const finalAmount =
      cashEditionType === "add" ? numberAmount : -numberAmount;

    if (amount > cash && cashEditionType === "remove") {
      triggerError(
        "Não é possivel retirar um valor maior do que o disponível em caixa."
      );
      return;
    }
    try {
      await window.electron.addEditionCashFlow(finalAmount, description);
      triggerCashRefresh();
      closeModal();
    } catch (err) {
      console.error("Falha ao editar caixa", err);
    }
  }

  return (
    <div className="modal-wrapper">
      <form onSubmit={(e) => editCash(e)} className="edit-cash-modal">
        <h2>{cashEditionType === "add" ? "Depositar" : "Retirar"} valor</h2>

        <input
          placeholder="00,00"
          type="text"
          value={amount}
          onChange={(e) => handleAmountChange(e)}
          inputMode="decimal"
          min="0"
          pattern="^\d*\.?\d*$"
          autoFocus
          required
        />
        <input
          placeholder="Descrição (opcional)"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="buttons-container">
          <button
            onClick={() => closeModal()}
            className="cancel-btn"
            type="button"
          >
            Cancelar
          </button>
          <button type="submit">Confirmar</button>
        </div>
      </form>
    </div>
  );
}
