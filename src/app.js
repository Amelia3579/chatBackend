//CHAT COMUNITARIO COMISIÓN 53130

const express = require("express"); //requiero express
const exphbs = require("express-handlebars"); //requiero handlebars
const socket = require("socket.io"); //requiero socket
const app = express();
const PUERTO = 8080;

//Middleware
app.use(express.static("./src/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuramos Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

//Rutas
app.get("/", (req, res) => {
  res.render("index");
});

//Listen
const httpServer = app.listen(PUERTO, () => {
  console.log(`Escuchando en el puerto: ${PUERTO}`);
});

//Me guardo una referencia del servidor
//Genero una instancia de socket.io del lado del Backend
const io = new socket.Server(httpServer);

let allMessages = [];

//Establecemos la conexión con el cliente
io.on("connection", (socket) => {
  console.log("Nuevo usuario conectado");

  socket.on("message", (data) => {
    allMessages.push(data);

    //Emito mensaje para el cliente con todo el array de datos
    io.emit("logMessages", allMessages);      
    });
  });

