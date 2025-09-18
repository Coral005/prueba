// Header.js
import React from "react";
import { FaHeart, FaTrash, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header({
  loggedInUser,
  accountOpen,
  setAccountOpen,
  favOpen,
  setFavOpen,
  dropdownOpen,
  setDropdownOpen,
  getCart,
  getFavorites,
  handleLogout,
  removeFromCart,
  removeFavorite,
  handleCheckout,
}) {
  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 40px",
        background: "#F4DDD6", // color rosita nude
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 100,
        height: "100px",
      }}
    >
      {/* LOGO */}
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/images/logo.png" // ruta desde public
          alt="Logo Esencial"
          style={{
            height: "80px", // tamaño más grande
            objectFit: "contain",
          }}
        />
      </Link>

      {/* Menú derecho */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px", position: "relative" }}>
        {/* Cuenta */}
        <div
          style={{ cursor: "pointer", fontSize: "24px", color: "#333" }}
          onClick={() => setAccountOpen(!accountOpen)}
        >
          <FaUser />
          {accountOpen && !loggedInUser && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "35px",
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 1000,
                minWidth: "150px",
              }}
            >
              <Link to="/login" style={{ display: "block", marginBottom: "5px" }}>
                Iniciar sesión
              </Link>
              <Link to="/register" style={{ display: "block" }}>
                Registrarse
              </Link>
            </div>
          )}

          {accountOpen && loggedInUser && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "35px",
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 1000,
                minWidth: "150px",
              }}
            >
              <p style={{ marginBottom: "5px", fontWeight: "bold" }}>{loggedInUser.email}</p>
              <button
                onClick={handleLogout}
                style={{ width: "100%", padding: "8px", cursor: "pointer" }}
              >
                Cerrar sesión
              </button>
            </div>
          )}
        </div>

        {/* Favoritos */}
        <div
          style={{ position: "relative", fontSize: "28px", cursor: "pointer", color: "#333" }}
          onClick={() => setFavOpen(!favOpen)}
        >
          <FaHeart color={getFavorites().length ? "red" : "#333"} />
          {getFavorites().length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "4px 8px",
                fontSize: "14px",
              }}
            >
              {getFavorites().length}
            </span>
          )}
          {favOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "35px",
                width: "300px",
                maxHeight: "400px",
                overflowY: "auto",
                background: "white",
                color: "black",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 1000,
              }}
            >
              <h4 style={{ marginTop: 0 }}>Favoritos</h4>
              {getFavorites().length === 0 ? (
                <p>No hay favoritos</p>
              ) : (
                getFavorites().map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginBottom: "10px",
                      borderBottom: "1px solid #eee",
                      paddingBottom: "5px",
                    }}
                  >
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        marginRight: "10px",
                        borderRadius: "5px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: "bold",
                          fontSize: "12px",
                          color: "black",
                        }}
                      >
                        {item.nombre}
                      </p>
                      <p style={{ margin: 0, fontSize: "12px", color: "black" }}>
                        {(item.precio / 100).toFixed(2)} €
                      </p>
                    </div>
                    <button
                      onClick={() => removeFavorite(item.nombre)}
                      style={{
                        background: "red",
                        border: "none",
                        color: "white",
                        borderRadius: "5px",
                        padding: "5px",
                        cursor: "pointer",
                      }}
                    >
                      <FaTrash />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Carrito */}
        <div
          style={{ position: "relative", fontSize: "36px", cursor: "pointer", color: "#333" }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          🛒
          {getCart().length > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-10px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "4px 8px",
                fontSize: "14px",
              }}
            >
              {getCart().length}
            </span>
          )}
          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "45px",
                width: "320px",
                maxHeight: "400px",
                overflowY: "auto",
                background: "white",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "10px",
                zIndex: 1000,
              }}
            >
              <h4 style={{ marginTop: 0, color: "black" }}>Carrito</h4>
              {getCart().length === 0 ? (
                <p style={{ color: "black" }}>No hay productos</p>
              ) : (
                <>
                  {getCart().map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "5px",
                      }}
                    >
                      <img
                        src={item.imagen}
                        alt={item.nombre}
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                          marginRight: "10px",
                          borderRadius: "5px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <p
                          style={{
                            margin: 0,
                            fontWeight: "bold",
                            fontSize: "12px",
                            color: "black",
                          }}
                        >
                          {item.nombre}
                        </p>
                        <p style={{ margin: 0, fontSize: "12px", color: "black" }}>
                          {(item.precio / 100).toFixed(2)} €
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.nombre)}
                        style={{
                          background: "red",
                          border: "none",
                          color: "white",
                          borderRadius: "5px",
                          padding: "5px",
                          cursor: "pointer",
                        }}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={handleCheckout}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#6772E5",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Comprar todo
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
