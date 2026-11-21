// Servicio de productos: solicitudes GET a DummyJSON usando fetch.
const BASE_URL = "https://dummyjson.com";

/**
 * Hace una solicitud GET y valida la respuesta.
 * Lanza un error con la propiedad `status` si la respuesta no es exitosa.
 */
async function request(path) {
  let response;
  try {
    response = await fetch(`${BASE_URL}${path}`);
  } catch {
    const err = new Error(
      "No se pudo conectar con el servicio de productos. Revisa tu conexión a internet."
    );
    err.status = 0;
    throw err;
  }

  if (!response.ok) {
    const err = new Error(
      response.status === 404
        ? "El producto solicitado no existe."
        : "Ocurrió un error al consultar los productos. Inténtalo más tarde."
    );
    err.status = response.status;
    throw err;
  }

  return response.json();
}

/** GET /products -> lista de productos */
export async function getProducts() {
  const data = await request("/products");
  return data.products;
}

/** GET /products/search?q=termino -> busqueda (funcionalidad opcional) */
export async function searchProducts(term) {
  const data = await request(`/products/search?q=${encodeURIComponent(term)}`);
  return data.products;
}

/** GET /products/{id} -> detalle de un producto */
export async function getProductById(id) {
  return request(`/products/${encodeURIComponent(id)}`);
}
