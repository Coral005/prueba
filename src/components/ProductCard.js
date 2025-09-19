import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ producto, addToCart, toggleFavorite, isFavorite }) => {
  return (
    <Link
      to={`/product/${encodeURIComponent(producto.nombre)}`}
      style={{ textDecoration: "none", color: "inherit", flex: "0 0 350px" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", cursor: "pointer" }}>
        <div
          style={{
            width: "100%",
            borderRadius: "20px",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
        </div>

        <div style={{ textAlign: "center", marginTop: "15px" }}>
          <h3 style={{ fontSize: "20px", fontWeight: "400", marginBottom: "8px" }}>
            {producto.nombre}
          </h3>
          <p style={{ fontSize: "15px", color: "#555", margin: "0 0 8px" }}>
            {producto.descripcion}
          </p>
          <p style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>
            {(producto.precio / 100).toFixed(2)} €
          </p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
            <button
              onClick={(e) => { e.preventDefault(); addToCart(producto); }}
              style={{ background: "none", border: "none", color: "#4B6CB7", fontSize: "16px", cursor: "pointer", fontWeight: "500" }}
            >
              Añadir al carrito
            </button>

            <button
              onClick={(e) => { e.preventDefault(); toggleFavorite(producto); }}
              style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: isFavorite ? "red" : "#aaa" }}
            >
              {isFavorite ? "❤️" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
