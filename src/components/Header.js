// Header.js
import React from "react";
import { FaHeart, FaTrash, FaUser, FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

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
  setUserData,
  setGuestCart, // <-- añadido
}) {
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTerm = e.target.elements.search.value.trim();
    if (!searchTerm) return;
    navigate(`/search/${encodeURIComponent(searchTerm)}`);
    e.target.reset();
  };

  const handleClearCart = () => {
    if (loggedInUser) {
      const id = loggedInUser.id;
      setUserData((prev) => ({
        ...prev,
        [id]: { ...prev[id], cart: [] },
      }));
    } else {
      setGuestCart([]); // <-- ahora funciona
    }
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 40px",
        background: "#F4DDD6",
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
          src="/images/logo.png"
          alt="Logo Esencial"
          style={{ height: "120px", objectFit: "contain" }}
        />
      </Link>

      {/* BUSCADOR */}
      <form
        onSubmit={handleSearch}
        style={{
          display: "flex",
          alignItems: "center",
          flex: 1,
          maxWidth: "400px",
          margin: "0 20px",
          background: "#fff",
          borderRadius: "30px",
          padding: "5px 15px",
        }}
      >
        <input
          name="search"
          type="text"
          placeholder="Buscar productos..."
          style={{
            flex: 1,
            border: "none",
            outline: "none",
            padding: "8px",
            borderRadius: "30px",
          }}
        />
        <button type="submit" style={{ background: "none", border: "none", cursor: "pointer" }}>
          <FaSearch color="#333" size={18} />
        </button>
      </form>

      {/* MENÚ DERECHO */}
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
              <button onClick={handleLogout} style={{ width: "100%", padding: "8px", cursor: "pointer" }}>
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
                      <p style={{ margin: 0, fontWeight: "bold", fontSize: "12px", color: "black" }}>
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
                        <p style={{ margin: 0, fontWeight: "bold", fontSize: "12px", color: "black" }}>
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

                  {/* Botón Eliminar Todo */}
                  <button
                    onClick={handleClearCart}
                    style={{
                      width: "100%",
                      padding: "12px",
                      backgroundColor: "#ff4d4f",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginBottom: "10px",
                    }}
                  >
                    Eliminar todo
                  </button>

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
