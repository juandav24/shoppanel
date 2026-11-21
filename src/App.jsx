import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      {/* Ruta publica */}
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas: ProtectedRoute verifica la sesion y Layout agrega la barra de navegacion */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/productos" element={<Products />} />
          <Route path="/productos/:id" element={<ProductDetail />} />
          <Route path="/pedidos" element={<Orders />} />
        </Route>
      </Route>

      {/* Redireccion de la raiz */}
      <Route path="/" element={<Navigate to="/productos" replace />} />

      {/* Ruta inexistente */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
