import React from "react";
import ReservarModal from "../components/ReservarModal";
import contacto01 from "../image/contacto_01.jpg";
import contacto02 from "../image/contacto_02.jpg";
import contacto03 from "../image/contacto_03.jpg";
import contacto04 from "../image/contacto_04.jpg";

// Para esta página uso código de Bootstrap para que
// sea responsive.

class Contacto extends React.Component {
  // Si el usuario llega a esta página desde un enlace
  // en la parte inferior de otra página, esta página se
  // renderizaba en la misma posición. Para que se renderice
  // correctamente, era necesario añadir el código
  // "windowscrollTo(0,0)" para que se renderice y luego
  // se posicione correctamente.
  componentDidMount() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);
  }

  // Aquí se declara el estado original de ReservarModal
  state = {
    modalOpen: false,
  };

  // Cuando el botón "Reserva tu mesa" llama la función
  // 'handleModalOpen', primero se verifica si hay un
  // usuario logeado, para que solo se abra el modal
  // si no hay un usuario logeado. Si lo hay, entonces
  // el usuario está dirigido a la página para hacer
  // una reserva.

  handleModalOpen = () => {
    {
      localStorage.getItem("cliente") === null
        ? this.setState((prevState) => {
            return {
              modalOpen: !prevState.modalOpen,
            };
          })
        : (window.location.href = "/reserva");
    }
  };

  render() {
    return (
      <>
        {/* SECCIÓN CABECERA */}

        <div className="fondoImg">
          <img src={contacto01} alt="restaurante" />
          <div className="textoSobreImg">Entremos en contacto</div>
        </div>

        {/* SECCIÓN HORARIOS */}

        <div className="fondoNegro">
          <div className="container text-center">
            <div className="row">
              <h3>Horario habitual</h3>
            </div>
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4">
              <div className="col colImg">
                <h5>Almuerzos</h5>
                <p className="menuDescripcion">Lunes — Sábado</p>
                <span>12.30—16.00</span>
              </div>
              <div className="col colImg">
                <h5>Cenas</h5>
                <p className="menuDescripcion">Lunes — Sábado</p>
                <span>18.30—23.30</span>
              </div>
              <div className="col colImg">
                <h5>Cenas</h5>
                <p className="menuDescripcion">Domingos & Festivos</p>
                <span>12.30—20.00</span>
              </div>
              <div className="col colImg">
                <h5>Bar</h5>
                <p className="menuDescripcion">Martes — Domingo</p>
                <span>12.30—23.30</span>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN LOCALES */}

        <div className="fondoBlanco">
          <div className="container text-center">
            <div className="row">
              <h3>Nuestros locales</h3>
            </div>
            <div className="row row-cols-1 row-cols-md-2 align-items-center">
              <div className="col colImg">
                <img
                  className="roundBorder"
                  src={contacto02}
                  alt="mapa"
                  width="100%"
                />
              </div>
              <div className="col colImg">
                <div className="row">
                  <p>
                    Calle Los Rosales 23, Sevilla
                    <br />
                    <span className="menuDescripcion">+34 639 206 123</span>
                  </p>
                </div>
                <div className="row-cols-8">
                  {/* Al hacer clic en "Reserva tu mesa" llama la
                  función "handleModalOpen, lo cual verifica si hay un
                  usuario logeado o no. Si hay una sesión activa, este
                  botón dirige al usuario a la página de hacer una nueva
                  reserva, de lo contrario abre el modal 'ReservarModal'. */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleModalOpen}
                  >
                    Reserva tu mesa!
                  </button>
                </div>
              </div>
            </div>
            <div className="row row-cols-1 row-cols-md-2 flex-row-reverse align-items-center">
              <div className="col colImg">
                <img
                  className="roundBorder"
                  src={contacto03}
                  alt="mapa"
                  width="100%"
                />
              </div>
              <div className="col colImg">
                <div className="row">
                  <p>
                    Calle Águila 12, Sevilla
                    <br />
                    <span className="menuDescripcion">+34 699 426 183</span>
                  </p>
                </div>
                <div className="row-cols-8">
                  {/* Al hacer clic en "Reserva tu mesa" llama la
                  función "handleModalOpen, lo cual verifica si hay un
                  usuario logeado o no. Si hay una sesión activa, este
                  botón dirige al usuario a la página de hacer una nueva
                  reserva, de lo contrario abre el modal 'ReservarModal'. */}
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleModalOpen}
                  >
                    Reserva tu mesa!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN FORMULARIO DE CONTACTO */}

        <div className="fondoNegro">
          <div className="container text-center d-flex flex-column align-items-center">
            <div className="row">
              <h3>Envíanos tu mensaje</h3>
            </div>
            <div className="row col-12 col-md-9 col-lg-6 col-xl-5 col-xxl-4">
              <form action="" method="">
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombreInput"
                    placeholder="Juan Gonzalez"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailInput"
                    placeholder="nombre@ejemplo.com"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">
                    Número de teléfono
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="telefonoInput"
                    placeholder="+34 000 111 222"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">
                    Tu mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="mensajeInput"
                    placeholder="Ingresa tu mensaje aquí"
                    rows="5"
                  ></textarea>
                </div>
                <button className="btn btn-primary" type="button">
                  Enviar
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* SECCIÓN IMAGEN DE MACHU PICCHU */}

        <div className="fondoImg">
          <img src={contacto04} alt="Machu Picchu" />
        </div>
        {/* El componente ReservarModal está al final del bloque de render()
        para que se renderice al final. Esto es para que aparezca encima del
        resto del contenido de la página.*/}
        <ReservarModal
          modalOpen={this.state.modalOpen}
          handleModalOpen={this.handleModalOpen}
        />
      </>
    );
  }
}

export default Contacto;
