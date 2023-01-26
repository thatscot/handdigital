import React from "react";

function actionByKey(key) {
  const keys = {
    KeyW: "moveForward",
    KeyS: "moveBackward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    ShiftLeft: "moveUp",
    Space: "moveDown",
    KeyC: "changeCamera"
  };
  return keys[key];
}

export const useKeyboardControls = () => {
  const [movement, setMovement] = React.useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    moveUp: false,
    moveDown: false
  });

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      // Movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: true }));
      }
    };
    const handleKeyUp = (e) => {
      // Movement key
      if (actionByKey(e.code)) {
        setMovement((state) => ({ ...state, [actionByKey(e.code)]: false }));
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return movement;
};

export const toggleKeyboardKey = () => {
    const [movement, setMovement] = React.useState({
      changeCamera: false
    });
  
    React.useEffect(() => {
      const handleKeyUp = (e) => {
        // Movement key
        if (actionByKey(e.code)) {
            setMovement((state) => ({ ...state, [actionByKey(e.code)]: !state[actionByKey(e.code)] }));
        }
      };
  
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
  
    return movement;
  };
