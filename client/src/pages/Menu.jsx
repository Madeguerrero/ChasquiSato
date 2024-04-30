import React from "react";
import ReservarModal from "../components/ReservarModal";
import menu01 from "../image/menu_01.jpeg";
import menu02 from "../image/menu_02.png";
import menu03 from "../image/menu_03.png";
import menu04 from "../image/menu_04.png";
import menu05 from "../image/menu_05.jpeg";

// Para esta página uso código de Bootstrap para que
// sea responsive.

class Menu extends React.Component {
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
          <img src={menu01} alt="manos sirviendo comida" />
          <div className="textoSobreImg">Nuestro Menu</div>
          <div className="textoSobreImgSmall">
            — Descubre los más exquisitos platos peruanos nikkei —
          </div>
        </div>
        {/* SECCIÓN MENÚ */}
        <div className="fondoNegro">
          <div className="container text-centre">
            {/* Sección de entradas */}

            <div className="row text-left">
              <h3>Para empezar</h3>
            </div>
            <div className="row row-cols-1 row-cols-md-2 justify-content-center">
              <div className="col">
                <div className="row">
                  <p className="menuNombre">
                    Papa a la huancaina - <span className="menuPrecio">9€</span>
                  </p>
                  <span className="menuDescripcion">
                    Patata / Huevo / Ají / Lechuga
                  </span>
                  <hr className="dashedLine" />
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Gyozas de cerdo con verduras y crema andina -{" "}
                      <span className="menuPrecio">8.50€</span>
                    </p>
                    {/* <span className="menuDescripcion">Patata / Huevo / Ají / Lechuga</span> */}
                    <hr className="dashedLine" />
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Conchitas a la parmesana -{" "}
                      <span className="menuPrecio">9€</span>
                    </p>
                    <span className="menuDescripcion">
                      Conchas / Parmesano / Mantequilla batayaki
                    </span>
                    <hr className="dashedLine" />
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Croquetas de ají de gallina -{" "}
                      <span className="menuPrecio">4.50€</span>
                    </p>
                    {/* <span className="menuDescripcion">Patata / Huevo / Ají / Lechuga</span> */}
                    <hr className="dashedLine" />
                  </div>
                </div>
              </div>
              <div className="col-9 col-md colImg">
                <img
                  className="roundBorder"
                  src={menu02}
                  alt="papa a la huancaina"
                  width="100%"
                />
              </div>
            </div>

            {/* Sección de ceviches */}

            <div className="row text-left">
              <h3>Ceviches</h3>
            </div>
            <div className="row row-cols-1 row-cols-md-2 flex-row-reverse justify-content-center">
              <div className="col">
                <div className="row">
                  <p className="menuNombre">
                    Papa a la huancaina - <span className="menuPrecio">9€</span>
                  </p>
                  <span className="menuDescripcion">
                    Patata / Huevo / Ají / Lechuga
                  </span>
                  <hr className="dashedLine" />
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Gyozas de cerdo con verduras y crema andina -{" "}
                      <span className="menuPrecio">8.50€</span>
                    </p>
                    {/* <span className="menuDescripcion">Patata / Huevo / Ají / Lechuga</span> */}
                    <hr className="dashedLine" />
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Conchitas a la parmesana -{" "}
                      <span className="menuPrecio">9€</span>
                    </p>
                    <span className="menuDescripcion">
                      Conchas / Parmesano / Mantequilla batayaki
                    </span>
                    <hr className="dashedLine" />
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Croquetas de ají de gallina -{" "}
                      <span className="menuPrecio">4.50€</span>
                    </p>
                    {/* <span className="menuDescripcion">Patata / Huevo / Ají / Lechuga</span> */}
                    <hr className="dashedLine" />
                  </div>
                </div>
              </div>
              <div className="col-9 col-md colImg">
                <img
                  className="roundBorder"
                  src={menu03}
                  alt="hombre sirviendo coctéles"
                  width="100%"
                />
              </div>
            </div>

            {/* Sección nikkei */}

            <div className="row text-left">
              <h3>Nikkei</h3>
            </div>
            <div className="row row-cols-1 row-cols-md-2 justify-content-center">
              <div className="col">
                <div className="row">
                  <p className="menuNombre">
                    Papa a la huancaina - <span className="menuPrecio">9€</span>
                  </p>
                  <span className="menuDescripcion">
                    Patata / Huevo / Ají / Lechuga
                  </span>
                  <hr className="dashedLine" />
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Gyozas de cerdo con verduras y crema andina -{" "}
                      <span className="menuPrecio">8.50€</span>
                    </p>
                    {/* <span className="menuDescripcion">Patata / Huevo / Ají / Lechuga</span> */}
                    <hr className="dashedLine" />
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Conchitas a la parmesana -{" "}
                      <span className="menuPrecio">9€</span>
                    </p>
                    <span className="menuDescripcion">
                      Conchas / Parmesano / Mantequilla batayaki
                    </span>
                    <hr className="dashedLine" />
                  </div>
                </div>
                <div className="row">
                  <div className="row">
                    <p className="menuNombre">
                      Croquetas de ají de gallina -{" "}
                      <span className="menuPrecio">4.50€</span>
                    </p>
                    {/* <span className="menuDescripcion">Patata / Huevo / Ají / Lechuga</span> */}
                    <hr className="dashedLine" />
                  </div>
                </div>
              </div>
              <div className="col-9 col-md colImg">
                <img
                  className="roundBorder"
                  src={menu04}
                  alt="hombre sirviendo coctéles"
                  width="100%"
                />
              </div>
            </div>

            {/* Tags para cerrar */}
          </div>
        </div>
        {/* SECCIÓN RESERVAR */}
        <div className="fondoImg">
          <img src={menu05} alt="restaurante de noche" />
          <div className="textoSobreImg">Reservas</div>
          <div className="textoSobreImgFooter">
            — No te quedes con las ganas de probar la mejor gastronomia del
            mundo —
          </div>
          <div className="center botonSobreImg">
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

export default Menu;
