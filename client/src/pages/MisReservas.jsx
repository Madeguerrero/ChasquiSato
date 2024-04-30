import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { apiUrl } from "../constants";

// Para esta página uso código de Bootstrap para que
// sea responsive.

const Reservas = () => {
  // Aquí declaro unos CONTs que se usan en las siguientes funciones.
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [reservas, setReservas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReservaId, setSelectedReservaId] = useState(null);
  const [initialized, setInitialized] = useState(false);

  // Cuando se re-renderizaba esta página (por ejemplo, después de que
  // el usuario cancele una reserva) se renderizaba en la misma
  // posición en que se hubicaba la página antes de borrar un registro.
  // Para que se renderice correctamente, era necesario añadir el código
  // "windowscrollTo(0,0)" para que se renderice y luego se posicione
  // correctamente, dentro de un useEffect.
  useEffect(() => {
    if (!initialized) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, []);
      setInitialized(true);
    }
  }, [initialized]);

  // Para obtener los datos de todas las reservas del usuario logeado,
  // hay que pasar el email del cliente (obtenido del localStorage) como
  // parte del request. Los datos de la respuesta se guardan en un array
  // en el CONST 'reservas' a través del hook 'useState([])'.

  useEffect(() => {
    const fetchAllReservas = async () => {
      try {
        const res = await axios.get(
          apiUrl +
            "reservas?emailCliente=" +
            JSON.parse(localStorage.getItem("cliente")).email
        );
        setReservas(res.data);
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllReservas();
  }, []);

  // Si el usuario confirma, a través del modal, que quiere borrar
  // su reserva, esta función manda el request a la base de datos
  // junto con el ID del registro que se tiene que borrar.
  const handleDelete = (id_reservas) => {
    axios
      .delete(apiUrl + "reservas/" + id_reservas)
      .then((res) => {
        // Después de enviar el formulario, el usuario recibe un
        // mensaje de confirmación y luego la página que muestra
        // sus reservas está re-renderizada.
        alert("Su reserva ha sido cancelada.");
        location.reload(window.scrollTo(0, 0));
      })
      .catch((err) => console.log(err));
  };

  // Esta función abre el modal y guarde el ID de la reserva
  // seleccionada en el CONST 'selectedReservaId'.
  const handleShowModal = (id_reservas) => {
    setSelectedReservaId(id_reservas);
    setShowModal(true);
  };

  // Esta función cierra el modal.
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // El CONST 'reservaDetalles' toma todos los datos de las reservas
  // del cliente logeado (que están en un array) y usando la función
  // '.map()' crea una "card" para cada reserva.

  const reservaDetalles = reservas.map((reservas) => (
    <div className="col mb-4" key={reservas.id_reservas}>
      <div className="card">
        <div className="card-header">Reserva #{reservas.id_reservas}</div>
        <div className="card-body text-center">
          <p className="card-text">Fecha: {reservas.fecha}</p>
          <p className="card-text">Hora: {reservas.hora}</p>
          <p className="card-text">Número de comesales: {reservas.personas}</p>
          <p className="card-text">Ocasión: {reservas.ocasion}</p>
          <p className="card-text">
            Restricciones alimentarias: {reservas.restriccion}
          </p>
          <p className="card-text">Notas: {reservas.notas}</p>
          <div className="row row-cols-1 row-cols-sm-2 d-flex flex-row justify-content-center">
            <div className="col mb-3 mb-sm-0 d-flex justify-content-center">
              <Link
                to={`/editar/${reservas.id_reservas}`}
                className="btn btn-outline-success btn-fill"
              >
                Editar
              </Link>
            </div>
            <div className="col d-flex justify-content-center">
              <Link
                className="btn btn-outline-danger btn-fill"
                // Si el usuario hace clic en "Cancelar", primero llama a
                // la función 'handleShowModal' para pedir la confirmación
                // del usuario antes de borrar el registro de la base de datos.
                onClick={() => handleShowModal(reservas.id_reservas)}
              >
                Cancelar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  ));

  // Esta función dirige al usuario a la página de hacer reservas
  function reservarMesa() {
    navigate("/reserva");
  }

  return (
    <>
      {/* Este código control el diseño y comportamiento del modal
    que aparece cuando el usuario haga clic en un botón para cancelar
    una reserva. */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar cancelación</Modal.Title>
        </Modal.Header>
        <Modal.Body>Estás seguro de cancelar esta reserva?</Modal.Body>
        <Modal.Footer>
          {/* Si el usuario decide que no quiere cancelar su reserva,
          se cierra el modal sin afectar la reserva. */}
          <Button variant="primary" onClick={handleCloseModal}>
            No
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // Si el usuario confirma que quiere cancelar su reserva, esto
              // llama a la función 'handleDelete', pasándole el ID de la
              // reserva que se va a borrar, y luego se cierra el modal.
              handleDelete(selectedReservaId);
              handleCloseModal();
            }}
          >
            Sí
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Primero hay ver verificar si el usuario logeado tiene alguna reserva.
      Si no tiene ninguna, aparece un mensaje y un botón para hacer una reserva.
      De lo contrario, se presentan las reservas. */}
      {loading ? (
        <div className="spinner-border text-primary" role="status"></div>
      ) : reservaDetalles.length === 0 ? (
        <div className="container mt-5 center">
          <h3>No se encontró ninguna reserva.</h3>
          <br />
          <div className="center">
            <div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={reservarMesa}
              >
                Reserva tu mesa!
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container text-center">
          <div className="row">
            <h4>
              Mis reservas
              <Link to="/reserva" className="btn btn-primary float-end">
                Nueva reserva
              </Link>
            </h4>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3">
            {reservaDetalles}
          </div>
        </div>
      )}
    </>
  );
};

export default Reservas;
