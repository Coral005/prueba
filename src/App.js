// App.js
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

import Header from "./components/Header";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { supabase } from "./supabaseClient";

// Stripe con tu clave pública directamente
const stripePromise = loadStripe(
  "pk_test_51S2VjzByofHLSuy0jinOHwIH1TYJPeXLN8awBO1aaAOz16Hn5DoL9Yp3kGc7MiXkUT4gCkPXKQxiVqzYDjFL18pB00CEuTej2L"
);

const productos = [
  {
    nombre: "Cepillo eléctrico",
    precio: 4500,
    imagen: "/images/cepillo.jpg",
    descripcion: "Cepillo facial eléctrico",
  },
  {
    nombre: "Crema hidratante",
    precio: 3500,
    imagen: "/images/crema.jpg",
    descripcion: "Crema facial hidratante",
  },
  {
    nombre: "Retinol serum",
    precio: 5500,
    imagen: "/images/retinol.jpg",
    descripcion: "Serum antiarrugas",
  },
];

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [accountOpen, setAccountOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [guestCart, setGuestCart] = useState([]);
  const [guestFavorites, setGuestFavorites] = useState([]);
  const [userData, setUserData] = useState({});

  // Cargar sesión Supabase
  useEffect(() => {
    const initSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) setLoggedInUser(data.session.user);
      supabase.auth.onAuthStateChange((_event, session) => {
        setLoggedInUser(session?.user || null);
      });
    };
    initSession();
  }, []);

  // LocalStorage invitados
  useEffect(() => {
    setGuestCart(JSON.parse(localStorage.getItem("guestCart")) || []);
    setGuestFavorites(JSON.parse(localStorage.getItem("guestFavorites")) || []);
  }, []);

  useEffect(
    () => localStorage.setItem("guestCart", JSON.stringify(guestCart)),
    [guestCart]
  );
  useEffect(
    () =>
      localStorage.setItem("guestFavorites", JSON.stringify(guestFavorites)),
    [guestFavorites]
  );

  const getCart = () =>
    loggedInUser ? userData[loggedInUser.id]?.cart || [] : guestCart;
  const getFavorites = () =>
    loggedInUser ? userData[loggedInUser.id]?.favorites || [] : guestFavorites;

  const addToCart = (item) => {
    if (loggedInUser) {
      const id = loggedInUser.id;
      setUserData((prev) => ({
        ...prev,
        [id]: { ...prev[id], cart: [...(prev[id]?.cart || []), item] },
      }));
    } else {
      setGuestCart((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (nombre) => {
    if (loggedInUser) {
      const id = loggedInUser.id;
      const cart = getCart();
      setUserData((prev) => ({
        ...prev,
        [id]: { ...prev[id], cart: cart.filter((item) => item.nombre !== nombre) },
      }));
    } else {
      setGuestCart((prev) => prev.filter((item) => item.nombre !== nombre));
    }
  };

  const toggleFavorite = (prod) => {
    if (loggedInUser) {
      const id = loggedInUser.id;
      const favs = getFavorites();
      const exists = favs.find((f) => f.nombre === prod.nombre);
      setUserData((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          favorites: exists
            ? favs.filter((f) => f.nombre !== prod.nombre)
            : [...favs, prod],
        },
      }));
    } else {
      const exists = guestFavorites.find((f) => f.nombre === prod.nombre);
      setGuestFavorites(
        exists
          ? guestFavorites.filter((f) => f.nombre !== prod.nombre)
          : [...guestFavorites, prod]
      );
    }
  };

  const removeFavorite = (nombre) => {
    if (loggedInUser) {
      const id = loggedInUser.id;
      const favs = getFavorites();
      setUserData((prev) => ({
        ...prev,
        [id]: { ...prev[id], favorites: favs.filter((f) => f.nombre !== nombre) },
      }));
    } else {
      setGuestFavorites((prev) => prev.filter((f) => f.nombre !== nombre));
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoggedInUser(null);
  };

  // Stripe Checkout
  const handleCheckout = async () => {
    const cart = getCart();
    if (!cart.length) return alert("Carrito vacío");

    const items = cart.map((item) => ({ ...item, quantity: 1 }));

    try {
      const res = await fetch("http://localhost:4000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
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
    <div
      style={{
        fontFamily: "Arial",
        minHeight: "100vh",
        background: "#f2f2f2",
      }}
    >
      <Header
        loggedInUser={loggedInUser}
        accountOpen={accountOpen}
        setAccountOpen={setAccountOpen}
        favOpen={favOpen}
        setFavOpen={setFavOpen}
        dropdownOpen={dropdownOpen}
        setDropdownOpen={setDropdownOpen}
        getCart={getCart}
        getFavorites={getFavorites}
        handleLogout={handleLogout}
        removeFromCart={removeFromCart}
        removeFavorite={removeFavorite}
        handleCheckout={handleCheckout}
        setUserData={setUserData}
        setGuestCart={setGuestCart}
        toggleFavorite={toggleFavorite}
      />

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <Home
              productos={productos}
              addToCart={addToCart}
              toggleFavorite={toggleFavorite}
              getFavorites={getFavorites}
            />
          }
        />
        <Route
          path="/product/:nombre"
          element={
            <ProductPage
              productos={productos}
              addToCart={addToCart}
              stripePromise={stripePromise}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;