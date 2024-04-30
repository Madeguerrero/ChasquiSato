import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import login01 from "../image/login_01.jpg";
import { apiUrl } from "../constants";

// Para esta página uso código de Bootstrap para que
// sea responsive.

function Registrar() {
  // Aquí declaro unos CONTs que se usan en las siguientes funciones.
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    nombre: "",
    apellido: "",
    nacimiento: "",
    email: "",
    contrasena: "",
  });

  const [errorMessage, setErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Cuando el usuario ingrese datos en el formulario de registro
  // el atributo "onChange" del campo <input> llama esta función,
  // la cual captura los datos y los pone en el CONST 'newUser'
  // declarado arriba.

  function handleNuevosDetalles(e) {
    e.persist();
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  }

  // Cuando el usuario envie el formulario, llama la función
  // 'handleRegistrar', lo cual actualiza todos los campos de los datos
  // con los nuevos valores (del CONST 'newUser') y luego, usando
  // axios.post(), los manda a la base de datos.

  function handleRegistrar(e) {
    e.preventDefault();

    const data = {
      nombre: newUser.nombre,
      apellido: newUser.apellido,
      nacimiento: newUser.nacimiento,
      email: newUser.email,
      contrasena: newUser.contrasena,
    };

    // Para asegurar que un email no pueda ser registrado más que una
    // vez, el registro incluye dos pasos. Primero la base de datos
    // retorna un mensaje "success" si el email no ha sido registrado
    // anteriormente. Después guarda los datos en la base de datos con
    // un segundo request usando axios.post().
    axios.post(apiUrl + "verificar", data).then((results) => {
      if (results.data.status === "success") {
        axios.post(apiUrl + "registrar", data);
        // Después de enviar el formulario, el usuario recibe un mensaje
        // de confirmación y luego está dirigido a la página que login.
        alert(
          "Gracias por registrarte con nosotros! Ahora puedes hacer el login."
        );
        navigate("/login");
      }
      if (results.data.status === "failed") {
        // Si en el primero paso la base de datos retorna el mensaje
        // "failed" (fallado), entonces el usuario recibe un mensaje
        // diciéndole que el email ya está registrado.
        alert(
          "Este email ya está registrado. Favor de verificar e intentar de nuevo."
        );
      }
    });
  }

  // Esta función muestra y esconde la contraseña.
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  // Para poder presentar un texto 'placeholder' en el formulario de
  // registro para "Fecha de nacimiento" es necesario que ese campo
  // comience de tipo "text". Cuando el usuario haga clic en ese campo
  // llamar esta función 'handleFocus' que lo convierte el un campo
  // de tipo "date".
  const handleFocus = (event) => {
    event.target.type = "date";
  };

  return (
    <>
      {/* SECCIÓN CABECERA */}

      <div className="fondoImg">
        <img src={login01} alt="mesa en un restaurante" />
        <div className="loginBox">
          <div className="loginTitle">Regístrate con nosotros</div>
          <div className="container loginForm text-center d-flex flex-column align-items-center">
            <div className="row col-12 col-md-12 col-lg-12 col-xl-12">
              {/* Enviar el formulario llama la función 'handleRegistar' */}
              <form action="#" method="post" onSubmit={handleRegistrar}>
                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col mb-3">
                    <input
                      type="text"
                      name="nombre"
                      className="form-control"
                      placeholder="Nombre"
                      required
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleNuevosDetalles'
                      onChange={handleNuevosDetalles}
                      value={newUser.nombre}
                    />
                  </div>
                  <div className="col mb-3">
                    <input
                      type="text"
                      name="apellido"
                      className="form-control"
                      placeholder="Apellido"
                      required
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleNuevosDetalles'
                      onChange={handleNuevosDetalles}
                      value={newUser.apellido}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    onFocus={handleFocus}
                    name="nacimiento"
                    className="form-control"
                    placeholder="Fecha de nacimiento"
                    required
                    // Cualquier cambio en este campo <input>
                    // se captura a través de la función 'handleNuevosDetalles'
                    onChange={handleNuevosDetalles}
                    value={newUser.nacimiento}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    required
                    // Cualquier cambio en este campo <input>
                    // se captura a través de la función 'handleNuevosDetalles'
                    onChange={handleNuevosDetalles}
                    value={newUser.email}
                  />
                </div>
                <div className="mb-3">
                  <div className="col position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="contrasena"
                      className="form-control"
                      placeholder="Contraseña"
                      required
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleNuevosDetalles'
                      onChange={handleNuevosDetalles}
                      value={newUser.contrasena}
                    />
                    <div
                      className="escondePass position-absolute top-50 end-0 translate-middle-y pe-2"
                      onClick={handleShowPassword}
                    >
                      {showPassword ? <FaRegEye /> : <IoMdEyeOff />}
                    </div>
                  </div>
                </div>

                <input
                  type="submit"
                  value="Regístrame!"
                  className="btn btn-primary"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrar;
