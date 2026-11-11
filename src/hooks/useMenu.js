import { useState, useEffect } from "react";
import { obtenerMenu } from "../services/menuService.js";

export function useMenu() {
  const [platos, setPlatos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarMenu() {
      try {
        const datos = await obtenerMenu(controller.signal);
        setPlatos(datos);
        } catch (err) {
        if (err.name !== "AbortError") {
            console.error("Error al cargar el menú:", err);
            setError(err.message);
        }
        } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarMenu();

    return () => controller.abort();
  }, []);

  return { platos, cargando, error };
}