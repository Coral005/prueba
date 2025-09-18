// RegisterPage.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage({ handleRegister }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async () => {
    if (!email || !password || !confirmPassword) {
      alert("Completa todos los campos");
      return;
    }
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    await handleRegister(email, password);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/"); // Redirige al home
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", backgroundColor: "white", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)" }}>
      <h2 style={{ textAlign: "center" }}>Registrarse</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={e => setPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "10px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <input
        type="password"
        placeholder="Repetir Contraseña"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        style={{ width: "100%", marginBottom: "15px", padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <button
        onClick={onSubmit}
        style={{ width: "100%", padding: "12px", backgroundColor: "#4B6CB7", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Registrarse
      </button>
      <button
        onClick={() => navigate("/")}
        style={{ width: "100%", padding: "12px", marginTop: "10px", backgroundColor: "#ccc", color: "black", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Cancelar
      </button>
    </div>
  );
}

export default RegisterPage;
