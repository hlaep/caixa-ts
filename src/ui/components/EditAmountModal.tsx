import { useState } from "react";
import "../styles/EditAmountModal.css";

export default function EditAmountModal({ setShowEditCash, cashEditionType }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleAmountChange = (e) => {
    const v = e.target.value;

    if (v === "") {
      setAmount("");
      return;
    }

    if (/^\d*\.?\d*$/.test(v)) {
      setAmount(v);
    }
  };

  const closeModal = () => {
    setShowEditCash(false);
    setAmount("");
    setDescription("");
  };

  const editCash = (event, cashEditionType) => {
    event.preventDefault();
    console.log("mock", cashEditionType, amount, new Date(), description);
    closeModal();
  };
  return (
    <div className="modal-wrapper">
      <form
        onSubmit={(e) => editCash(e, cashEditionType)}
        className="edit-cash-modal"
      >
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
