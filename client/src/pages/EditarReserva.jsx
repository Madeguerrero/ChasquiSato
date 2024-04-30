import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiUrl } from "../constants";

// Para esta página uso código de Bootstrap para que
// sea responsive.

function Editar() {
  // Aquí declaro unos CONTs que se usan en las siguientes funciones.
  const id = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [loading, setLoading] = useState();
  // Al editar una reserva, primero hay que mostrar los datos de la
  // reserva original, y luego cambiar el valor cuando el usuario
  // haga uno o más cambios. Para esto se declara un CONST por cada
  // dato para que se pueda usar la función 'set....' para cambiar
  // su valor.
  const [fecha, setFecha] = useState([]);
  const [hora, setHora] = useState([]);
  const [personas, setPersonas] = useState([]);
  const [ocasion, setOcasion] = useState([]);
  const [restriccion, setRestriccion] = useState([]);
  const [notas, setNotas] = useState([]);
  const [initialized, setInitialized] = useState(false);

  // Para obtener los datos de la reserva original, hay que pasar
  // el ID de la reserva siendo editada como parte del request,
  // para recibir los datos correspondientes. Los valores
  // retornados se guardan en los CONTs que se declaron arriba.
  useEffect(() => {
    axios.get(apiUrl + "editar/" + id).then((res) => {
      console.log(res.data);
      console.log(res.data[0].fecha);
      setFecha(res.data[0].fecha);
      setHora(res.data[0].hora);
      setPersonas(res.data[0].personas);
      setOcasion(res.data[0].ocasion);
      setRestriccion(res.data[0].restriccion);
      setNotas(res.data[0].notas);
    });
  }, []);
  if (loading) {
    return <div className="spinner-border text-primary" role="status"></div>;
  }

  // Cuando se cargaba esta página se renderizaba en la misma
  // posición en que se hubicaba la reserva siendo editada. Para
  // que se renderice correctamente, era necesario añadir el código
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

  // Cuando el usuario envie el formulario, llama la función
  // 'editarReserva', lo cual actualiza todos los campos de los datos
  // con los nuevos valores y luego usando axios.put() los manda a
  // la base de datos.
  const editarReserva = (e) => {
    e.preventDefault();

    const data = {
      fecha: fecha,
      hora: hora,
      personas: personas,
      ocasion: ocasion,
      restriccion: restriccion,
      notas: notas,
    };

    console.log(data);

    // Para enviar los nuevos datos a la base de datos, hay que
    // incluir en la REQ el ID de la reserva siendo editada junto
    // con los nuevos datos del CONST declarado arriba.
    axios
      .put(apiUrl + "reservas/" + id, data)
      .then((res) => {
        alert("Su reserva ha sido cambiada exitosamente!");
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
    // <div>
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Editar tu reserva
                <Link to="/misreservas" className="btn btn-danger float-end">
                  Regresar
                </Link>
              </h4>
            </div>
            <div className="card-body">
              {/* Enviar el formulario llama la función 'editarReserva' */}
              <form onSubmit={editarReserva}>
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
                  <div className="col mb-3">
                    <label className="form-label">Fecha</label>
                    <input
                      type="date"
                      name="fecha"
                      value={fecha}
                      // Cualquier cambio en este campo <input> se captura
                      // a través de la función 'setFecha', lo cual es
                      // parte de un CONST que usa el hook setState([]).
                      onChange={(e) => setFecha(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col mb-3">
                    <label className="form-label">Hora</label>
                    <select
                      type="time"
                      name="hora"
                      value={hora}
                      // Cualquier cambio en este campo <input> se captura
                      // a través de la función 'setHora', lo cual es
                      // parte de un CONST que usa el hook setState([]).
                      onChange={(e) => setHora(e.target.value)}
                      className="form-control"
                    >
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
                      value={personas}
                      // Cualquier cambio en este campo <input> se captura
                      // a través de la función 'setPersonas', lo cual es
                      // parte de un CONST que usa el hook setState([]).
                      onChange={(e) => setPersonas(e.target.value)}
                      className="form-control"
                    >
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
                      value={ocasion}
                      // Cualquier cambio en este campo <input> se captura
                      // a través de la función 'setOcasion', lo cual es
                      // parte de un CONST que usa el hook setState([]).
                      onChange={(e) => setOcasion(e.target.value)}
                      className="form-control"
                    >
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
                      value={restriccion}
                      // Cualquier cambio en este campo <input> se captura
                      // a través de la función 'setRestriccion', lo cual es
                      // parte de un CONST que usa el hook setState([]).
                      onChange={(e) => setRestriccion(e.target.value)}
                      className="form-control"
                    >
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
                    value={notas}
                    // Cualquier cambio en este campo <input> se captura
                    // a través de la función 'setNotas', lo cual es
                    // parte de un CONST que usa el hook setState([]).
                    onChange={(e) => setNotas(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3 center">
                  <button type="submit" className="btn btn-primary">
                    Editar reserva!
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

export default Editar;
