const listaProductos = [
  { id: 1, nombre: "Monster Hunter Wilds", precio: 43000, imagen: "img/images.jpg", destacado: true },
  { id: 2, nombre: "Fire Emblem Fortune Weaves", precio: 43000, imagen: "img/femblem.jpg", destacado: false },
  { id: 3, nombre: "Arknights: Endfield", precio: 3000, imagen: "img/endfield.jpg", destacado: true },
  { id: 4, nombre: "Clair Obscur: Expedition 33", precio: 33000, imagen: "img/33.jpg", destacado: true }
];

let carrito = Number(localStorage.getItem("gotyshop-carrito")) || 0;
let miLista = JSON.parse(localStorage.getItem("gotyshop-lista") || "[]");

const dinero = (valor) => "$" + valor.toLocaleString("es-CL");

function actualizarContadores() {
  const carritoEl = document.getElementById("contador-carrito");
  const listaEl = document.getElementById("contador-lista");
  if (carritoEl) carritoEl.textContent = carrito;
  if (listaEl) listaEl.textContent = miLista.length;
}

function agregarAlCarrito(id) {
  carrito++;
  localStorage.setItem("gotyshop-carrito", carrito);
  actualizarContadores();
  const producto = listaProductos.find(p => p.id === id);
  mostrarMensaje(`🛒 ${producto.nombre} agregado al carrito.`, "exito");
}

function alternarLista(id) {
  if (miLista.includes(id)) {
    miLista = miLista.filter(item => item !== id);
  } else {
    miLista.push(id);
  }
  localStorage.setItem("gotyshop-lista", JSON.stringify(miLista));
  actualizarContadores();
  cargarProductos(document.getElementById("buscador")?.value || "");
}

function crearTarjeta(producto) {
  const tarjeta = document.createElement("article");
  tarjeta.className = "producto";

  if (producto.destacado) {
    const tag = document.createElement("span");
    tag.className = "tag-destacado";
    tag.textContent = "DESTACADO";
    tarjeta.appendChild(tag);
  }

  const imagen = document.createElement("img");
  imagen.src = producto.imagen;
  imagen.alt = producto.nombre;
  imagen.loading = "lazy";

  const nombre = document.createElement("h3");
  nombre.textContent = producto.nombre;

  const precio = document.createElement("p");
  precio.className = "precio";
  precio.textContent = dinero(producto.precio);

  const acciones = document.createElement("div");
  acciones.className = "acciones-producto";

  const botonCarrito = document.createElement("button");
  botonCarrito.className = "boton";
  botonCarrito.type = "button";
  botonCarrito.textContent = "Añadir al carrito";
  botonCarrito.addEventListener("click", () => agregarAlCarrito(producto.id));

  const botonLista = document.createElement("button");
  botonLista.className = "boton boton-lista";
  botonLista.type = "button";
  botonLista.textContent = miLista.includes(producto.id) ? "✓ En mi lista" : "☆ Mi lista";
  botonLista.addEventListener("click", () => alternarLista(producto.id));

  acciones.append(botonCarrito, botonLista);
  tarjeta.append(imagen, nombre, precio, acciones);
  return tarjeta;
}

function cargarProductos(filtro = "") {
  const contenedor = document.getElementById("contenedor-productos");
  const estado = document.getElementById("estado-productos");
  if (!contenedor) return;

  estado.textContent = "Cargando productos...";
  contenedor.innerHTML = "";

  // Simula el estado de carga que en React se maneja con useState/useEffect.
  setTimeout(() => {
    const resultados = listaProductos.filter(p =>
      p.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    if (!resultados.length) {
      estado.textContent = "No encontramos juegos con ese nombre.";
      return;
    }

    estado.textContent = `${resultados.length} juego(s) encontrado(s).`;
    resultados.forEach(p => contenedor.appendChild(crearTarjeta(p)));
  }, 150);
}

function mostrarMensaje(texto, tipo) {
  const estado = document.getElementById("estado-productos");
  if (!estado) return;
  estado.textContent = texto;
  estado.className = `estado estado--${tipo}`;
  setTimeout(() => {
    estado.className = "estado";
    cargarProductos(document.getElementById("buscador")?.value || "");
  }, 1800);
}

function configurarReseña() {
  const formulario = document.getElementById("form-reseña");
  const comentario = document.getElementById("comentario");
  const boton = document.getElementById("btn-reseña");
  const error = document.getElementById("error-reseña");
  const mensaje = document.getElementById("mensaje-reseña");
  if (!formulario) return;

  comentario.addEventListener("input", () => {
    const valido = comentario.value.trim().length >= 10;
    boton.disabled = !valido;
    error.textContent = valido || comentario.value.length === 0
      ? ""
      : "La reseña debe tener al menos 10 caracteres.";
  });

  formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    if (comentario.value.trim().length < 10) return;
    mensaje.textContent = "✓ Reseña publicada correctamente.";
    mensaje.className = "mensaje-formulario mensaje-formulario--visible mensaje-formulario--exito";
    formulario.reset();
    boton.disabled = true;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarContadores();
  cargarProductos();

  const buscador = document.getElementById("buscador");
  buscador?.addEventListener("input", e => cargarProductos(e.target.value));

  configurarReseña();
});
