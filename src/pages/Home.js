// Home.js
import React, { useRef } from "react";
import ProductCard from "../components/ProductCard";
import {
  FaWhatsapp,
  FaShippingFast,
  FaCheckCircle,
  FaHeadset,
  FaStar
} from "react-icons/fa";

const Home = ({ productos, addToCart, toggleFavorite, getFavorites }) => {
  const scrollRef = useRef(null);

  const reseñas = [
    { nombre: "Ana P.", comentario: "Productos elegantes y minimalistas. Muy recomendable.", estrellas: 5 },
    { nombre: "Carlos M.", comentario: "Entrega rápida y atención excelente.", estrellas: 5 },
    { nombre: "Laura R.", comentario: "Me encanta el diseño y la calidad de los productos.", estrellas: 5 },
    { nombre: "Javier L.", comentario: "Perfecto para un estilo minimalista y moderno.", estrellas: 5 },
    { nombre: "Marta S.", comentario: "Muy contenta con la compra, volveré a comprar.", estrellas: 5 },
  ];

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      {/* Hero / Banner superior */}
      <div
        style={{
          width: "100%",
          height: "450px",
          background: `url('/images/hero-minimalista.jpg') center/cover no-repeat`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.35)",
            zIndex: 1,
          }}
        ></div>
        <div style={{ position: "relative", zIndex: 2, maxWidth: "800px", padding: "0 20px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "700",
              letterSpacing: "2px",
              marginBottom: "20px",
              fontFamily: "'Helvetica Neue', sans-serif",
            }}
          >
            ESENCIAL
          </h1>
          <p style={{ fontSize: "20px", fontWeight: "300", lineHeight: "1.5", color: "#f0f0f0" }}>
            Descubre productos minimalistas que combinan elegancia, simplicidad y funcionalidad.
          </p>
        </div>
      </div>

      {/* Sección de productos horizontal centrada */}
      <div style={{ overflowX: "auto", padding: "20px" }}>
        <div style={{ display: "inline-flex", justifyContent: "center", gap: "20px", width: "100%" }}>
          {productos.map((prod, idx) => (
            <ProductCard
              key={idx}
              producto={prod}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              isFavorite={getFavorites().some((f) => f.nombre === prod.nombre)}
            />
          ))}
        </div>
      </div>

      {/* Beneficios de la marca – estilo moderno con iconos */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "60px auto",
          padding: "40px 20px",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <FaShippingFast size={40} color="#4B6CB7" style={{ marginBottom: "10px" }} />
          <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>Envíos rápidos</h3>
          <p style={{ fontSize: "16px", fontWeight: "300", color: "#555" }}>Recibe tus productos en tiempo récord.</p>
        </div>
        <div style={{ textAlign: "center" }}>
          <FaCheckCircle size={40} color="#4B6CB7" style={{ marginBottom: "10px" }} />
          <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>Calidad garantizada</h3>
          <p style={{ fontSize: "16px", fontWeight: "300", color: "#555" }}>
            Productos seleccionados con el máximo cuidado.
          </p>
        </div>
        <div style={{ textAlign: "center" }}>
          <FaHeadset size={40} color="#4B6CB7" style={{ marginBottom: "10px" }} />
          <h3 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>Soporte real</h3>
          <p style={{ fontSize: "16px", fontWeight: "300", color: "#555" }}>Estamos para ayudarte en todo momento.</p>
        </div>
      </div>

      {/* Sección de reseñas – estilo barra rosita nude */}
      <div style={{ backgroundColor: "#F4DDD6", padding: "50px 0" }}>
        <h2 style={{ textAlign: "center", color: "#333", fontSize: "28px", fontWeight: "700", marginBottom: "30px" }}>
          Lo que dicen nuestros clientes
        </h2>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "20px", maxWidth: "1200px", margin: "0 auto" }}>
          {reseñas.map((reseña, idx) => (
            <div
              key={idx}
              style={{
                flex: "1 1 300px",
                maxWidth: "300px",
                background: "white",
                borderRadius: "15px",
                padding: "20px",
                textAlign: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: "300", color: "#555", marginBottom: "10px" }}>
                "{reseña.comentario}"
              </p>
              <p style={{ fontWeight: "600", color: "#333", marginBottom: "10px" }}>— {reseña.nombre}</p>
              <div style={{ color: "#FFD700" }}>
                {[...Array(reseña.estrellas)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de Contacto – footer, debajo de reseñas */}
      <div
        style={{
          maxWidth: "600px",
          margin: "60px auto",
          padding: "40px 20px",
          background: "#f2f2f2",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          textAlign: "center",
        }}
      >
        <h2 style={{ marginBottom: "30px" }}>Contacto</h2>

        <div style={{ marginBottom: "30px" }}>
          <h3>Teléfonos</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "20px", fontSize: "18px" }}>
            <a
              href="https://wa.me/34625751451"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#25D366", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FaWhatsapp size={24} />
              625 751 451
            </a>
            <a
              href="https://wa.me/34606547265"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "#25D366", display: "flex", alignItems: "center", gap: "8px" }}
            >
              <FaWhatsapp size={24} />
              606 547 265
            </a>
          </div>
        </div>

        <div>
          <h3>Correo electrónico</h3>
          <a
            href="mailto:esencial@gmail.com"
            style={{ color: "#4B6CB7", textDecoration: "underline", fontSize: "18px", cursor: "pointer" }}
          >
            esencial@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
