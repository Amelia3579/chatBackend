//Creo una instancia de socket del lado del cliente

const socket = io();

//Creamos una variable para guardar el usuario
let user;
const chatBox = document.getElementById("chatBox");

//Utilizamos Sweet Alert para el mensaje de bienvenida
Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingresá un nombre para iniciar el chat",
  //Validación para que contenga el nombre
  inputValidator: (value) => {
    return !value && "Es necesario completar el campo para continuar";
  },
  //Anulo los clicks por fuera
  allowOutsideClick: false,
}).then((result) => {
  user = result.value;
});

//Validación para evitar que se envíen espacios vacíos
chatBox.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    if (chatBox.value.trim().length > 0) {
      socket.emit("message", { user: user, message: chatBox.value });
      chatBox.value = "";
    }
  }
});

//Listener de mensajes (recibo el array con todos los mensajes que me está enviando el servidor)
socket.on("logMessages", (data) => {
  const log = document.getElementById("logMessages");
  let messages = "";

  data.forEach((message) => {
    messages = messages + `${message.user} dice: ${message.message}`;
  });
  log.innerHTML = messages;
});
