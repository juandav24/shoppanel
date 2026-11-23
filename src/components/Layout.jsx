import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useOrders } from "../context/OrdersContext";

/** Estructura comun de las paginas internas: barra de navegacion + contenido (Outlet). */
export default function Layout() {
  const { storageError } = useOrders();

  return (
    <>
      <Navbar />
      <main className="container py-4">
        {storageError && (
          <div className="alert alert-warning" role="alert">
            {storageError}
          </div>
        )}
        <Outlet />
      </main>
    </>
  );
}
