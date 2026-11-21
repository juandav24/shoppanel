import { Link } from "react-router-dom";
import { ORDER_STATUSES, useOrders } from "../context/OrdersContext";

const BADGE = {
  Pendiente: "text-bg-warning",
  Confirmado: "text-bg-primary",
  Enviado: "text-bg-success",
  Cancelado: "text-bg-danger",
};

/** Vista de pedidos: consulta, cambio de estado y eliminacion (simulados en el front-end). */
export default function Orders() {
  const { orders, updateOrderStatus, removeOrder } = useOrders();

  // Lista de pedidos vacia.
  if (orders.length === 0) {
    return (
      <div className="text-center py-5">
        <h2 className="h4">Aún no tienes pedidos</h2>
        <p className="text-muted">Agrega productos desde el listado para registrarlos aquí.</p>
        <Link to="/productos" className="btn btn-primary">
          Ver productos
        </Link>
      </div>
    );
  }

  const total = orders
    .filter((o) => o.status !== "Cancelado")
    .reduce((sum, o) => sum + o.price, 0);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h4 mb-0">Mis pedidos</h2>
        <span className="text-muted">
          Total (sin cancelados): <strong>${total.toFixed(2)}</strong>
        </span>
      </div>

      <div className="card shadow-sm">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Estado</th>
                <th style={{ minWidth: 170 }}>Cambiar estado</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId}>
                  <td>
                    <div className="d-flex align-items-center gap-3">
                      <img src={order.image} alt={order.name} className="order-thumb" />
                      <div>
                        <Link to={`/productos/${order.productId}`} className="fw-semibold text-decoration-none">
                          {order.name}
                        </Link>
                        <div className="small text-muted">
                          {new Date(order.createdAt).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>${order.price}</td>
                  <td>
                    <span className={`badge ${BADGE[order.status]}`}>{order.status}</span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                      aria-label={`Estado del pedido ${order.name}`}
                    >
                      {ORDER_STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeOrder(order.orderId)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
