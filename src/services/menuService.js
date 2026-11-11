const API_URL =
  "https://script.google.com/macros/s/AKfycbzgeSm3joOrsz3iiRKPc6INAUIlsWDwxsUWIJMJRBn6KSUS_RbuNc7WnYLsU_D-DZpXyA/exec";

export async function obtenerMenu(signal) {
  const respuesta = await fetch(API_URL, { signal });

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el menú");
  }

  const datos = await respuesta.json();

  if (!Array.isArray(datos)) {
    throw new Error("Formato de menú incorrecto");
  }

  return datos.slice(1)
    .map((fila, indice) => ({
      id: indice + 1,
      categoria: String(fila[0] ?? "").trim(),
      nombre: String(fila[1] ?? "").trim(),
      precio: String(fila[2] ?? "").trim(),
      descripcion: String(fila[3] ?? "").trim(),

      activo:
        fila[4] === true ||
        String(fila[4] ?? "").trim().toUpperCase() === "TRUE"
    }))
    .filter(plato =>
      plato.categoria &&
      plato.nombre &&
      plato.precio &&
      plato.activo
    );
}