// Aquí se importan las páginas principales y las herramientas de ruta
// que necesitaremos, así como el archivo de estilos

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./css/style.css";
import Login from "./pages/Login";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Nosotros from "./pages/Nosotros";
import Contacto from "./pages/Contacto";
import Reserva from "./pages/Reserva";
import MisReservas from "./pages/MisReservas";
import EditarReserva from "./pages/EditarReserva";
import Registrar from "./pages/Registrar";

function App() {
  return (
    <Router>
      {/* Aquí se renderiza el componente de 'Header' */}
      <Header />
      <Routes>
        {/* Aquí definimos las rutas de la aplicación */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/reserva" element={<Reserva />} />
        <Route path="/misreservas" element={<MisReservas />} />
        <Route path="/editar/:id" element={<EditarReserva />} />
        <Route path="/registrar" element={<Registrar />} />
        {/* ----- En esta ruta que nos dirige a la pagina de login,
        si el usuario inicia sesion entonces nos llevara a la pagina
        principal y bloqueara la pagina de iniciar sesion ------  */}
        <Route
          path="/login"
          element={
            localStorage.getItem("cliente") === null ? <Login /> : <Home />
          }
        />
      </Routes>
      {/* Aquí se renderiza el componente de 'Footer' */}
      <Footer />
    </Router>
  );
}

export default App;
