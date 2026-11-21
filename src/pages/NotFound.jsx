import { Link } from "react-router-dom";

/** Pagina para rutas inexistentes (path="*"). */
export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex flex-column align-items-center justify-content-center text-center p-3">
      <h1 className="display-1 fw-bold text-primary">404</h1>
      <h2 className="h4">Página no encontrada</h2>
      <p className="text-muted">La ruta que intentas abrir no existe.</p>
      <Link to="/productos" className="btn btn-primary">
        Ir al inicio
      </Link>
    </div>
  );
}
