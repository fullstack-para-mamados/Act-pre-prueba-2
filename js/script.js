function actualizarCarritoInicio() {
  const contador = document.getElementById("contador-carrito");
  const lista = document.getElementById("contador-lista");
  if (contador) contador.textContent = Number(localStorage.getItem("gotyshop-carrito")) || 0;

  const miLista = JSON.parse(localStorage.getItem("gotyshop-lista") || "[]");
  if (lista) lista.textContent = miLista.length;
}

function configurarMenu() {
  const boton = document.getElementById("boton-menu");
  const menu = document.getElementById("menu");
  if (!boton || !menu) return;
  boton.addEventListener("click", () => menu.classList.toggle("menu--abierto"));
}

document.addEventListener("DOMContentLoaded", () => {
  actualizarCarritoInicio();
  configurarMenu();
});
