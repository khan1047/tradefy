import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => setMessage("Error connecting to backend 😞"));
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px", fontSize: "24px" }}>
      <h1>TradeFy Frontend</h1>
      <p style={{ marginTop: "20px" }}>{message}</p>
    </div>
  );
}

export default App;
