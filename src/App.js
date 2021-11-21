import "./App.css";
import axios from "axios";
import openSocket from "socket.io-client";
import React from "react";
import { useState, useEffect, useRef } from "react";

function App() {
  const socket = openSocket("ws://localhost:8080");
  const [socketId, setSocketId] = useState("");
  const [collection, setCollection] = useState([]);
  const [option, setOption] = useState("doctor");
  // a

  socket.on("connect", () => {
    setSocketId(socket.id);
    // socketId.current.value = socket.id;
  });

  const sendSocketIO = (e) => {
    e.preventDefault();
    socket.emit("example_message", "demo");
  };
  const fetchCollection = (e) => {
    e.preventDefault();
    // http://localhost:5000/appointment
    axios.get(`http://localhost:5000/${option}`).then((res) => {
      setCollection(JSON.stringify(res.data, null, 2));
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <p
          style={{
            fontSize: "20px",
          }}
        >
          {socketId}
        </p>
        <h1>Ay yo</h1>
        <form>
          <select
            name="collections"
            id=""
            onChange={(e) => setOption(e.target.value)}
          >
            <option value="doctor">doctors</option>
            <option value="patient">patients</option>
            <option value="appointment">appointments</option>
          </select>
          <button onClick={fetchCollection}>get</button>
          <button onClick={sendSocketIO}>send a socket </button>
        </form>
        <pre>{collection}</pre>
      </header>
    </div>
  );
}

export default App;
