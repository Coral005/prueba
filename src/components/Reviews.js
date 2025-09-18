import React from "react";

export default function Reviews() {
  const reviews = [
    { name: "Ana P.", text: "Excelente calidad, envío rápido." },
    { name: "Carlos M.", text: "Los productos son justo lo que buscaba." },
    { name: "Lucía R.", text: "Muy recomendable, atención impecable." }
  ];

  return (
    <div style={{ background: "#f9f9f9", padding: "50px 20px" }}>
      <h2 style={{ textAlign: "center" }}>Opiniones de clientes</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "40px", flexWrap: "wrap" }}>
        {reviews.map((r, i) => (
          <div key={i} style={{ border: "1px solid #ddd", padding: "20px", borderRadius: "10px", width: "250px" }}>
            <p><strong>{r.name}</strong></p>
            <p>{r.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
