const formulario = document.getElementById("form-contacto");
if (!formulario) { throw new Error("Formulario de contacto no encontrado"); }
const nombre = document.getElementById("nombre");
const correo = document.getElementById("email");
const mensaje = document.getElementById("mensaje");
const errorNombre = document.getElementById("error-nombre");
const errorCorreo = document.getElementById("error-correo");
const errorMensaje = document.getElementById("error-mensaje");
const mensajeFormulario = document.getElementById("mensaje-formulario");

function establecerError(input, elementoError, texto) {
  elementoError.textContent = texto;
  if (texto) {
    input.setAttribute("aria-invalid", "true");
  } else {
    input.removeAttribute("aria-invalid");
  }
}

function validarCorreo() {
  const valor = correo.value.trim().toLowerCase();
  const dominiosPermitidos = ["@hotmail.com", "@gmail.com"];

  if (valor === "") {
    establecerError(correo, errorCorreo, "El correo es obligatorio.");
    return false;
  }

  const formato = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
  const dominioPermitido = dominiosPermitidos.some((dominio) => valor.endsWith(dominio));

  if (!formato) {
    establecerError(correo, errorCorreo, "Ingresa un correo electrónico válido.");
    return false;
  }

  if (!dominioPermitido) {
    establecerError(correo, errorCorreo, "Solo se permiten correos @hotmail.com o @gmail.com.");
    return false;
  }

  establecerError(correo, errorCorreo, "");
  return true;
}


function validarNombre() {
  const valor = nombre.value.trim();
  if (valor === "") {
    establecerError(nombre, errorNombre, "El nombre es obligatorio.");
    return false;
  }
  establecerError(nombre, errorNombre, "");
  return true;
}
function validarMensaje() {
  const valor = mensaje.value.trim();
  if (valor === "") {
    establecerError(mensaje, errorMensaje, "El mensaje es obligatorio.");
    return false;
  }
  establecerError(mensaje, errorMensaje, "");
  return true;
}

function validarFormulario() {
  const nombreValido = validarNombre();
  const correoValido = validarCorreo();
  const mensajeValido = validarMensaje();
  return nombreValido && correoValido && mensajeValido;
}




[nombre, correo, mensaje].forEach((campo) => {
  campo.addEventListener("input", () => {
    if (campo === nombre) validarNombre();
    if (campo === correo) validarCorreo();
    if (campo === mensaje) validarMensaje();
  });
});

formulario.addEventListener("submit", (event) => {
  event.preventDefault();
  mensajeFormulario.className = "mensaje-formulario";

  if (!validarFormulario()) {
    mensajeFormulario.textContent = "Revisa los campos marcados antes de enviar.";
    mensajeFormulario.classList.add("mensaje-formulario--visible", "mensaje-formulario--error");
    return;
  }

  mensajeFormulario.textContent = "Formulario enviado correctamente.";
  mensajeFormulario.classList.add("mensaje-formulario--visible", "mensaje-formulario--exito");
  formulario.reset();
});
