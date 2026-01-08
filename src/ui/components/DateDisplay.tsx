import { useRef } from "react";
import calendar from "../assets/calendar.png";

export default function DateDisplay() {
  const dateInputRef = useRef(null);

  const openCalendar = () => dateInputRef.current.showPicker();

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    console.log(selectedDate);
  };

  return (
    <div className="date-display">
      <h1>Hoje: 06/01/2026</h1>
      <button title="Selecionar outra data" onClick={openCalendar}>
        <img className="icon" src={calendar} alt="Calendário" />
      </button>
      <input
        ref={dateInputRef}
        type="date"
        onChange={handleDateChange}
        style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
      />
    </div>
  );
}
