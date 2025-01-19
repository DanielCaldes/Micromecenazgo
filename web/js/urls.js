export function getUrl(relativePath) {
    const origin = window.location.origin;
    const basePath = window.location.pathname.split('/').slice(0, -1).join('/');
    const fullPath = `${origin}${basePath}/${relativePath}`;
    return fullPath;
}