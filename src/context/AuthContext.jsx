import { createContext, useContext, useEffect, useState } from "react";
import {
  signIn,
  signOut,
  getSession,
  onAuthChange,
} from "../services/authService";

const AuthContext = createContext(null);

/**
 * Proveedor global de la sesion.
 * Comparte: usuario, sesion, estado de autenticacion, login y logout.
 * La persistencia la maneja Supabase Auth (no se guarda nada manualmente).
 */
export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  // true mientras se recupera la sesion inicial; evita redirigir al login por error al recargar.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let activo = true;

    // 1. Recuperar la sesion existente (si el usuario ya habia iniciado sesion).
    getSession()
      .then((currentSession) => {
        if (!activo) return;
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
      })
      .catch(() => {
        if (!activo) return;
        setSession(null);
        setUser(null);
      })
      .finally(() => {
        if (activo) setLoading(false);
      });

    // 2. Escuchar cambios (login, logout, expiracion, renovacion de token).
    const subscription = onAuthChange((newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
      setLoading(false);
    });

    return () => {
      activo = false;
      subscription.unsubscribe();
    };
  }, []);

  const login = (email, password) => signIn(email, password);
  const logout = () => signOut();

  const value = {
    user,
    session,
    loading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Hook para consultar la sesion desde cualquier componente sin pasar props. */
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
