import { useState } from "react";

export default function AddSaleModal({
  setShowAddSale,
  triggerError,
  triggerSaleRefresh,
}) {
  const [product, setProduct] = useState("");
  const [unitPrice, setValue] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [discount, setDiscount] = useState("");
  const [customer, setCustomer] = useState("");

  function handleNumberChange(e, input) {
    const v = e.target.value;

    if (input === "unitPrice") {
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
  }

  function handleQuantityChange(e) {
    const v = e.target.value;

    if (v === "") {
      setQuantity("");
      return;
    }

    if (/^[1-9]\d*$/.test(v)) {
      setQuantity(v);
    }
  }

  async function addSale(e) {
    e.preventDefault();
    if (!product || !quantity || !unitPrice) {
      triggerError("Um campo obrigatório não foi preenchido");
      return;
    }

    try {
      await window.electron.addSale(
        product,
        unitPrice,
        quantity,
        discount,
        customer
      );
      triggerSaleRefresh();
    } catch (error) {
      console.error("Falha ao adicionar venda: ", error);
      triggerError("Falha ao adicionar venda");
    }
    closeModal();
  }

  function closeModal() {
    setShowAddSale(false);
    setValue("");
    setDiscount("");
    setProduct("");
    setCustomer("");
  }

  return (
    <div className="modal-wrapper">
      <form onSubmit={(e) => addSale(e)} className="edit-cash-modal">
        <h2>Adicionar venda</h2>
        <p>produto</p>
        <input
          placeholder="Nome do produto"
          type="text"
          value={product}
          onChange={(e) => setProduct(e.target.value)}
          required
        />
        <p>preço</p>
        <input
          placeholder="00,00"
          type="text"
          value={unitPrice}
          onChange={(e) => handleNumberChange(e, "unitPrice")}
          inputMode="decimal"
          min="1"
          pattern="^\d*\.?\d*$"
          autoFocus
          required
        />
        <p>quantidade</p>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="0"
          step="1"
          required
        />
        <p>desconto</p>
        <input
          placeholder="00,00 (opcional)"
          type="text"
          value={discount}
          onChange={(e) => handleNumberChange(e, "discount")}
          inputMode="decimal"
          min="0"
          pattern="^\d*\.?\d*$"
        />
        <p>Nome do cliente</p>
        <input
          placeholder="(opcional)"
          type="text"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
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
