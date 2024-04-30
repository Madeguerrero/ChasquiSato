import React from "react";
import { useNavigate } from "react-router-dom";
import inicio01 from "../image/inicio_01.jpeg";
import inicio02 from "../image/inicio_02.jpg";
import inicio03 from "../image/inicio_03.png";
import inicio04 from "../image/inicio_04.jpg";
import inicio05 from "../image/inicio_05.jpg";
import inicio06 from "../image/inicio_06.jpg";

// Para esta página uso código de Bootstrap para que
// sea responsive.

function Home() {
  // Aquí se declara el CONST navigate, para poder
  // usarlo en la función verMenu.
  const navigate = useNavigate();

  // Esta función simplemente dirige al usuario
  // a la página de Menu.
  function verMenu() {
    navigate("/menu");
  }

  return (
    <>
      {/* SECCIÓN CABECERA */}

      <div className="fondoImg">
        <img src={inicio01} alt="mesa de restaurante" />
        <div className="textoSobreImg">
          Descubre el sabor peruano que te transportará a un paraíso culinario
        </div>
      </div>

      {/* SECCIÓN INTRODUCCIÓN */}

      <div className="fondoBlanco">
        <div className="container text-center">
          <div className="row">
            <h3>El estilo de Perú como nunca lo habías visto </h3>
          </div>
          <div className="row row-cols-1 row-cols-md-2 align-items-center">
            <div className="col">
              <p>
                ¡La comida peruana ahora llega a tu ciudad con su auténtico
                sabor peruano! Descubre los exquisitos sabores del Perú en
                Sevilla. Nuestro restaurante de comida peruana nikkei ofrece una
                experiencia culinaria única que te llevará a un viaje que no
                olvidarás. Deléitate con platos auténticos elaborados con
                ingredientes frescos de origen local y disfruta de una
                experiencia gastronómica sabrosa e inolvidable.
              </p>
            </div>

            <div className="col colImg">
              <img
                className="roundBorder"
                src={inicio02}
                alt="preparando comida"
                width="65%"
              />
            </div>
          </div>
          <div className="row">
            <h3>Platos auténticos</h3>
          </div>
          <div className="row row-cols-1 row-cols-md-2 flex-row-reverse align-items-center">
            <div className="col">
              <p>
                Creemos sinceramente que si eres bueno en algo, ¿por qué no
                mostrarlo al mundo? Probablemente tenemos en carta el mejor
                ceviche de la ciudad.
              </p>
            </div>
            <div className="col colImg">
              <img
                className="roundBorder"
                src={inicio03}
                alt="varias comidas"
                width="100%"
              />
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN ACERCA DEL MENÚ */}

      <div className="fondoNegro">
        <div className="container text-center">
          <h5>Nuesto menú</h5>
          <h3 className="boldHeading">
            Algunas de nuestras delicias recomendadas
          </h3>
          <p>
            Tenemos los platos tradicionales con el toque innovador que a ti te
            gusta.
          </p>
          <hr />
        </div>
        <div className="container text-center">
          <div className="row row-cols-1 row-cols-lg-2 row-cols-xl-3">
            <div className="col">
              <p className="menuNombre">
                CAUSITA DE PULPO - <span className="menuPrecio">7</span>
              </p>
              <span className="menuDescripcion">Patata / Molusco / Limón</span>
              <hr className="dashedLine" />
            </div>
            <div className="col">
              <p className="menuNombre">
                LOMO SALTADO - <span className="menuPrecio">20</span>
              </p>
              <span className="menuDescripcion">Patata / Lomo / Cebolla</span>
              <hr className="dashedLine" />
            </div>
            <div className="col">
              <p className="menuNombre">
                LECHE DE TIGRE - <span className="menuPrecio">13</span>
              </p>
              <span className="menuDescripcion">
                Crustáceos / Pescado / Apio
              </span>
              <hr className="dashedLine" />
            </div>
            <div className="col">
              <p className="menuNombre">
                ARROZ CHAUFA DE MARISCOS -{" "}
                <span className="menuPrecio">16</span>
              </p>
              <span className="menuDescripcion">
                Huevo / Moluscos / Pescado / Sésamo / Apio
              </span>
              <hr className="dashedLine" />
            </div>
            <div className="col">
              <p className="menuNombre">
                ANTICUCHO DE SOLOMILLO DE CERDO -{" "}
                <span className="menuPrecio">13</span>
              </p>
              <span className="menuDescripcion">Cerdo / Especias / Ajo</span>
              <hr className="dashedLine" />
            </div>
          </div>
        </div>
        <div>
          <div className="center">
            {/* El botón 'Ver todo el menú' llamar la función 'verMenu'
            lo cual dirige al usuario a la página de Menu. */}
            <button type="button" className="btn btn-primary" onClick={verMenu}>
              Ver todo el menú
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN ACERCA DEL EQUIPO */}

      <div className="fondoBlanco">
        <div className="container text-center">
          <div className="row">
            <h3>El equipo</h3>
          </div>
          <div className="row row-cols-1 row-cols-md-2 align-items-center">
            <div className="col">
              <p>
                Detrás del éxito de Chasqui Nikkei, encontrarás un equipo
                apasionado por la cocina peruana japonesa y dedicado a brindar
                experiencias culinarias únicas en cada plato. Nuestra
                creatividad y atención al detalle han convertido la experiencia
                en Chasqui Nikkei en un compromiso constante para ofrecer lo
                mejor de nuestra cocina.
              </p>
            </div>
            <div className="col colImg">
              <img className="roundBorder" src={inicio04} alt="" width="100%" />
            </div>
            <div className="col colImg">
              <img className="roundBorder" src={inicio05} alt="" width="65%" />
            </div>
            <div className="col colImg">
              <img className="roundBorder" src={inicio06} alt="" width="65%" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
