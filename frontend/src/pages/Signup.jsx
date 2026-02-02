import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await fetch("http://127.0.0.1:8001/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) navigate("/");
    else alert("Signup failed");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Signup</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleSignup}>Create Account</button>
      <p>Already have account? <Link to="/">Login</Link></p>
    </div>
  );
}
