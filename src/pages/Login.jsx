import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

export default function Login() {
  const { user, loading, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Estados locales con useState: campos del formulario, errores y carga.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Si ya hay sesion, no tiene sentido mostrar el login.
  if (loading) return <Loader message="Verificando sesión..." />;
  if (user) return <Navigate to="/productos" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validacion: campos vacios.
    if (!email.trim() || !password.trim()) {
      setError("Debes ingresar el correo y la contraseña.");
      return;
    }

    setSubmitting(true);
    try {
      await login(email.trim(), password);
      // Redirige a la ruta protegida de productos (o a la que intentaba abrir).
      const destino = location.state?.from?.pathname || "/productos";
      navigate(destino, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="card shadow login-card">
        <div className="card-body p-4">
          <h1 className="h3 text-center mb-1">ShopPanel</h1>
          <p className="text-center text-muted mb-4">Inicia sesión para continuar</p>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="usuario@correo.com"
                autoComplete="email"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={submitting}>
              {submitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Ingresando...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
