import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const OrdersContext = createContext(null);

// Estados posibles de un pedido.
export const ORDER_STATUSES = ["Pendiente", "Confirmado", "Enviado", "Cancelado"];

/** Lee los pedidos guardados; si el JSON esta danado devuelve una lista vacia. */
function readOrders(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

/**
 * Proveedor de pedidos simulados.
 * - El estado vive en useState.
 * - Se persiste en localStorage (una clave por usuario) para que no se pierdan al recargar.
 * - Solo se guardan pedidos; nunca tokens ni contrasenas.
 */
export function OrdersProvider({ children }) {
  const { user } = useAuth();
  const storageKey = user ? `shoppanel_orders_${user.id}` : null;

  const [orders, setOrders] = useState([]);
  // Mensaje visible si no se pudieron guardar los pedidos en localStorage.
  const [storageError, setStorageError] = useState("");

  // Cargar los pedidos del usuario actual cuando cambia la sesion.
  useEffect(() => {
    setOrders(storageKey ? readOrders(storageKey) : []);
    setStorageError("");
  }, [storageKey]);

  const persist = (next) => {
    setOrders(next);
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
        setStorageError("");
      } catch {
        // La app sigue funcionando en memoria, pero se avisa al usuario en la interfaz.
        setStorageError(
          "No se pudieron guardar los pedidos en este navegador. Los cambios podrían perderse al recargar la página."
        );
      }
    }
  };

  /** Registra un pedido simulado con estado inicial "Pendiente". */
  const addOrder = (product) => {
    const newOrder = {
      orderId: `${Date.now()}-${product.id}`,
      productId: product.id,
      name: product.title,
      image: product.thumbnail,
      price: product.price,
      status: "Pendiente",
      createdAt: new Date().toISOString(),
    };
    persist([newOrder, ...orders]);
  };

  /** Cambia el estado de un pedido. */
  const updateOrderStatus = (orderId, status) => {
    persist(
      orders.map((order) =>
        order.orderId === orderId ? { ...order, status } : order
      )
    );
  };

  /** Elimina un pedido de la lista. */
  const removeOrder = (orderId) => {
    persist(orders.filter((order) => order.orderId !== orderId));
  };

  const value = { orders, addOrder, updateOrderStatus, removeOrder, storageError };

  return (
    <OrdersContext.Provider value={value}>{children}</OrdersContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error("useOrders debe usarse dentro de un OrdersProvider");
  }
  return context;
}
