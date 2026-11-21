import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // necesario para el menu colapsable del navbar
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { OrdersProvider } from "./context/OrdersContext.jsx";

// Orden de los proveedores:
// BrowserRouter -> AuthProvider (sesion) -> OrdersProvider (pedidos, depende del usuario) -> App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OrdersProvider>
          <App />
        </OrdersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
