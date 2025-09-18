// ProductPage.js
import React from "react";
import { useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function ProductPage({ addToCart, toggleFavorite, getFavorites, handleCheckout }) {
  const { nombre } = useParams();

  // Array de productos
  const productos = [
    {
      nombre: "Cepillo eléctrico",
      precio: 4500,
      imagen: "/images/cepillo.jpg",
      descripcion: "Cepillo facial eléctrico para una limpieza profunda y suave.",
      especificaciones: ["Cerdas suaves", "Recargable", "2 modos de limpieza"],
      uso: "Usar 2 minutos cada mañana y noche sobre piel húmeda."
    },
    {
      nombre: "Crema hidratante",
      precio: 3500,
      imagen: "/images/crema.jpg",
      descripcion: "Crema facial hidratante para todo tipo de piel.",
      especificaciones: ["Hidratación 24h", "Apta para piel sensible", "Fórmula ligera"],
      uso: "Aplicar mañana y noche sobre la piel limpia."
    },
    {
      nombre: "Retinol serum",
      precio: 5500,
      imagen: "/images/retinol.jpg",
      descripcion: "Serum antiarrugas con retinol para rejuvenecer tu piel.",
      especificaciones: ["Reduce arrugas", "Fórmula concentrada", "Vegano"],
      uso: "Aplicar 3 gotas sobre rostro limpio cada noche."
    }
  ];

  // Buscar producto con decodeURIComponent para manejar espacios
  const product = productos.find(p => p.nombre === decodeURIComponent(nombre));

  if (!product) return <p style={{ textAlign: "center", marginTop: "50px" }}>Producto no encontrado</p>;

  const isFavorite = getFavorites().some(f => f.nombre === product.nombre);

  const buttonStyle = {
    padding: "12px 24px",
    border: "none",
    borderRadius: "30px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
    transition: "0.2s",
    display: "inline-block",
  };

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "40px" }}>
        <div style={{ flex: "1 1 300px" }}>
          <img
            src={product.imagen}
            alt={product.nombre}
            style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }}
          />
        </div>

        <div style={{ flex: "1 1 300px" }}>
          {/* Nombre y precio */}
          <h2 style={{ marginBottom: "10px" }}>{product.nombre}</h2>
          <h3 style={{ color: "#333", marginBottom: "20px" }}>{(product.precio / 100).toFixed(2)} €</h3>

          {/* Estrellas de reseña (fijas a 5) */}
          <div style={{ color: "#FFD700", marginBottom: "20px" }}>
            {[...Array(5)].map((_, i) => <FaStar key={i} />)}
          </div>

          {/* Descripción */}
          <p style={{ color: "#555", marginBottom: "20px" }}>{product.descripcion}</p>

          {/* Especificaciones */}
          <div style={{ marginBottom: "20px" }}>
            <h4>Especificaciones:</h4>
            <ul>
              {product.especificaciones.map((item, idx) => <li key={idx}>{item}</li>)}
            </ul>
          </div>

          {/* Forma de uso */}
          <div style={{ marginBottom: "30px" }}>
            <h4>Forma de uso:</h4>
            <p>{product.uso}</p>
          </div>

          {/* Botones */}
          <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
            <button
              style={{ 
                ...buttonStyle,
                backgroundColor: "#F4DDD6",
                color: "#333",
              }}
              onClick={() => addToCart(product)}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#e6cfc6"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#F4DDD6"}
            >
              Añadir al carrito
            </button>

            <button
              style={{ 
                ...buttonStyle,
                backgroundColor: "#333",
                color: "#fff",
              }}
              onClick={() => handleCheckout([product])}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = "#555"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = "#333"}
            >
              Comprar ahora
            </button>

            <button
              style={{
                ...buttonStyle,
                backgroundColor: isFavorite ? "red" : "#ccc",
                color: "#fff",
              }}
              onClick={() => toggleFavorite(product)}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = isFavorite ? "#c0392b" : "#bbb"}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = isFavorite ? "red" : "#ccc"}
            >
              {isFavorite ? "❤️ Favorito" : "🤍 Favorito"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
