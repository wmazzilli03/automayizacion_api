

export function  editarPayload(obj: any, path: string, value: any): void {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) current[key] = {}; // Crea el nodo si no existe
    current = current[key];
  }

  current[keys[keys.length - 1]] = value;
}

/**
 * Elimina una propiedad de un objeto basado en un path
 */

export function  eliminarLlavePayload(obj: any, path: string): void {
  const keys = path.split(".");
  let current = obj;

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (!(key in current)) return; // Si el path no existe, no hace nada
    current = current[key];
  }

  delete current[keys[keys.length - 1]];
}