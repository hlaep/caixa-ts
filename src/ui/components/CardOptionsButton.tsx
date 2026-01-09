import optionsIcon from "../assets/options.png";

export default function CardOptionsButton() {
  function showOptions() {}
  return (
    <>
      <div className="options-menu">
        <button>Editar </button>
        <div className="divider" />
        <button>Excluir</button>
      </div>
      <div className="options-button" onClick={() => showOptions()}>
        <img className="icon" src={optionsIcon} />
      </div>
    </>
  );
}
