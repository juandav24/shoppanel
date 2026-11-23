# ShopPanel

Panel de usuario para una plataforma de pedidos de productos — Actividad entregable Unidad II.

**Integrantes:** Juan David López · Elian Lima Bejarano

## Tecnologías

- React 18 + Vite 5
- React Router 6 (rutas públicas, protegidas y dinámicas)
- Context API + `useState` / `useEffect`
- Supabase Auth (`@supabase/supabase-js`) para iniciar y cerrar sesión
- DummyJSON consultado con `fetch` (solo solicitudes GET)
- `localStorage` para los pedidos simulados
- Bootstrap 5

## Estructura

```
src/
├── components/   # Navbar, Layout, ProductCard, ProtectedRoute, Loader, ErrorMessage
├── context/      # AuthContext (sesión) y OrdersContext (pedidos)
├── pages/        # Login, Products, ProductDetail, Orders, NotFound
└── services/     # supabaseClient, authService, productService
```

## Rutas

| Ruta | Tipo | Vista |
|---|---|---|
| `/login` | Pública | Inicio de sesión |
| `/productos` | Protegida | Listado de productos |
| `/productos/:id` | Protegida y dinámica | Detalle de producto |
| `/pedidos` | Protegida | Pedidos y cambio de estado |
| `/` | Redirección | Redirige a `/productos` |
| `*` | Pública | Página 404 |

## Configuración de Supabase (cada integrante con su propio proyecto)

1. Crear un proyecto en [Supabase](https://supabase.com).
2. En **Authentication → Sign In / Providers**, verificar que **Email** esté habilitado.
3. En **Authentication → Users → Add user**, crear un usuario de prueba con la opción **Auto Confirm User**.
4. En **Project Settings → API**, copiar la **Project URL** y la clave pública **anon / publishable**.

> Nunca use ni publique la clave `service_role`. No es necesario crear tablas: Supabase se usa solo para autenticar.

## Instalación y ejecución

```bash
npm install
```

Copiar el archivo de ejemplo y completar los valores de su proyecto:

```bash
# Linux / macOS / Git Bash
cp .env.example .env

# Windows (CMD)
copy .env.example .env
```

```dotenv
VITE_SUPABASE_URL=https://<su-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<su-clave-publica-anon>
```

```bash
npm run dev      # http://localhost:5173
npm run build    # compilación de producción en dist/
npm run preview  # previsualizar la compilación
```

## Seguridad y alcance

- `.env` está excluido en `.gitignore`; solo se publica `.env.example` sin valores reales.
- La persistencia de la sesión la administra Supabase Auth con la configuración predeterminada del cliente. El código no guarda manualmente contraseñas ni tokens.
- Los pedidos son una simulación en el front-end: se guardan en `localStorage` con una clave por usuario (`shoppanel_orders_<id>`). No se sincronizan entre dispositivos y no equivalen a almacenamiento seguro en un servidor.
- No se incluye formulario de registro, backend propio ni pagos reales (fuera del alcance de la actividad).
