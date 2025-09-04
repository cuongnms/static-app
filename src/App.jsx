import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("");

  const upload = () => {

    setCount((count) => count + 1);
    const evtSource = new EventSource(
      `http://192.168.0.103:8080/events?count=${count}`
    );

    evtSource.onopen = () => console.log("SSE connected ✅");

    evtSource.onmessage = (event) => {
      console.log(event);
      setMessage(event.data);
    };

    evtSource.onerror = (err) => {
      console.error("SSE error:", err);
      evtSource.close();
    };

    evtSource.close();
  };

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + CICD</h1>
      <h2>{message}</h2>
      <div className="card">
        <button onClick={() => upload()}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
