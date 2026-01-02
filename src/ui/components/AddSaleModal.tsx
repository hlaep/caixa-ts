import { useState } from "react";

export default function AddSaleModal({ setShowAddSale }) {
  const [value, setValue] = useState("");
  const [discount, setDiscount] = useState("");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");

  const handleNumberChange = (e, input) => {
    const v = e.target.value;

    if (input === "value") {
      if (v === "") {
        setValue("");
        return;
      }

      if (/^\d*\.?\d*$/.test(v)) {
        setValue(v);
      }
    } else if (input === "discount") {
      if (v === "") {
        setDiscount("");
        return;
      }

      if (/^\d*\.?\d*$/.test(v)) {
        setDiscount(v);
      }
    }
  };

  const addSale = (e) => {
    e.preventDefault();
    console.log("mock", value, discount, product, description, new Date());
    closeModal();
  };

  const closeModal = () => {
    setShowAddSale(false);
    setValue("");
    setDiscount("");
    setProduct("");
    setDescription("");
  };

  return (
    <div className="modal-wrapper">
      <form onSubmit={(e) => addSale(e)} className="edit-cash-modal">
        <h2>Adicionar venda</h2>
        <p>valor</p>
        <input
          placeholder="00,00"
          type="text"
          value={value}
          onChange={(e) => handleNumberChange(e, "value")}
          inputMode="decimal"
          min="0"
          pattern="^\d*\.?\d*$"
          autoFocus
          required
        />
        <p>desconto (opcional)</p>
        <input
          placeholder="00,00"
          type="text"
          value={discount}
          onChange={(e) => handleNumberChange(e, "discount")}
          inputMode="decimal"
          min="0"
          pattern="^\d*\.?\d*$"
        />
        <p>produto</p>
        <input
          placeholder="Nome do produto"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
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
