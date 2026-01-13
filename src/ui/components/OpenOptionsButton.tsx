import { useState } from "react";
import OptionsMenu from "./OptionsMenu";
import optionsIcon from "../assets/options.png";

export default function OpenOptionsButton({
  id,
  triggerError,
  triggerCashRefresh,
}) {
  const [optionsVisible, setOptionsVisible] = useState<boolean>(false);

  return (
    <>
      <div className="options-button" onClick={() => setOptionsVisible(true)}>
        <img className="icon" src={optionsIcon} />
      </div>
      {optionsVisible && (
        <OptionsMenu
          close={() => setOptionsVisible(false)}
          id={id}
          triggerError={triggerError}
          triggerCashRefresh={triggerCashRefresh}
        />
      )}
    </>
  );
}
