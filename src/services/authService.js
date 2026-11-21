import { supabase } from "./supabaseClient";

/**
 * Convierte los errores tecnicos de Supabase en mensajes comprensibles.
 */
function traducirError(error) {
  const msg = (error?.message || "").toLowerCase();

  if (msg.includes("invalid login credentials")) {
    return "Correo o contraseña incorrectos. Verifica tus datos e inténtalo de nuevo.";
  }
  if (msg.includes("email not confirmed")) {
    return "Tu correo aún no ha sido confirmado. Confirma el usuario en Supabase (Authentication → Users).";
  }
  if (msg.includes("failed to fetch") || msg.includes("network")) {
    return "No se pudo conectar con el servidor de autenticación. Revisa tu conexión a internet y la configuración del .env.";
  }
  return "No fue posible iniciar sesión. Inténtalo nuevamente.";
}

/** Inicia sesion con correo y contrasena usando Supabase Auth. */
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(traducirError(error));
  }
  return data;
}

/** Cierra la sesion actual. */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error("No se pudo cerrar la sesión. Inténtalo de nuevo.");
  }
}

/** Obtiene la sesion actual (si existe) desde Supabase. */
export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

/** Escucha los cambios de autenticacion. Devuelve la suscripcion para poder cancelarla. */
export function onAuthChange(callback) {
  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });
  return data.subscription;
}
