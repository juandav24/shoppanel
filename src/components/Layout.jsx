import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

/** Estructura comun de las paginas internas: barra de navegacion + contenido (Outlet). */
export default function Layout() {
  return (
    <>
      <Navbar />
      <main className="container py-4">
        <Outlet />
      </main>
    </>
  );
}
