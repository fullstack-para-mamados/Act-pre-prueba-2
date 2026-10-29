# GotyShop V.01 — versión mejorada

Proyecto HTML, CSS y JavaScript para la tienda GotyShop.

## Mejoras incorporadas desde la comparación

- Componentes/tarjetas de productos generados dinámicamente con JavaScript.
- Estado de carga y mensaje cuando no hay resultados.
- Buscador de productos en tiempo real.
- Botón "Añadir al carrito" con contador persistente mediante `localStorage`.
- Lista de deseos "Mi lista", también persistente.
- Insignia de producto destacado.
- Formulario de reseñas con calificación.
- Validación de reseña: el botón se habilita solo con 10 caracteres o más.
- Mensaje de éxito al publicar la reseña.
- Menú responsive para pantallas pequeñas.
- Correcciones de HTML/JS del formulario de contacto.

## Diferencia con el proyecto React de referencia

El otro proyecto usa React, componentes reutilizables, `useState`, `useEffect`, `fetch` y Jest. V.01 mantiene HTML/CSS/JavaScript tradicional, pero incorpora las mismas ideas funcionales con DOM, eventos y `localStorage`, sin convertir el proyecto completo a React.

## Ejecutar

No necesita servidor para las funciones principales. Se puede abrir `index.html` o usar Live Server en VS Code.
