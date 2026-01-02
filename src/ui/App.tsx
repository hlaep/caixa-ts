import { useEffect, useState } from "react";
import Cashier from "./components/Cashier.jsx";
import EditAmountModal from "./components/EditAmountModal.jsx";
import "./styles/App.css";
import AddSaleModal from "./components/AddSaleModal.jsx";
import History from "./components/History.jsx";

export default function App() {
  const [showEditCash, setShowEditCash] = useState(false);
  const [showAddSale, setShowAddSale] = useState(false);
  const [cashEditionType, setCashEditionType] = useState("");

  useEffect(() => {
    window.electron.getCashFlow().then((data) => {
      console.log(data);
    });
  }, []);

  return (
    <>
      <Cashier
        setShowEditCash={setShowEditCash}
        setCashEditionType={setCashEditionType}
        setShowAddSale={setShowAddSale}
      />
      {showEditCash && (
        <EditAmountModal
          setShowEditCash={setShowEditCash}
          cashEditionType={cashEditionType}
        />
      )}
      {showAddSale && <AddSaleModal setShowAddSale={setShowAddSale} />}
      <History />
    </>
  );
}
