import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { useOrders } from "../context/OrdersContext";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

/** Detalle de producto: el id se obtiene de la URL con useParams (ruta dinamica). */
export default function ProductDetail() {
  const { id } = useParams();
  const { addOrder } = useOrders();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let activo = true;

    async function cargar() {
      setLoading(true);
      setError("");
      setNotFound(false);
      setAdded(false);
      try {
        const data = await getProductById(id);
        if (activo) setProduct(data);
      } catch (err) {
        if (!activo) return;
        if (err.status === 404) setNotFound(true); // producto inexistente
        else setError(err.message);
      } finally {
        if (activo) setLoading(false);
      }
    }

    cargar();
    return () => {
      activo = false;
    };
  }, [id]);

  const handleAdd = () => {
    addOrder(product);
    setAdded(true);
  };

  if (loading) return <Loader message="Cargando producto..." />;

  if (notFound) {
    return (
      <div className="text-center py-5">
        <h2 className="h4">Producto no encontrado</h2>
        <p className="text-muted">El producto con id "{id}" no existe.</p>
        <Link to="/productos" className="btn btn-primary">
          Volver a productos
        </Link>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <ErrorMessage message={error} />
        <Link to="/productos" className="btn btn-outline-secondary">
          ← Volver
        </Link>
      </>
    );
  }

  return (
    <>
      <Link to="/productos" className="btn btn-link px-0 mb-3">
        ← Volver a productos
      </Link>

      <div className="card shadow-sm">
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center justify-content-center bg-white p-3">
            <img src={product.thumbnail} alt={product.title} className="img-fluid" />
          </div>
          <div className="col-md-7">
            <div className="card-body p-4">
              <span className="badge text-bg-secondary mb-2">{product.category}</span>
              <h2 className="h3">{product.title}</h2>
              {product.brand && <p className="text-muted mb-2">Marca: {product.brand}</p>}
              <p>{product.description}</p>
              <p className="fs-3 fw-bold">${product.price}</p>
              <ul className="list-unstyled text-muted small">
                <li>Calificación: {product.rating} / 5</li>
                <li>Stock disponible: {product.stock}</li>
              </ul>

              <button className="btn btn-primary" onClick={handleAdd}>
                Agregar pedido
              </button>
              {added && (
                <div className="alert alert-success mt-3 mb-0" role="alert">
                  Pedido registrado con estado "Pendiente".{" "}
                  <Link to="/pedidos">Ver mis pedidos</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
