import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const LogoutModal = (props) => {
  // Cuando el usuario confirme que quiere cerrar sesión
  // queremos borrar todo lo que estaba guardado en el
  // localStorage, y luego dirigir el usuario a la página
  // principal.
  function SalirSesion() {
    localStorage.removeItem("cliente");
    localStorage.removeItem("nombre");
    localStorage.removeItem("apellido");
    window.location.href = "/";
  }

  return (
    <>
      {/* Este código control el diseño y comportamiento del modal
    que aparece cuando el usuario haga clic en "Cerrar sesión" en
    el Navbar" */}
      <Modal show={props.modalOpen} onHide={props.handleModalOpen}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Estás seguro de cerrar sesión?</Modal.Body>
        <Modal.Footer>
          {/* Si el usuario decide que no quiere cerrar sesión, puede
          hacer clic en "Continuar sesión" y esto llamará a la función
          "handleModalOpen (en el componente "Header") lo cual cambia
          el estado de "isModalOpen" a false. Así el modal desaparece. */}
          <Button variant="primary" onClick={props.handleModalOpen}>
            Continuar sesión
          </Button>
          {/* Si el usuario confirme que quiere cerrar sesión, puede
          hacer clic en "Cerrar sesión" y esto llamará a la función
          SalirSesion en este componente. */}
          <Button variant="danger" onClick={SalirSesion}>
            Cerrar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogoutModal;
