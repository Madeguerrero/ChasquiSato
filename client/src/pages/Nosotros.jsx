import React from "react";
import ReservarModal from "../components/ReservarModal";
import nosotros01 from "../image/nosotros_01.jpg";
import nosotros02 from "../image/nosotros_02.jpg";
import nosotros03 from "../image/nosotros_03.jpg";
import nosotros04 from "../image/nosotros_04.png";
import comida01 from "../image/comida_01.png";
import comida02 from "../image/comida_02.jpg";
import comida03 from "../image/comida_03.jpg";

// Para esta página uso código de Bootstrap para que
// sea responsive.

class Nosotros extends React.Component {
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
          <img src={nosotros01} alt="mesero" />
          <div className="textoSobreImg">Acerca de nosotros</div>
        </div>

        {/* SECCIÓN Nuestro Equipo */}
        <div className="fondoBlanco">
          <div className="container text-centre">
            <div className="row">
              <h3>Nuestro equipo</h3>
              <p>
                En Chasqui Sato, nuestro equipo es el corazón de nuestra esencia
                peruana. Cada miembro se dedica apasionadamente a brindar un
                servicio excepcional, reflejando la rica tradición culinaria de
                Perú en cada plato. Gracias a su trato inigualable, Chasqui Sato
                ha crecido y prosperado. Nuestro compromiso es siempre ofrecer
                lo mejor, garantizando una experiencia inolvidable en cada
                visita.
              </p>
            </div>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col colImg">
                <img
                  className="roundBorder"
                  src={nosotros02}
                  alt="hombre sirviendo coctéles"
                  width="100%"
                />
              </div>
              <div className="col colImg">
                <img
                  className="roundBorder"
                  src={nosotros03}
                  alt="el equipo"
                  width="100%"
                />
              </div>
            </div>
            <div className="row">
              <h3>Somos pet friendly!</h3>
              <p>
                Nos encanta que tu mascota venga a visitarnos. En Chasqui Sato
                siempre tenemos agua y galletas para nuestros amigos peludos.
              </p>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col col-md-6 colImg">
                <img
                  className="roundBorder"
                  src={nosotros04}
                  alt="somos pet friendly"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN Nuestras Especialidades */}

        <div className="fondoNegro">
          <div className="container text-centre">
            <div className="row">
              <h3>Nuestras especialidades</h3>
              <p>
                La variedad de nuestros platos del menú refleja la fusión de la
                cocina peruana con japonesa, desde sabrosos ceviches de marisco
                hasta los platos más emblemáticos Nikkei. El compromiso del
                restaurante de utilizar ingredientes frescos y técnicas
                culinarias tradicionales garantiza que cada plato se prepare a
                la perfección.
              </p>
            </div>
            <div className="row row-cols-1 row-cols-md-2">
              <div className="col colImg">
                <figure>
                  <img
                    className="roundBorder"
                    src={comida01}
                    alt="rollos de atún"
                    width="100%"
                  />
                  <figcaption>Rollos de atún con salsa acevichada</figcaption>
                </figure>
              </div>
              <div className="col colImg">
                <figure>
                  <img
                    className="roundBorder"
                    src={comida02}
                    alt="causa rellena"
                    width="100%"
                  />
                  <figcaption>Causa rellena de langostinos</figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN La cocina nikkei */}

        <div className="fondoBlanco">
          <div className="container text-centre">
            <div className="row">
              <h3>Lo que necesitas saber sobre la cocina Nikkei</h3>
              <p>
                La cocina nikkei es una síntesis armoniosa entre la tradición
                culinaria de Perú y la de Japón. Un estilo que fundido en un
                plato da armonías de colores, sabores y aromas con lo mejor de
                los dos países, tan diferentes en apariencia.
              </p>
              <p>
                La cocina nikkei pone sobre la mesa la delicadeza y fantasía de
                la tradición culinaria japonesa con los sabores fuertes,
                vibrantes y picantes de Perú.
              </p>
              <p>
                Es una aportación esencial para nuestro restaurante Chasqui
                Sato. Podemos ver ejemplos de esta cocina en nuestros ceviches,
                tiraditos, lomo saltado…
              </p>
            </div>
            <div className="row d-flex justify-content-center">
              <div className="col col-md-6 colImg">
                <img
                  className="roundBorder"
                  src={comida03}
                  alt="rollos de pollo con palta"
                  width="100%"
                />
              </div>
            </div>
            <div>
              <p>
                En la cocina nikkei encontramos una gran variedad de usos sobre
                todo de pescados, mariscos e ingredientes típicos de Perú, esto
                nos da unos platos frescos y sabrosos.
              </p>
              <p>No dejes que te lo expliquen - ven a probarlo!</p>
            </div>
            <div className="center">
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

export default Nosotros;
