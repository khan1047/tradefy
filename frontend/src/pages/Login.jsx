import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/auth.api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await loginUser({ email, password });

    // store user email for UI
    localStorage.setItem("tradefy_user", email);

    // token is stored INSIDE loginUser()
    navigate("/home");
  } catch (err) {
    alert("Login failed");
  }
};

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
      <button onClick={handleLogin}>Login</button>
      <p>No account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}
