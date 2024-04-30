import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const ReservarModal = (props) => {
  const navegar = useNavigate();

  // Cuando un usuario quiere hacer una reserva primero
  // tiene que iniciar sesión. Si hace clic en un botón para
  // hacer una reserva antes de iniciar sesión, aparece este
  // modal explicándole al usuario que tiene que iniciar sesión.
  // En el modal hay un botón que dice "Iniciar sesión" que
  // dirige al usuario a la página de login.

  function IniciarReserva() {
    navegar("/login");
  }

  return (
    <>
      {/* Este código control el diseño y comportamiento del modal
    que aparece cuando el usuario haga clic en un botón para hacer
    una reserva si no está logeado. */}
      <Modal show={props.modalOpen} onHide={props.handleModalOpen}>
        <Modal.Header closeButton>
          <Modal.Title>¿Quieres realizar una reserva?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Si deseas tener una reserva en Chasqui Sato primero debes iniciar
          sesión con nosotros. Realiza tu reserva ya! Te estamos esperando.
        </Modal.Body>
        <Modal.Footer>
          {/* Si el usuario confirme que quiere iniciar sesión, puede
          hacer clic en "Iniciar sesión" y esto llamará a la función
          IniciarReserva en este componente. */}
          <Button variant="primary" onClick={IniciarReserva}>
            Iniciar sesión
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ReservarModal;
