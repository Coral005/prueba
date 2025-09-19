// ProductPage.js
import React from "react";
import { useParams } from "react-router-dom";

const ProductPage = ({ productos, addToCart, stripePromise }) => {
  const { nombre } = useParams();
  const producto = productos.find(p => p.nombre === nombre);

  if (!producto) return <div>Producto no encontrado</div>;

  const handleBuyNow = async (producto) => {
    try {
      const res = await fetch("http://localhost:4000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ ...producto, quantity: 1 }] // quantity incluido
        })
      });
      const data = await res.json();
      if (!data?.id) return alert("Error al crear sesión de pago");

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.id });
    } catch (err) {
      console.error(err);
      alert("Error de conexión con Stripe");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "36px", marginBottom: "20px" }}>{producto.nombre}</h1>
      <img
        src={producto.imagen}
        alt={producto.nombre}
        style={{ width: "100%", maxHeight: "400px", objectFit: "cover", marginBottom: "20px" }}
      />
      <p style={{ marginBottom: "20px" }}>{producto.descripcion}</p>
      <p style={{ fontWeight: "700", fontSize: "20px", marginBottom: "20px" }}>
        Precio: {(producto.precio / 100).toFixed(2)} €
      </p>
      <div style={{ display: "flex", gap: "20px" }}>
        <button
          onClick={() => addToCart(producto)}
          style={{ padding: "10px 20px", background: "#4B6CB7", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Añadir al carrito
        </button>
        <button
          onClick={() => handleBuyNow(producto)}
          style={{ padding: "10px 20px", background: "#25D366", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
        >
          Comprar ahora
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
