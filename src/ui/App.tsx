import { useEffect, useState } from "react";
import Cashier from "./components/Cashier";
import EditAmountModal from "./components/EditAmountModal";
import "./styles/App.css";
import AddSaleModal from "./components/AddSaleModal";
import History from "./components/History";

export interface CashFlow {
  id: number;
  amount: number;
  reason: string;
  createdAt: string;
}

export default function App() {
  const [showEditCash, setShowEditCash] = useState<boolean>(false);
  const [showAddSale, setShowAddSale] = useState<boolean>(false);
  const [cashEditionType, setCashEditionType] = useState<string>("");
  const [cashFlowHistory, setCashFlowHistory] = useState<CashFlow[]>([]);

  async function getCashFlow() {
    try {
      const response = await window.electron.getCashFlow();
      setCashFlowHistory(response);
    } catch (error) {
      console.error("Erro ao carregar movimentações de caixa: ", error);
    }
  }

  useEffect(() => {
    getCashFlow();
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
      <History cashFlowHistory={cashFlowHistory} />
    </>
  );
}
