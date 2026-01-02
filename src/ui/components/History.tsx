import { useRef } from "react";
import calendar from "../assets/calendar.png";

export default function History() {
  const dateInputRef = useRef(null);
  const openCalendar = () => dateInputRef.current.showPicker();
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    console.log(selectedDate);
  };

  return (
    <div className="history">
      <header>
        <h2>Histórico de hoje. (depósitos, retiradas e vendas)</h2>
        <button title="Selecionar outra data" onClick={openCalendar}>
          <img src={calendar} alt="Calendário" />
        </button>
        <input
          ref={dateInputRef}
          type="date"
          onChange={handleDateChange}
          style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
        />
      </header>
    </div>
  );
}
