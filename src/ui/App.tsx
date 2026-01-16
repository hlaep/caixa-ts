import { useState } from "react";
import Cashier from "./components/Cashier";
import SalesList from "./components/SalesList";
import OperationsList from "./components/OperationsList";
import DateDisplay from "./components/DateDisplay";
import ErrorBanner from "./components/ErrorBanner";
import "./styles/History.css";
import "./styles/App.css";

export default function App() {
  const [cashRefreshKey, setCashRefreshKey] = useState<number>(0);
  const [saleRefreshKey, setSaleRefreshKey] = useState<number>(0);
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function triggerError(message: string, displayTime: number | null) {
    const time = displayTime ? displayTime : 4000;
    setErrorMessage(message);
    setErrorVisible(true);
    setTimeout(() => {
      setErrorMessage("");
      setErrorVisible(false);
    }, time + 1000);
  }

  return (
    <>
      <ErrorBanner visible={errorVisible} message={errorMessage} />
      <header>
        <DateDisplay />
        <Cashier
          cashRefreshKey={cashRefreshKey}
          saleRefreshKey={saleRefreshKey}
          triggerError={triggerError}
          triggerCashRefresh={() => setCashRefreshKey((k) => k + 1)}
          triggerSaleRefresh={() => setSaleRefreshKey((k) => k + 1)}
        />
      </header>
      <div className="history">
        <SalesList
          triggerError={triggerError}
          saleRefreshKey={saleRefreshKey}
          triggerSaleRefresh={() => setSaleRefreshKey((k) => k + 1)}
        />
        <OperationsList
          triggerError={triggerError}
          cashRefreshKey={cashRefreshKey}
          triggerCashRefresh={() => setCashRefreshKey((k) => k + 1)}
        />
      </div>
    </>
  );
}
