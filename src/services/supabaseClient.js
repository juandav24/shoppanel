import { createClient } from "@supabase/supabase-js";

// Solo se usan la URL del proyecto y la clave publica (anon / publishable).
// Nunca se usa ni se publica la clave service_role.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  // Ayuda a detectar rapido un .env mal configurado durante el desarrollo.
  console.warn(
    "Faltan VITE_SUPABASE_URL o VITE_SUPABASE_ANON_KEY. Revisa tu archivo .env (usa .env.example como guia)."
  );
}

// Configuracion por defecto: Supabase administra la persistencia de la sesion.
// No se guardan tokens ni contrasenas manualmente en localStorage.
export const supabase = createClient(
  supabaseUrl ?? "https://placeholder.supabase.co",
  supabaseAnonKey ?? "placeholder-key"
);
