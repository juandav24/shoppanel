import { useEffect, useState } from "react";
import { getProducts, searchProducts } from "../services/productService";
import { useOrders } from "../context/OrdersContext";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

/** Panel principal: listado de productos con busqueda opcional. */
export default function Products() {
  const { orders, addOrder } = useOrders();

  // Estados locales con useState.
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [query, setQuery] = useState(""); // termino aplicado
  const [justAdded, setJustAdded] = useState(null); // id del ultimo producto agregado
  const [reloadKey, setReloadKey] = useState(0); // permite reintentar la consulta

  // Consulta a DummyJSON con fetch. Se repite cuando cambia el termino de busqueda.
  useEffect(() => {
    let activo = true;

    async function cargar() {
      setLoading(true);
      setError("");
      try {
        const data = query ? await searchProducts(query) : await getProducts();
        if (activo) setProducts(data);
      } catch (err) {
        if (activo) setError(err.message);
      } finally {
        if (activo) setLoading(false);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, [query, reloadKey]);

  const handleSearch = (e) => {
    e.preventDefault();
    setQuery(searchInput.trim());
  };

  const handleClear = () => {
    setSearchInput("");
    setQuery("");
  };

  const handleAdd = (product) => {
    addOrder(product);
    setJustAdded(product.id);
  };

  const pendientes = orders.filter((o) => o.status === "Pendiente").length;

  return (
    <>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <div className="card text-bg-primary">
            <div className="card-body">
              <div className="small">Pedidos registrados</div>
              <div className="fs-3 fw-bold">{orders.length}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="card text-bg-warning">
            <div className="card-body">
              <div className="small">Pedidos pendientes</div>
              <div className="fs-3 fw-bold">{pendientes}</div>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <form className="card h-100" onSubmit={handleSearch}>
            <div className="card-body d-flex flex-column justify-content-center">
              <label htmlFor="search" className="small text-muted mb-1">
                Buscar productos
              </label>
              <div className="input-group">
                <input
                  id="search"
                  className="form-control"
                  placeholder="Ej: phone, laptop..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Buscar
                </button>
                {query && (
                  <button className="btn btn-outline-secondary" type="button" onClick={handleClear}>
                    ✕
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      <h2 className="h4 mb-3">Productos disponibles</h2>

      {loading && <Loader message="Cargando productos..." />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={() => setReloadKey((k) => k + 1)} />
      )}

      {!loading && !error && products.length === 0 && (
        <div className="alert alert-info">
          No se encontraron productos{query ? ` para "${query}"` : ""}.
        </div>
      )}

      {!loading && !error && products.length > 0 && (
        <div className="row g-4">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={product.id}>
              <ProductCard
                product={product}
                onAdd={handleAdd}
                added={justAdded === product.id}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
