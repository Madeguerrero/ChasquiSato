import { useState } from "react";
import axios from "axios";
import { FaRegEye } from "react-icons/fa";
import { IoMdEyeOff } from "react-icons/io";
import login01 from "../image/login_01.jpg";
import { apiUrl } from "../constants";

// Para esta página uso código de Bootstrap para que
// sea responsive.

function Login() {
  // Aquí declaro unos CONTs que se usan en las siguientes funciones.
  const [login, setLogin] = useState({ email: "", contrasena: "" });
  const [errorMessage, setErrorMessage] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Cuando el usuario ingrese datos en el formulario de Login
  // el atributo "onChange" del campo <input> llama esta función,
  // la cual captura los datos y los pone en el CONST 'login'.
  function handleChangeLogin(e) {
    let nombre = e.target.name;
    let valor = e.target.value;
    setLogin({ ...login, [nombre]: valor });
  }

  // Cuando el usuario envía el formulario usando el botón 'Iniciar
  // sesión', llama la función 'handleLogin'. Esta función hace
  // un request (REQ) a la base de datos, enviando los datos a través de la URL.
  // Si la resupuesta (RES) de la base de datos es el estado "success", el
  // email y contraseña del usuario están guardados en localStorage, y un
  // segundo REQ a la base de datos captura el nombre y apellido del usuario
  // y también los guarda en el localStorage. Si no se encuenta el usuario,
  // aparece un alert con un mensaje de error.
  function handleLogin(e) {
    e.preventDefault();
    axios.post(apiUrl + "login", login).then((results) => {
      if (results.data.status === "success") {
        localStorage.setItem("cliente", JSON.stringify(login));
        axios
          .get(
            apiUrl +
              "clientes?emailCliente=" +
              JSON.parse(localStorage.getItem("cliente")).email
          )
          .then((res) => {
            localStorage.setItem("nombre", res.data[0].nombre);
            localStorage.setItem("apellido", res.data[0].apellido);
            window.location.href = "/";
          });
      }
      if (results.data.status === "failed") {
        alert(
          "No se encontró este usuario. Favor de revisar los datos e intentar de nuevo."
        );
      } else {
        setErrorMessage(false);
      }
    });
  }

  // Esta función muestra y esconde la contraseña.
  function handleShowPassword() {
    setShowPassword(!showPassword);
  }

  return (
    <>
      {/* SECCIÓN CABECERA */}

      <div className="fondoImg">
        <img src={login01} alt="mesa en un restaurante" />
        <div className="loginBox">
          <div className="loginTitle">Inicia sesión</div>
          <div className="container loginForm text-center d-flex flex-column align-items-center">
            <div className="row col-12 col-md-12 col-lg-12 col-xl-12">
              <form
                action="#"
                method="post"
                className="needs-validation"
                // Enviar el formulario llama la función 'handleLogin'
                onSubmit={handleLogin}
                noValidate
              >
                <div className="mb-3">
                  <div className="col">
                    <input
                      type="email"
                      name="email"
                      className={`form-control ${
                        login.email.length > 0 ? "" : ""
                      }`}
                      id="mail"
                      placeholder="Email"
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleChangeLogin'
                      onChange={handleChangeLogin}
                      value={login.email}
                      required
                    />
                    <div className="invalid-feedback">
                      Por favor, ingresa un correo electrónico válido.
                    </div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="col position-relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="contrasena"
                      className={`form-control ${
                        login.contrasena.length > 0 ? "" : ""
                      }`}
                      id="pass"
                      placeholder="Contraseña"
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleChangeLogin'
                      onChange={handleChangeLogin}
                      value={login.contrasena}
                      required
                    />
                    <div className="invalid-feedback">
                      Por favor, ingresa tu contraseña.
                    </div>
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
                  value="Iniciar sesión"
                  className="btn btn-primary"
                />
              </form>
              {errorMessage && (
                <p className="text-danger">Todos los campos son obligatorios</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
