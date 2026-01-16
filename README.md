# Vehículos - Gestión de Mantenimiento

Aplicación web para gestionar tus vehículos y su mantenimiento de forma inteligente. Registrá mantenimientos, programá recordatorios y nunca más te olvides de un cambio de aceite o revisión importante.

## Tecnologías

- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Vite** - Build tool y dev server
- **React Router DOM** - Navegación

## Características

- Landing page con información del producto
- Sistema de autenticación (login y registro)
- Dashboard protegido para usuarios autenticados
- Gestión de vehículos y sus mantenimientos

## Requisitos

- Node.js 20 o superior
- npm

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repo>

# Instalar dependencias
npm install
```

## Scripts disponibles

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## Variables de entorno

Creá un archivo `.env` en la raíz del proyecto:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Estructura del proyecto

```
src/
├── components/     # Componentes reutilizables (Navbar, Hero, Features, AuthModal)
├── context/        # Contextos de React (AuthContext)
├── pages/          # Páginas de la aplicación (Dashboard)
├── services/       # Servicios y llamadas a API
├── App.tsx         # Componente principal con rutas
└── main.tsx        # Punto de entrada
```

## Deploy

El proyecto incluye CI/CD con GitHub Actions. Al pushear a la rama `master`, se buildea y despliega automáticamente al VPS configurado.

### Secrets requeridos en GitHub

- `API_BASE_URL` - URL base de la API
- `HOST` - IP o dominio del servidor
- `USERNAME` - Usuario SSH
- `SSH_KEY` - Clave privada SSH
- `DEPLOY_PATH` - Ruta de destino en el servidor
