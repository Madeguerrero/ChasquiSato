
// Aquí importo los módulos que voy a necesitar

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();

app.use(cors())
app.use(express.json())


/// *** PARA CONECTARSE A LA BASE DE DATOS *** ///

require("dotenv").config();
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  // database: "chasquisato",
  database: "sql11703140"
})

// Aquí es donde intenta la conexión a la base de datos,
// y produce un mensaje para decir si se conectó o no

try {
  db.connect();
  console.log("Conectado con éxito a la base de datos");
} catch (error) {
  console.error(
    "Error al conectar con la base de datos del server SQL: " + error
  );
}


/// *** PARA HACER EL LOGIN A LA BASE DE DATOS *** ///

// Al iniciar una sesión, el usuario tiene que ingresar su email
// y su contraseña. Al enviar el formulario, el request obtiene
// estos datos de 'req.body' y los manda al servidor usando app.post().
// El db.query() averigua si en la base de datos existe un registro
// con estos datos. Si hay (o sea, si 'result.length' es mayor que 0)
// nos da el estado "success" y permite iniciar una sesión.

app.post("/login", (req, res) => {
  const { email, contrasena } = req.body;
  const result = [];
  db.query(
    "SELECT * FROM clientes WHERE email= ? AND contraseña= ?",
    [email, contrasena],
    (err, result) => {
      if (result.length > 0) {
      res.json({ status: "success" });
      } else {
        res.json({ status: "failed" });
      }
    }
  );
})


/// *** PARA MOSTRAR LOS DETALLES DEL CLIENTE LOGEADO *** ///

// Una vez que el usuario ha iniciado sesión, aparece su nombre en
// la Navbar. Para obtener el nombre del usuario es necesario
// consultar la base de datos, ya que los datos proporcionados durante
// el inicio de sesión no incluye el nombre. Para saber qué registro
// en la table de clientes corresponde al usuario logeado, hay que
// proporcionar el email del cliente en la consulta de la base de datos.
// Al iniciar sesión, el email se guarde en el localStorage del lado del
// cliente y se pasa al lado del servidor a través de la URL de 'req'.

app.get("/clientes", (req,res) => {
  const clienteEmail = req.query.emailCliente;
  const q = "SELECT * FROM clientes WHERE email = ?"
  db.query(q, clienteEmail, (err,data) => {
    if(err) {
    console.error("Error en la consulta: " + err);
    }
    res.json(data);
});
})


/// *** PARA MOSTRAR LOS DETALLES DE TODAS LAS RESERVAS DEL CLIENTE LOGEADO *** ///

// Para mostrar todas las reservas del cliente logeado, primero hay que obtener
// su identificado único del campo "id_cliente" de la table de clientes. Esto
// se hace de la misma manera en que se obtuvo el nombre en la sección arriba,
// pero esta vez solo pidiendo el 'id_cliente' de la tabla de clientes. El
// resultado de la primera consulta a la DB se pone en una variable y lo pasa
// a la segunda consulta, está vez a la tabla de reservas. (La tabla de reservas
// tiene un campo en que automáticamente se ingresa el 'id_cliente' cada vez que
// un cliente hace una reserva. Esto sirve como un 'Foreign Key' y es la forma en
// que las dos tablas están conectadas.)

// En MySQL, el formato por defecto de las fechas (o sea YYYY-MM-DD HH:MM:SS) y
// las horas me causó algunos problemas al principio, hasta que descubrí que los
// puedo formatear al momento de hacer la consulta, usando por ejemplo '%d/%m&Y'.

app.get("/reservas", (req,res) => {
  const clienteEmail = req.query.emailCliente;
  const q = "SELECT id_cliente FROM clientes WHERE email = ?"
  db.query(q, clienteEmail, (err,result) => {
    if(err) { 
      console.error("Error en la consulta: " + err);
    }
      let clienteId = result[0].id_cliente;
      const r = "SELECT id_reservas, cliente, DATE_FORMAT(fecha, '%d/%m/%Y') AS fecha, personas, TIME_FORMAT(hora, '%l.%i %p') AS hora, ocasion, restriccion, notas FROM reservas WHERE cliente = ?"
  db.query(r, clienteId, (err,data) => {
    if(err) return res.json(err)
    return res.json(data)
  })
})
})


/// *** PARA CHEQUEAR SI UN EMAIL YA ESTÁ REGISTRADO *** ///

// Para prevenir que un email pueda ser registrado más que una vez,
// hay que hacer una consulta a la base de datos cuando un usuario
// trate de registarse y verificar si este email ya existe en la DB.
// Se obtiene el email del formulario del lado del cliente usando
// req.body y lo pasa al lado del servidor como parte de la URL 
// de 'req'. La consulta a la DB retorna la suma de los registros
// que tienen ese email. Si el resultado es 1, quiere decir que
// ese email ya está siendo usado. El resultado tiene que ser 0 para
// que el usuario pueda registrarse con ese email.

app.post("/verificar", (req,res)=>{
  const email = req.body.email; 
  const p = "SELECT COUNT(email) AS count FROM clientes WHERE email = ?"
  db.query(p, email, (err,result) => {
    console.log(result[0].count);
    if (result[0].count < 1) { 
      res.json({ status: "success" });
    } else {
      res.json({ status: "failed" });
    }
  }
);
})


/// *** PARA QUE UN NUEVO USUARIO PUEDA REGISTRARSE *** ///

// Al registarse, los datos ingresado en el formulario están
// enviados al servidor a través de un request (req) e ingresados
// a la base de datos usando el método app.post().

app.post("/registrar", (req,res)=>{
    const values = [
      req.body.nombre,
      req.body.apellido,
      req.body.nacimiento,
      req.body.email,
      req.body.contrasena]
    
    const q = "INSERT INTO clientes (`nombre`, `apellido`, `nacimiento`, `email`, `contraseña`) VALUES (?)"
    
    db.query(q, [values], (err,data) => {
      if(err) return res.json(err)
      return res.json(data)
    }
)
})



/// *** PARA HACER UNA NUEVA RESERVA *** ///

// Para asociar una reserva con el usuario quien lo hace, el
// registro de la reserva tiene que incluir el 'id_cliente' de
// ese usuario (lo cual va a servir como una "clave foránea" en
// la table de reservas). Así que primero se obtiene el ID del
// cliente a través de su email (lo cual está guardado en el
// localStorage) como ya hemos visto arriba. Este ID se combina
// con los datos ingresados en el formulario por el usuario y
// a través del método app.post() se crea un nuevo registro en
// la DB.

app.post("/reservas", (req,res)=>{
  const clienteEmail = req.query.emailCliente;
  const q = "SELECT id_cliente FROM clientes WHERE email = ?"
  db.query(q, clienteEmail, (err,result) => {
    if(err) { 
      console.error("Error en la consulta: " + err);
    }
      const clienteId = result[0].id_cliente;
  const r = "INSERT INTO reservas (`cliente`, `fecha`, `personas`, `hora`, `ocasion`, `restriccion`, `notas`) VALUES (?)"
  const values = [
    clienteId,
    req.body.fecha,
    req.body.personas,
    req.body.hora,
    req.body.ocasion,
    req.body.restriccion,
    req.body.notas]

  db.query(r, [values], (err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})
})


/// *** PARA MOSTRAR LOS DETALLES DE UNA RESERVA QUE ESTÁ SIENDO EDITADA *** ///

// Cuando el usuario quiere editar su reserva, es necesario ver
// los detalles de la reservas que está editando. Primero hay que
// saber el ID del registro que va a ser editado, lo cual se obtiene
// desde los parámetros de la solicitud (req.params.id). El método
// app.get() trae los datos del registro con el ID correspondiente
// de la tabla de reservas.

app.get("/editar/:id", (req,res) => {
  const q = "SELECT id_reservas, cliente, DATE_FORMAT(fecha, '%Y-%m-%d') AS fecha, personas, TIME_FORMAT(hora, '%H:%i') AS hora, ocasion, restriccion, notas FROM reservas WHERE id_reservas = ?"
  const id = req.params.id
  db.query(q, [id], (err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})


/// *** PARA EDITAR UNA RESERVA *** ///

// Al editar una reserva, primero hay que saber el ID del
// registro que va a ser editado en la table de reservas de la DB.
// Se obtiene el ID de la reserva desde los parámetros de la solicitud
// (req.params.id). El método app.put() actualiza el registro
// con el ID correspondiente de la tabla de reservas.

app.put("/reservas/:id", (req,res)=> {
  const id = req.params.id;
  const q = "UPDATE reservas SET `fecha` = ?, `personas` = ?, `hora` = ?, `ocasion` = ?, `restriccion` = ?, `notas` = ? WHERE id_reservas = ?";
  const values = [
    req.body.fecha,
    req.body.personas,
    req.body.hora,
    req.body.ocasion,
    req.body.restriccion,
    req.body.notas]
  db.query(q, [...values,id], (err,data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
})


/// *** PARA BORRAR UNA RESERVA *** ///

// Al cancelar una reserva, primero hay que saber el ID del
// registro que se va a borrar de la table de reservas de la DB.
// Se obtiene el ID de la reserva desde los parámetros de la solicitud
// (req.params.id_reservas). El método app.delete() borra el registro
// con el ID correspondiente de la tabla de reservas.

app.delete("/reservas/:id_reservas", (req, res) => {
  const sql = "DELETE FROM reservas WHERE id_reservas = ?";
  const id = req.params.id_reservas;
  db.query(sql, [id], (err,data) => {
    if(err) return res.json({Message: "Error inside server"});
    return res.json(data);
  })
})


/// *** PARA ESCUCHAR LAS SOLICITUDES EN EL PUERTO ESPECIFICADO *** ///

app.listen(process.env.PORT, () => {
  console.log("Conectado correctamente");
});


