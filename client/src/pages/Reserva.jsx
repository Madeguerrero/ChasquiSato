import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../constants";

// Para esta página uso código de Bootstrap para que
// sea responsive.

function Reserva() {
  // Aquí declaro unos CONTs que se usan en las siguientes funciones.
  const navigate = useNavigate();

  const [reserva, setReserva] = useState({
    fecha: "",
    hora: "",
    personas: "",
    ocasion: "",
    restriccion: "",
    notas: "",
  });

  // Cuando el usuario ingrese datos en el formulario de reservas
  // el atributo "onChange" del campo <input> llama esta función,
  // la cual captura los datos y los pone en el CONST 'reserva'
  // declarado arriba.

  const handleInput = (e) => {
    e.persist();
    setReserva({ ...reserva, [e.target.name]: e.target.value });
  };

  // Cuando el usuario envie el formulario, llama la función
  // 'hazReserva', lo cual actualiza todos los campos de los datos
  // con los nuevos valores (del CONST 'reserva') y luego, usando
  // axios.post(), los manda a la base de datos.

  const hazReserva = (e) => {
    e.preventDefault();

    const data = {
      fecha: reserva.fecha,
      hora: reserva.hora,
      personas: reserva.personas,
      ocasion: reserva.ocasion,
      restriccion: reserva.restriccion,
      notas: reserva.notas,
    };

    // Junto con los datos, se envía al servidor el email del cliente
    // (obtenido del localStorage) para que se pueda ingresar el ID
    // del cliente en la table de reservas al crear el nuevo registro.
    axios
      .post(
        apiUrl +
          "reservas?emailCliente=" +
          JSON.parse(localStorage.getItem("cliente")).email,
        data
      )
      .then((res) => {
        // Después de enviar el formulario, el usuario recibe un
        // mensaje de confirmación y luego está dirigido a la
        // página que muestra todas sus reservas.
        alert("Gracias por su reserva! Nos vemos pronto!");
        navigate("/misreservas");
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
          }
        }
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Nueva reserva
                <Link to="/misreservas" className="btn btn-danger float-end">
                  Mis reservas
                </Link>
              </h4>
            </div>
            <div className="card-body">
              {/* Enviar el formulario llama la función 'hazReserva' */}
              <form onSubmit={hazReserva}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                  <div className="col mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      name="fecha"
                      value={reserva.fecha}
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleInput'
                      onChange={handleInput}
                      required
                      className="form-control"
                    />
                  </div>
                  <div className="col mb-3">
                    <label className="form-label">Hora</label>
                    <select
                      type="time"
                      name="hora"
                      value={reserva.hora}
                      required
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleInput'
                      onChange={handleInput}
                      className="form-control"
                    >
                      {/* No es posible usar el tipo de input "time" porque
                      el restaurante se abre solo entre ciertas horas y las
                      reservas tienen que estar a ciertas horas. Por eso aquí
                      uso select y opciones. */}
                      <option value="">-- Escoje un horario --</option>
                      <option value="12:30">12.30</option>
                      <option value="12:45">12.45</option>
                      <option value="13:00">13.00</option>
                      <option value="13:15">13.15</option>
                      <option value="13:30">13.30</option>
                      <option value="13:45">13.45</option>
                      <option value="14:00">14.00</option>
                      <option value="14:15">14.15</option>
                      <option value="14:30">14.30</option>
                      <option value="14:45">14.45</option>
                      <option value="15:00">15.00</option>
                      <option value="15:15">15.15</option>
                      <option value="15:30">15.30</option>
                      <option value="15:45">15.45</option>
                      <option value="16:00">16.00</option>
                      <option value="16:15">16.15</option>
                      <option value="16:30">16.30</option>
                      <option value="16:45">16.45</option>
                      <option value="17:00">17.00</option>
                      <option value="17:15">17.15</option>
                      <option value="17:30">17.30</option>
                      <option value="17:45">17.45</option>
                      <option value="18:00">18.00</option>
                      <option value="18:15">18.15</option>
                      <option value="18:30">18.30</option>
                      <option value="18:45">18.45</option>
                      <option value="19:00">19.00</option>
                      <option value="19:15">19.15</option>
                      <option value="19:30">19.30</option>
                      <option value="19:45">19.45</option>
                      <option value="20:00">20.00</option>
                      <option value="20:15">20.15</option>
                      <option value="20:30">20.30</option>
                      <option value="20:45">20.45</option>
                      <option value="21:00">21.00</option>
                      <option value="21:15">21.15</option>
                      <option value="21:30">21.30</option>
                      <option value="21:45">21.45</option>
                      <option value="22:00">22.00</option>
                      <option value="22:15">22.15</option>
                      <option value="22:30">22.30</option>
                      <option value="22:45">22.45</option>
                    </select>
                  </div>
                  <div className="col mb-3">
                    <label className="form-label">Personas</label>
                    <select
                      name="personas"
                      value={reserva.personas}
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleInput'
                      onChange={handleInput}
                      required
                      className="form-control"
                    >
                      <option value="">-- Selecione los comensales --</option>
                      <option value="1 persona">1 persona</option>
                      <option value="2 personas">2 personas</option>
                      <option value="3 personas">3 personas</option>
                      <option value="4 personas">4 personas</option>
                      <option value="5 personas">5 personas</option>
                      <option value="6 personas">6 personas</option>
                      <option value="7+ personas">7+ personas</option>
                    </select>
                  </div>
                </div>

                <div className="row row-cols-1 row-cols-sm-2">
                  <div className="col mb-3">
                    <label className="form-label">Ocasión</label>
                    <select
                      name="ocasion"
                      value={reserva.ocasion}
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleInput'
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">-- Selecione la ocasión --</option>
                      <option value="Ninguna ocasión">Ninguna ocasión</option>
                      <option value="Cumpleaños">Cumpleaños</option>
                      <option value="Aniversario">Aniversario</option>
                      <option value="Graduación">Graduación</option>
                      <option value="Otra celebración">Otra celebración</option>
                    </select>
                  </div>
                  <div className="col mb-3">
                    <label className="form-label">
                      Restricciones alimentarias
                    </label>
                    <select
                      name="restriccion"
                      value={reserva.restriccion}
                      // Cualquier cambio en este campo <input>
                      // se captura a través de la función 'handleInput'
                      onChange={handleInput}
                      className="form-control"
                    >
                      <option value="">
                        -- Selecione si teneís restricciones alimentarias --
                      </option>
                      <option value="Ninguna restricción">
                        Ninguna restricción
                      </option>
                      <option value="Vegetariano">Vegetariano</option>
                      <option value="Vegano">Vegano</option>
                      <option value="Sin lactosa">Sin lactosa</option>
                      <option value="Alergía a las nueces">
                        Alergía a las nueces
                      </option>
                      <option value="Otra alergía">Otra alergía</option>
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Notas</label>
                  <input
                    type="text"
                    name="notas"
                    value={reserva.notas}
                    // Cualquier cambio en este campo <input>
                    // se captura a través de la función 'handleInput'
                    onChange={handleInput}
                    className="form-control"
                  />
                </div>

                <div className="mb-3 center">
                  <button type="submit" className="btn btn-primary">
                    Haz reserva!
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reserva;
