# ShopPanel

Panel de usuario para una plataforma de pedidos de productos (Unidad II).
Stack: React + Vite, React Router, Context API, useState, fetch, localStorage y Bootstrap.

- **Autenticación:** Supabase Auth (`@supabase/supabase-js`). La sesión la persiste Supabase.
- **Productos:** DummyJSON (solo solicitudes GET).
- **Pedidos:** simulados en el front-end (useState + localStorage).

## Requisitos

- Node.js 18 o superior
- Un proyecto propio en [Supabase](https://supabase.com)

## Configuración de Supabase

1. Crea un proyecto en Supabase.
2. En **Authentication → Providers** verifica que *Email* esté habilitado.
3. En **Authentication → Users** crea un usuario de prueba (*Add user → Create new user*) con correo y contraseña. Marca *Auto Confirm User* para que no pida confirmar el correo.
4. En **Project Settings → API** copia la **Project URL** y la clave pública **anon / publishable**.

## Instalación y ejecución

```bash
npm install
cp .env.example .env     # en Windows: copy .env.example .env
# Edita .env con tu URL y tu clave publica
npm run dev
```

Abre http://localhost:5173 e inicia sesión con el usuario de prueba.

> Nunca uses ni publiques la clave `service_role`. El archivo `.env` está en `.gitignore`.

## Estructura

```
src/
├── components/   # Navbar, Layout, ProtectedRoute, ProductCard, Loader, ErrorMessage
├── context/      # AuthContext (sesión) y OrdersContext (pedidos)
├── pages/        # Login, Products, ProductDetail, Orders, NotFound
├── services/     # supabaseClient, authService, productService
├── App.jsx       # Definición de rutas
└── main.jsx      # Punto de entrada y proveedores
```

## Rutas

| Ruta | Tipo | Descripción |
|------|------|-------------|
| `/login` | Pública | Inicio de sesión |
| `/productos` | Protegida | Listado de productos |
| `/productos/:id` | Protegida / dinámica | Detalle de producto |
| `/pedidos` | Protegida | Pedidos y cambio de estado |
| `*` | Pública | Página no encontrada |
