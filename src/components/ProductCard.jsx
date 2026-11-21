import { Link } from "react-router-dom";

/**
 * Tarjeta reutilizable de producto.
 * Recibe TODA su informacion por props (product, onAdd, added).
 */
export default function ProductCard({ product, onAdd, added = false }) {
  return (
    <div className="card h-100 shadow-sm product-card">
      <img
        src={product.thumbnail}
        className="card-img-top"
        alt={product.title}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text text-muted small">{product.description}</p>
        <p className="fw-bold fs-5 mt-auto mb-3">${product.price}</p>

        <div className="d-grid gap-2">
          <Link to={`/productos/${product.id}`} className="btn btn-outline-primary btn-sm">
            Ver detalle
          </Link>
          <button className="btn btn-primary btn-sm" onClick={() => onAdd(product)}>
            Agregar pedido
          </button>
          {added && (
            <small className="text-success text-center">✔ Pedido registrado</small>
          )}
        </div>
      </div>
    </div>
  );
}
