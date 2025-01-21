export function getUrl(relativePath) {
    // Esta función obtiene la ruta base del proyecto a partir del dominio de la URL actual,
    // y luego concatena esta base con la ruta relativa proporcionada para formar la URL completa del archivo.
    const origin = window.location.origin;
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
    const fullPath = `${origin}${basePath}/${relativePath}`;
    return fullPath;
}