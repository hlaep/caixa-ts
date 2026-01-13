import { useState } from "react";
import Cashier from "./components/Cashier";
import "./styles/App.css";
import History from "./components/History";
import DateDisplay from "./components/DateDisplay";
import ErrorBanner from "./components/ErrorBanner";

export default function App() {
  const [cashRefreshKey, setCashRefreshKey] = useState<number>(0);
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
          triggerError={triggerError}
          triggerCashRefresh={() => setCashRefreshKey((k) => k + 1)}
        />
      </header>
      <History
        cashRefreshKey={cashRefreshKey}
        triggerError={triggerError}
        triggerCashRefresh={() => setCashRefreshKey((k) => k + 1)}
      />
    </>
  );
}
