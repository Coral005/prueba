import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function ProductPage({ productos, addToCart }) {
  const { nombre } = useParams();
  const navigate = useNavigate();
  
  // Buscar el producto
  const producto = productos?.find(p => p.nombre === nombre);

  const [showSpecs, setShowSpecs] = useState(false);
  const [showUsage, setShowUsage] = useState(false);

  if (!producto) return <p style={{ textAlign: "center" }}>Producto no encontrado</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "40px auto", padding: "20px", textAlign: "center", background: "#fff", borderRadius: "10px" }}>
      <button onClick={() => navigate("/")} style={{ marginBottom: "20px", cursor: "pointer", border: "none", background: "none", fontSize: "16px" }}>
        ← Volver
      </button>

      <h2 style={{ marginBottom: "20px" }}>{producto.nombre}</h2>

      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{ maxWidth: "400px", width: "100%", height: "auto", borderRadius: "10px", marginBottom: "20px" }}
      />

      <p style={{ fontSize: "16px", marginBottom: "20px" }}>{producto.descripcion} - Descripción más larga para detallar características del producto.</p>

      {/* Desplegables */}
      <div style={{ textAlign: "left", maxWidth: "600px", margin: "0 auto 20px" }}>
        <div>
          <button onClick={() => setShowSpecs(!showSpecs)} style={{ width: "100%", textAlign: "left", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px", background: "#f7f7f7", cursor: "pointer", marginBottom: "5px" }}>
            Especificaciones {showSpecs ? "▲" : "▼"}
          </button>
          {showSpecs && (
            <div style={{ padding: "10px", border: "1px solid #eee", borderRadius: "5px", marginBottom: "10px" }}>
              Detalles completos de especificaciones del producto.
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setShowUsage(!showUsage)} style={{ width: "100%", textAlign: "left", padding: "10px", fontSize: "16px", border: "1px solid #ccc", borderRadius: "5px", background: "#f7f7f7", cursor: "pointer", marginBottom: "5px" }}>
            Forma de uso {showUsage ? "▲" : "▼"}
          </button>
          {showUsage && (
            <div style={{ padding: "10px", border: "1px solid #eee", borderRadius: "5px" }}>
              Instrucciones detalladas para usar el producto correctamente.
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => addToCart(producto)}
        style={{ padding: "12px 30px", fontSize: "16px", backgroundColor: "#6772E5", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}
      >
        Añadir al carrito
      </button>
    </div>
  );
}

export default ProductPage;
