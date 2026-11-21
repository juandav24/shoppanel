import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrdersContext";

/** Barra de navegacion: lee la sesion desde Context (sin props). */
export default function Navbar() {
  const { user, logout } = useAuth();
  const { orders } = useOrders();
  const navigate = useNavigate();
  const [closing, setClosing] = useState(false);

  const handleLogout = async () => {
    setClosing(true);
    try {
      await logout();
    } finally {
      setClosing(false);
      // Al cerrar sesion se redirige al login.
      navigate("/login", { replace: true });
    }
  };

  const linkClass = ({ isActive }) => `nav-link${isActive ? " active fw-semibold" : ""}`;

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/productos">
          ShopPanel
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Mostrar menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className={linkClass} to="/productos">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={linkClass} to="/pedidos">
                Pedidos <span className="badge text-bg-warning">{orders.length}</span>
              </NavLink>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            <span className="text-light small">{user?.email}</span>
            <button
              className="btn btn-outline-light btn-sm"
              onClick={handleLogout}
              disabled={closing}
            >
              {closing ? "Saliendo..." : "Cerrar sesión"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
