const API_URL =
  "https://script.google.com/macros/s/AKfycbxh8ZjyPX45Qihr58QOp3ooSWJrLlXNURLiAn05zbyEzqJwAevx8vmPpy940bw_dU_NKg/exec";

function formatearHoja(datos, tipoCarta) {
  if (!Array.isArray(datos)) return [];

  return datos
    .slice(1)
    .map((fila, indice) => {
      let categoriaOriginal = String(fila[0] ?? "").trim();

  
      if (categoriaOriginal.toLowerCase() === "llevar") {
        categoriaOriginal = "Entradas";
      }

      return {
        id: `${tipoCarta}-${indice + 1}`,
        tipoCarta, // "local", "llevar" o "bebestibles"
        categoria: categoriaOriginal,
        nombre: String(fila[1] ?? "").trim(),
        precio: String(fila[2] ?? "").trim(),
        descripcion: String(fila[3] ?? "").trim(),
        activo:
          fila[4] === true ||
          String(fila[4] ?? "").trim().toUpperCase() === "TRUE"
      };
    })
    .filter(
      (plato) =>
        plato.categoria && plato.nombre && plato.precio && plato.activo
    );
}

export async function obtenerMenuPorTipo(tipo, signal) {
  const respuesta = await fetch(`${API_URL}?tipo=${tipo}`, { signal });

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener la carta");
  }

  const datos = await respuesta.json();

  if (datos.error) {
    throw new Error(datos.error);
  }

  return formatearHoja(datos, tipo);
}