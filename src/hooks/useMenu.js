import { useState, useEffect } from "react";
import { obtenerMenuPorTipo } from "../services/menuService.js";

const CACHE_KEY = "mariaelena_cartas_v3";

export function useMenu(tipoSeleccionado = "local") {
  const [cartas, setCartas] = useState(() => {
    try {
      const guardado = localStorage.getItem(CACHE_KEY);
      return guardado
        ? JSON.parse(guardado)
        : { local: [], llevar: [], bebestibles: [] };
    } catch {
      return { local: [], llevar: [], bebestibles: [] };
    }
  });

  const platosActuales = cartas[tipoSeleccionado] || [];
  const [cargando, setCargando] = useState(() => platosActuales.length === 0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarTodasLasCartas() {
      try {
        // Descargamos las 3 pestañas del Excel en paralelo
        const [datosLocal, datosLlevar, datosBebestibles] = await Promise.all([
          obtenerMenuPorTipo("local", controller.signal).catch(() => []),
          obtenerMenuPorTipo("llevar", controller.signal).catch(() => []),
          obtenerMenuPorTipo("bebestibles", controller.signal).catch(() => [])
        ]);

        const nuevasCartas = {
          local: datosLocal,
          llevar: datosLlevar,
          bebestibles: datosBebestibles
        };

        setCartas(nuevasCartas);
        localStorage.setItem(CACHE_KEY, JSON.stringify(nuevasCartas));
        setError(null);
      } catch (err) {
        if (err.name !== "AbortError" && platosActuales.length === 0) {
          setError("No se pudo cargar la carta.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarTodasLasCartas();

    return () => controller.abort();
  }, []);

  return {
    platos: platosActuales,
    cargando: cargando && platosActuales.length === 0,
    error
  };
}