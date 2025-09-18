import React from "react";
import { useParams } from "react-router-dom";

export default function ProductPage({ addToCart, toggleFavorite, getFavorites }) {
  const { nombre } = useParams();

  // Array de productos (igual que en App.js)
  const productos = [
    { nombre: "Cargador inalámbrico 3 en 1", precio: 4500, imagen: "/images/cargador.jpg", descripcion: "Carga todos tus dispositivos a la vez.", puntos: ["Carga rápida", "Diseño minimalista", "Compatible con todos los dispositivos"] },
    { nombre: "Soporte móvil magnético rotatorio", precio: 3500, imagen: "/images/soporte.jpg", descripcion: "Soporte flexible y seguro para tu móvil.", puntos: ["Rotación 360°", "Fácil instalación", "Seguro y estable"] },
    { nombre: "Mini difusor aromas USB + LED", precio: 2500, imagen: "/images/difusor.jpg", descripcion: "Aromas y luz para tu escritorio.", puntos: ["Luz LED integrada", "Fácil de usar", "Portátil y silencioso"] },
    { nombre: "Localizador tipo AirTag", precio: 4000, imagen: "/images/localizador.jpg", descripcion: "Compatible con Android e iOS, nunca pierdas tus objetos.", puntos: ["Rastreo preciso", "Batería de larga duración", "Diseño compacto"] }
  ];

  // Buscar producto usando decodeURIComponent para manejar espacios u otros caracteres
  const product = productos.find(p => p.nombre === decodeURIComponent(nombre));

  if (!product) return <p style={{ textAlign: "center", marginTop: "50px" }}>Producto no encontrado</p>;

  const isFavorite = getFavorites().some(f => f.nombre === product.nombre);

  return (
    <div style={{
      maxWidth: "900px",
      margin: "40px auto",
      padding: "20px",
      display: "flex",
      flexWrap: "wrap",
      gap: "40px",
      fontFamily: "Arial, sans-serif"
    }}>
      <div style={{ flex: "1 1 300px" }}>
        <img 
          src={product.imagen} 
          alt={product.nombre} 
          style={{ width: "100%", borderRadius: "12px", objectFit: "cover" }} 
        />
      </div>
      <div style={{ flex: "1 1 300px" }}>
        <h2>{product.nombre}</h2>
        <h3 style={{ color: "#4B6CB7" }}>{(product.precio / 100).toFixed(2)} €</h3>

        <ul style={{ marginTop: "15px", paddingLeft: "20px" }}>
          {product.puntos.map((p, i) => <li key={i} style={{ marginBottom: "8px" }}>{p}</li>)}
        </ul>

        <p style={{ marginTop: "15px", color: "#555" }}>{product.descripcion}</p>

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button 
            onClick={() => addToCart(product)}
            style={{
              padding: "12px 24px",
              backgroundColor: "#4B6CB7",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#3a54a1"}
            onMouseLeave={e => e.currentTarget.style.background = "#4B6CB7"}
          >
            Añadir al carrito
          </button>

          <button 
            onClick={() => toggleFavorite(product)}
            style={{
              padding: "12px 24px",
              backgroundColor: isFavorite ? "red" : "#ccc",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
              transition: "background 0.2s"
            }}
            onMouseEnter={e => e.currentTarget.style.background = isFavorite ? "#c0392b" : "#bbb"}
            onMouseLeave={e => e.currentTarget.style.background = isFavorite ? "red" : "#ccc"}
          >
            {isFavorite ? "❤️ Favorito" : "🤍 Favorito"}
          </button>
        </div>
      </div>
    </div>
  );
}

