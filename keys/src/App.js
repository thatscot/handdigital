import "./App.css";
import { CONTROLS } from "./constants";
import { useSocket } from "./hooks/useSocket";
import { useState } from "react";

function App() {
  const { sendCommand, isConnected, error } = useSocket();
  const [command, setCommand] = useState("");
  const [isPressed, setIsPressed] = useState(false);

  const handleNewCommand = (prevCommand, command, isPressed) => {
    console.log({ command, prevCommand });
    if (isConnected && !error.message) {
      console.log({ isConnected });
      if (command !== prevCommand) {
        console.log("command ", command);
        if (prevCommand) sendCommand({ name: prevCommand, lifecycle: "end" });
        sendCommand({ name: command, lifecycle: "start" });
        
      }
    } else {
      if (error.message) console.log({ error });
    }
  };

  window.onkeydown = (event) => {
    setIsPressed(true);
    const key = event.key; // "a", "1", "Shift", etc.
    console.log(key);
    switch (key) {
      case "ArrowUp":
        console.log("blah");
        handleNewCommand(command, CONTROLS.get(key));
        setCommand(CONTROLS.get(key));
        break;
      case "ArrowDown":
        console.log("blah");
        handleNewCommand(command, CONTROLS.get(key));
        setCommand(CONTROLS.get(key));

        break;
      case "w":
        handleNewCommand(command, CONTROLS.get(key));
        setCommand(CONTROLS.get(key));

        break;
      case "a":
        handleNewCommand(command, CONTROLS.get(key));
        setCommand(CONTROLS.get(key));
        break;
      case "s":
        handleNewCommand(command, CONTROLS.get(key));
        setCommand(CONTROLS.get(key));
        break;
      case "d":
        handleNewCommand(command, CONTROLS.get(key));
        setCommand(CONTROLS.get(key));
        break;
      case " ":
        handleNewCommand(command, CONTROLS.get(key));
        setCommand(CONTROLS.get(key));
        break;
      default:
        console.log("Invalid Control");
        break;
    }
  };

  return (
    <div className="App">
      <h1>KEYPRESS DEMO</h1>

      <div id="wasd">
        <fieldset>
          <div id="controls">
            <label>FORWARDS</label>
            <button> W </button>
          </div>

          <div id="controls">
            <label>LEFT</label>
            <button>A</button>
          </div>

          <div id="controls">
            <label>BACKWARDS</label>
            <button>S</button>
          </div>

          <div id="controls">
            <label>RIGHT</label>
            <button>D</button>
          </div>

          <div id="controls">
            <label>UP</label>
            <button>
              <span className="bi-arrow-up"></span>
            </button>
          </div>

          <div id="controls">
            <label>DOWN</label>
            <button>
              <span className="bi-arrow-down"></span>
            </button>
          </div>

          <div id="controls">
            <label>LAND</label>
            <button>Spacebar</button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}

export default App;
