import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Mensaje enviado (simulado)!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Contacto</h2>
      <form onSubmit={handleSubmit} style={{ display: "inline-block", textAlign: "left", maxWidth: "400px" }}>
        <label>Nombre:</label>
        <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ width: "100%", marginBottom: "10px" }} />
        <label>Email:</label>
        <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={{ width: "100%", marginBottom: "10px" }} />
        <label>Mensaje:</label>
        <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ width: "100%", marginBottom: "10px" }} />
        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#4B6CB7", color: "white", border: "none", borderRadius: "5px" }}>Enviar</button>
      </form>
    </div>
  );
}
