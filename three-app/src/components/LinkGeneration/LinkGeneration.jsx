import { useEffect, useState } from "react";
import styles from "./LinkGeneration.module.css";

const CODE_STATES = {
  DEFAULT: "default",
  COPIED: "copied",
};

const BUTTON_STATES = {
  [CODE_STATES.DEFAULT]: "Copy",
  [CODE_STATES.COPIED]: "Copied! ✌️",
};

const LinkGeneration = () => {
  const [displayModal, setDisplayModel] = useState(false);
  const [codeState, setCodeState] = useState(CODE_STATES.DEFAULT);
  const code = "1234";

  function toggleModal() {
    setDisplayModel((prevDisplayModel) => !prevDisplayModel);
  }

  useEffect(() => {}, [displayModal]);

  function copyCode() {
    navigator.clipboard.writeText(code).then(
      () => {
        setCodeState(CODE_STATES.COPIED);
        setTimeout(() => {
          setCodeState(CODE_STATES.DEFAULT);
        }, 5000);
      },
      () => {}
    );
  }

  return (
    <>
      <div className={styles.linkButton} onClick={toggleModal}>
        <span className="material-symbols-outlined">link</span>
      </div>
      {displayModal && (
        <div className={styles.overlay}>
          <div className={styles.codeModal}>
            <div>
              <h1>Game code</h1>
              <p>Use to link your controller</p>
            </div>
            <div className={styles.gameCode}>
              {code.split("").map((char) => (
                <div className={styles.charDisplay}>{char}</div>
              ))}
            </div>
            <button onClick={copyCode} data-state={codeState}>
              <span>{BUTTON_STATES[codeState]}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export { LinkGeneration };
