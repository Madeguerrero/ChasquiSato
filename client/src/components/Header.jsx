import React from "react";
import LogoutModal from "./LogoutModal";

// Para el Header uso código de Bootstrap para que
// sea responsive.

// Al hacer clic en el botón de "Cerrar sesión", el app
// pide confirmación del usuario a través de un modal.
// Ese modal está en el componente "LogoutModal" por lo
// cual usé "class .... extends React.Component"

class Header extends React.Component {
  // Esta parte del código establece el estado original
  // de modalOpen y isNavbarCollapsed como "false".

  state = {
    modalOpen: false,
    isNavbarCollapsed: false,
  };

  // Cada vez que se llama la función "handleModalOpen" se
  // cambia el estado de "modalOpen" (entre true y false)

  handleModalOpen = () => {
    this.setState((prevState) => {
      return {
        modalOpen: !prevState.modalOpen,
      };
    });
  };

  // Cada vez que se llama la función "toggleNavbarCollapsed" se
  // cambia el estado de "isNavbarCollapsed" (entre true y false)

  toggleNavbarCollapsed = () => {
    this.setState((prevState) => ({
      isNavbarCollapsed: !prevState.isNavbarCollapsed,
    }));
  };

  render() {
    // Los enlaces que aparecen en el Navbar son diferentes si hay
    // un cliente logeado o no. Si no hay una sesión iniciada, no
    // es posible hacer una reserva por lo cual no debe aparecer
    // un enlace de "Hacer reserva" en el header. Una vez que un
    // cliente inicie una sesión, no solo es posible hacer una reserva,
    // sino también ver todas sus reservas. Para saber si hay un cliente
    // logeado, hay que verificar si el localStorage es vacío o no.

    const nombreUsuario =
      localStorage.getItem("cliente") === null
        ? ""
        : localStorage.getItem("nombre") +
          " " +
          localStorage.getItem("apellido");

    {
      /* Quería modificar el Navbar de Bootstrap para que los
          enlaces que corresponden al usuario logeado (es decir: 
          'Mis reservas', 'Haz nueva reserva', y 'Cerrar sesión')
          aparezcan en un "dropdown" solo si el Navbar está extendido
          (o sea en pantallas anchas), pero no cuando el Navbar es colapsado.
          Para ayudar con esto he creado dos CONST: uno con el HTML
          que se renderiza si el Navbar está colapsado (llamado
          'navbarLinksCollapsed) y otro con el HTML que se renderiza
          si el Navbar está extendido. */
    }

    const navbarLinksCollapsed = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Inicio
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/menu">
            Menú
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/nosotros">
            Nosotros
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contacto">
            Contacto
          </a>
        </li>

        {/* Aquí es donde comienza la parte del Navbar que varía
        según si hay un usuario logeado o no. */}

        {localStorage.getItem("cliente") === null ? (
          <>
            {/* Si NO HAY cliente logeado se renderiza lo siguiente: */}
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Iniciar Sesion
              </a>
            </li>
            <li className="nav-item">
              {/* Al hacer click en "Regístrate" el usuario está
              dirigido a la página para registrarse a través de la
              ruta "/registrar". */}
              <a className="btn btn-outline-primary" href="/registrar">
                Regístrate
              </a>
            </li>
          </>
        ) : (
          <>
            {/* Si hay cliente logeado se renderiza lo siguiente.
            En esta versión no uso el "dropdown". */}
            <hr className="hrBlanco" />
            <li className="">
              {/* Aquí es donde agarramos el CONST 'nombreUsuario'
              para incluirlo en el Navbar. Así el usuario tiene una
              confirmación visual que ha iniciado sesión correcatamente. */}
              <a className="text-white">Hola, {nombreUsuario}!</a>
            </li>
            <li className="nav-item">
              {/* Al hacer click en "Mis reservas" el usuario está
              dirigido a la página de "Mis reservas" a través de la
              ruta "/misreservas". */}
              <a className="nav-link" href="/misreservas">
                Mis reservas
              </a>
            </li>
            <li className="nav-item">
              {/* Al hacer click en "Haz nueva reserva" el usuario está
              dirigido a la página de "Hacer reservar" a través de la
              ruta "/reserva". */}
              <a className="nav-link" href="/reserva">
                Haz nueva reserva
              </a>
            </li>
            <li className="nav-item">
              {/* Al hacer click en "Cerrar sesión" llama la función 
              'handleModalOpen' y el estado de "modalOpen" cambia a
              "true" lo cual causa que aparezca el modal de confirmación. */}
              <a
                className="btn btn-outline-danger"
                onClick={this.handleModalOpen}
              >
                Cerrar sessión
              </a>
            </li>
          </>
        )}
      </ul>
    );

    // Aquí comienza el segundo CONST con el HTML
    // que se renderiza si el Navbar está extendido.

    const navbarLinksExpanded = (
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Inicio
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/menu">
            Menú
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/nosotros">
            Nosotros
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/contacto">
            Contacto
          </a>
        </li>

        {/* Aquí es donde comienza la parte del Navbar que varía
        según si hay un usuario logeado o no */}

        {localStorage.getItem("cliente") === null ? (
          <>
            {/* Si NO HAY cliente logeado se renderiza lo siguiente: */}
            <li>
              <a className="nav-link" href="/login">
                Iniciar Sesion
              </a>
            </li>
            <li>
              {/* Al hacer click en "Regístrate" el usuario está
              dirigido a la página para registrarse a través de la
              ruta "/registrar". */}
              <a className="btn btn-outline-primary" href="/registrar">
                Regístrate
              </a>
            </li>
          </>
        ) : (
          <>
            {/* Si hay cliente logeado se renderiza lo siguiente.
            En esta versión SÍ uso el "dropdown" porque se ve bien
            cuando el Navbar está extendido. */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* Aquí es donde agarramos el CONST 'nombreUsuario'
              para incluirlo en el Navbar. Así el usuario tiene una
              confirmación visual que ha iniciado sesión correcatamente. */}
                Hola, {nombreUsuario}!
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  {/* Al hacer click en "Mis reservas" el usuario está
                dirigido a la página de "Mis reservas" a través de la
                ruta "/misreservas". */}
                  <a className="dropdown-item" href="/misreservas">
                    Mis reservas
                  </a>
                </li>
                <li>
                  {/* Al hacer click en "Haz nueva reserva" el usuario está
              dirigido a la página de "Hacer reservar" a través de la
              ruta "/reserva". */}
                  <a className="dropdown-item" href="/reserva">
                    Haz nueva reserva
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  {/* Al hacer click en "Cerrar sesión" llama la función 
                'handleModalOpen' y el estado de "modalOpen" cambia a
                "true" lo cual causa que aparezca el modal de confirmación. */}
                  <a className="dropdown-item" onClick={this.handleModalOpen}>
                    Cerrar sessión
                  </a>
                </li>
              </ul>
            </li>
          </>
        )}
      </ul>
    );

    return (
      <div>
        <nav className="navbar navbar-expand-md d-flex">
          <div className="container-fluid">
            <a
              className="navbar-brand d-flex flex-column align-items-center"
              href="/"
            >
              {/* Esta parte del Navbar no cambia según el estado de
              'isNavbarCollapsed así que lo pude incluir en la instrucción
              de retorno en lugar de repetirlo en los dos CONSTs arriba..*/}
              <div className="logo-top">CHASQUISATO</div>
              <div className="logo-bottom">Peruvian Nikkei Restaurant</div>
            </a>
            <button
              className="navbar-toggler navbar-dark"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.toggleNavbarCollapsed}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className={`collapse navbar-collapse justify-content-end ${
                this.state.isNavbarCollapsed ? "show" : ""
              }`}
              id="navbarNav"
            >
              {/* Según el estado de 'isNavbarCollapsed' la página
              renderiza o 'navbarLinksCollapsed' o 'navbarLinksExpanded'. */}
              {this.state.isNavbarCollapsed
                ? navbarLinksCollapsed
                : navbarLinksExpanded}
            </div>
          </div>
        </nav>

        {/* El componente LogoutModal está al final del bloque de render()
        para que se renderice al final. Esto es para que aparezca encima del
        resto del contenido de la página.*/}
        <LogoutModal
          modalOpen={this.state.modalOpen}
          handleModalOpen={this.handleModalOpen}
        />
      </div>
    );
  }
}

export default Header;
