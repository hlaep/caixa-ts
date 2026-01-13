import { useRef, useEffect } from "react";

export default function OptionsMenu({
  close,
  id,
  triggerError,
  triggerCashRefresh,
}) {
  const menuRef = useRef(null);

  async function deleteOperation() {
    try {
      await window.electron.deleteItemCashFlow(id);
      triggerCashRefresh();
    } catch (error) {
      triggerError("Ocorreu um erro ao tentar excluir movimentação");
      console.error("Erro ao deletar movimentação");
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        close();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [close]);

  return (
    <div className="options-menu" ref={menuRef}>
      <button onClick={() => deleteOperation()}>Excluir</button>
    </div>
  );
}
