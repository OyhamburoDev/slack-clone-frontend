# Clon de Slack - Aplicación de Chat en Tiempo Real

Aplicación web full-stack que replica Slack con mensajería en tiempo real, gestión de workspaces, canales y sistema completo de permisos. Desarrollada con React, Node.js, MongoDB y WebSockets.

> 🎓 **Proyecto en Evolución:** Comenzó como proyecto final para UTN (Universidad Tecnológica Nacional), pero continué desarrollándolo por iniciativa propia, agregando características avanzadas como WebSockets, editor de texto enriquecido, sistema de búsqueda, y arquitectura escalable.

---

![Demo de la aplicación](./video/demo-slack-clone.gif)

---

## 🌐 Demo en Vivo

🔗 **[Ver Demo](https://slackapp-utn.vercel.app)**

### 🔑 Credenciales de Prueba

Para probar la aplicación sin necesidad de registrarte, podés usar estas credenciales:
```
Email: demo@slackclone.com
Contraseña: Demo123456
```

> **Nota:** Este usuario ya tiene workspaces y canales configurados para que puedas explorar todas las funcionalidades.

---

## 🔗 Enlaces del Proyecto

- 🌐 **Demo Frontend:** [https://slackapp-utn.vercel.app](https://slackapp-utn.vercel.app)
- ⚙️ **Repositorio Backend:** [GitHub - Backend](https://github.com/OyhamburoDev/slack-clone-backend)
- 📡 **API Backend:** [https://slack-clone-backend-bk4o.onrender.com](https://slack-clone-backend-bk4o.onrender.com)

---

## ✨ Características Principales

### 🔐 Autenticación y Seguridad
- ✅ **Sistema completo de autenticación** - Registro, login y verificación por email
- ✅ **Rutas protegidas** - Control de acceso basado en JWT
- ✅ **Sistema de roles** - Administradores y miembros con permisos diferenciados
- ✅ **Gestión de sesión** - Cerrar sesión desde menú de usuario

### 🏢 Gestión de Workspaces
- ✅ **Crear workspaces** - Espacios de trabajo personalizados
- ✅ **Invitar miembros** - Sistema de invitaciones vía email
- ✅ **Cambio rápido** - Dropdown para navegar entre workspaces
- ✅ **Eliminar workspaces** - Solo administradores (con confirmación)

### 📢 Canales y Comunicación
- ✅ **Crear y gestionar canales** - Organización por temas
- ✅ **Eliminar canales** - Control de permisos por rol
- ✅ **Mensajería en tiempo real** - WebSockets con Socket.io para actualizaciones instantáneas
- ✅ **Agrupación inteligente de mensajes** - Similar a Slack (agrupa mensajes del mismo usuario)
- ✅ **Timestamps completos** - Fecha y hora en cada mensaje
- ✅ **Divisores de fecha** - Separación visual por días

### ✍️ Editor de Mensajes Avanzado
- ✅ **Texto enriquecido** - Negrita, cursiva, subrayado, tachado
- ✅ **Formato de código** - Código inline con resaltado
- ✅ **Listas** - Viñetas y numeradas
- ✅ **Selector de emojis** - Picker completo integrado
- ✅ **Links automáticos** - Detección y formato automático de URLs
- ✅ **Editor TipTap** - Experiencia de escritura profesional

### 🔍 Sistema de Búsqueda
- ✅ **Búsqueda global** - Encuentra workspaces, canales y mensajes
- ✅ **Búsqueda en tiempo real** - Resultados mientras escribís
- ✅ **Navegación rápida** - Click directo a resultados
- ✅ **Búsqueda de mensajes** - Encuentra contenido en todo el workspace

### 🎨 Interfaz de Usuario
- ✅ **Diseño responsivo** - Optimizado para mobile, tablet y desktop
- ✅ **UI fiel a Slack** - Interfaz familiar y profesional
- ✅ **Menús contextuales** - Workspace y usuario con opciones rápidas
- ✅ **Iconografía consistente** - Lucide React para iconos modernos

---

## 🚀 Tecnologías

### Frontend
- **React 18** - Librería de UI
- **Vite** - Build tool y dev server ultrarrápido
- **React Router DOM** - Manejo de rutas y navegación
- **Socket.io Client** - WebSockets para mensajería en tiempo real
- **TipTap** - Editor de texto enriquecido (WYSIWYG)
- **Emoji Picker React** - Selector de emojis
- **Lucide React** - Iconos modernos y consistentes
- **jwt-decode** - Decodificación de tokens JWT
- **CSS3** - Estilos personalizados y responsivos

### Integración Backend (API REST + WebSockets)

El frontend se conecta a una API REST construida con **Node.js + Express + MongoDB** que provee:

- **Autenticación JWT** - Login, registro y verificación de email
- **WebSockets (Socket.io)** - Mensajería en tiempo real
- **Sistema de permisos** - Middlewares de autorización por rol
- **Gestión de recursos** - Workspaces, canales, mensajes y miembros
- **Envío de emails** - Invitaciones y verificaciones

> 🔗 **Repositorio Backend:** [slack-clone-backend](https://github.com/OyhamburoDev/slack-clone-backend)

### Deployment
- **Frontend:** Vercel - Deployment automático desde GitHub
- **Backend:** Render - Hosting con soporte para WebSockets persistentes
- **Base de datos:** MongoDB Atlas

> 💡 **Nota sobre la migración:** El backend se movió de Vercel a Render porque Vercel tiene limitaciones con WebSockets en el plan gratuito, mientras que Render soporta conexiones persistentes necesarias para la mensajería en tiempo real.

---

## 🏗️ Arquitectura del Proyecto

El proyecto sigue una **arquitectura modular** con separación de responsabilidades:

### 📁 Estructura de Carpetas
```
slack-clone-frontend/
├── screenshots/            # Screenshots para documentación
├── src/
│   ├── assets/            # Imágenes, iconos y recursos estáticos
│   ├── components/        # Componentes reutilizables de UI
│   │   ├── Auth/         # Componentes de autenticación
│   │   ├── Workspace/    # Componentes de workspace
│   │   ├── Channel/      # Componentes de canales
│   │   ├── Chat/         # Componentes de mensajería
│   │   └── SearchBar/    # Buscador global
│   ├── hooks/            # Custom hooks reutilizables
│   │   ├── useForm.js           # Manejo de formularios
│   │   ├── useFetch.js          # Peticiones HTTP con manejo de estados
│   │   ├── useChannels.js       # Lógica de gestión de canales
│   │   ├── useChannelMessage.js # Lógica de mensajes con WebSockets
│   │   └── ...                  # Otros hooks personalizados
│   ├── pages/            # Páginas/Vistas principales
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HomePage.jsx
│   │   ├── WorkspacePage.jsx
│   │   └── ...
│   ├── services/         # Capa de servicios (API calls)
│   │   ├── authService.js
│   │   ├── workspaceService.js
│   │   ├── channelService.js
│   │   └── messageService.js
│   ├── utils/            # Funciones utilitarias
│   ├── guards/           # Protección de rutas
│   │   └── ProtectedRoute.jsx
│   ├── config/           # Configuración de la app
│   ├── App.jsx           # Componente raíz
│   └── main.jsx          # Punto de entrada
├── public/               # Archivos públicos
├── .env                  # Variables de entorno (no incluir en git)
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎣 Hooks Personalizados

### `useForm`

Hook para manejar formularios de forma declarativa:
```javascript
const { formState, handleChange, handleReset } = useForm({
  email: "",
  password: "",
});
```

**Funcionalidades:**
- Control de estado de inputs
- Validación en tiempo real
- Reset de formularios

---

### `useFetch`

Hook para manejar peticiones HTTP con estados automáticos:
```javascript
const { data, loading, error, fetchData } = useFetch();

// Uso
fetchData(authService.login, { email, password });
```

**Funcionalidades:**
- Loading states automáticos
- Manejo de errores centralizado
- Response handling
- Token management

---

### `useChannels`

Hook para gestionar la lógica de canales en un workspace:
```javascript
const { channels, loading, error, fetchChannels, createChannel } =
  useChannels(workspaceId);
```

**Funcionalidades:**
- Obtener lista de canales del workspace
- Crear nuevos canales
- Estados de carga y error automáticos
- Actualización de lista tras creación

---

### `useChannelMessage`

Hook para manejar mensajes dentro de un canal con **WebSockets**:
```javascript
const { messages, loading, error, createChannelMessage } =
  useChannelMessage(channelId);
```

**Funcionalidades:**
- Cargar mensajes de un canal
- Enviar mensajes en tiempo real vía WebSockets
- Actualización automática al recibir nuevos mensajes
- Gestión de conexión y desconexión de Socket.io

---

## 🛡️ Sistema de Protección de Rutas

### `ProtectedRoute`

Componente de orden superior que protege rutas que requieren autenticación:
```jsx
<Route
  path="/workspace/:id"
  element={
    <ProtectedRoute>
      <WorkspacePage />
    </ProtectedRoute>
  }
/>
```

**Funcionamiento:**
- Verifica la existencia de token JWT en localStorage
- Redirige a `/login` si no hay token válido
- Permite acceso solo a usuarios autenticados

> ⚠️ **Nota de Seguridad**: Esta protección es a nivel UI para mejorar la experiencia de usuario. La seguridad real está implementada en el backend con middlewares de autenticación y autorización.

---

## 📦 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/OyhamburoDev/slack-clone-frontend.git
cd slack-clone-frontend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno

Crear un archivo `.env` en la raíz del proyecto:
```env
# Desarrollo (backend local)
VITE_APP_URL_API=http://localhost:8080/api

# Producción (backend en Render)
VITE_APP_URL_API=https://slack-clone-backend-bk4o.onrender.com/api
```

> **Nota:** Asegurate de usar `/api` al final de la URL del backend.

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📜 Scripts Disponibles
```json
{
  "dev": "vite",              // Inicia servidor de desarrollo
  "build": "vite build",      // Genera build de producción
  "preview": "vite preview"   // Preview del build de producción
}
```

---

## 🔄 Flujo de Usuario

### 1️⃣ Registro y Autenticación
```
Registro → Email de verificación → Verificación → Login → Token JWT
```

### 2️⃣ Gestión de Workspaces
```
Home → Crear Workspace → Ver lista de workspaces → Seleccionar workspace
```

### 3️⃣ Comunicación
```
Workspace → Ver canales → Seleccionar canal → Enviar mensajes en tiempo real
```

### 4️⃣ Invitaciones
```
Workspace → Invitar miembro → Email enviado → Confirmación por link
```

### 5️⃣ Administración (Solo Admins)
```
Workspace → Eliminar canales → Eliminar workspace → Invitar miembros
```

---

## 🌐 Deployment

### Frontend (Vercel)

El frontend está desplegado en **Vercel** con integración continua desde GitHub.

**URL de Producción:** [https://slackapp-utn.vercel.app](https://slackapp-utn.vercel.app)

#### Configuración en Vercel

1. **Build Command:** `npm run build`
2. **Output Directory:** `dist`
3. **Install Command:** `npm install`
4. **Framework Preset:** Vite

#### Variables de Entorno en Vercel

Configurar en el dashboard de Vercel:
```env
VITE_APP_URL_API=https://slack-clone-backend-bk4o.onrender.com/api
```

---

### Backend (Render)

El backend está desplegado en **Render** con soporte para WebSockets.

**URL de API:** [https://slack-clone-backend-bk4o.onrender.com](https://slack-clone-backend-bk4o.onrender.com)

> 💡 **¿Por qué Render y no Vercel para el backend?**  
> Vercel tiene limitaciones con las conexiones WebSocket en su plan gratuito (solo permite conexiones de 15 segundos). Render, en cambio, soporta conexiones persistentes necesarias para la mensajería en tiempo real con Socket.io.

Ver más detalles de deployment del backend en su [README](https://github.com/OyhamburoDev/slack-clone-backend).

---

## 🎨 Decisiones de Diseño

### UI/UX

- **Fidelidad visual**: La interfaz replica la experiencia de Slack con:
  - Sidebar con lista de workspaces y canales
  - Área de chat principal con mensajes agrupados
  - Header con información del canal y búsqueda global
  - Editor de texto enriquecido con toolbar
  - Menús contextuales para workspace y usuario

- **Diseño responsivo**: Adaptado para diferentes dispositivos:
  - **Desktop**: Experiencia completa con sidebar fijo
  - **Tablet**: Layout adaptativo con menús colapsables
  - **Mobile**: UI optimizada para pantallas pequeñas

- **Navegación**: Sistema de rutas que replica la estructura de Slack:
```
  /login
  /register
  /home
  /workspace/:workspace_id
  /workspace/:workspace_id/:channel_id
```

### Arquitectura

- **Separación de responsabilidades**: Services para lógica de API, hooks para lógica reutilizable, components para UI
- **Custom Hooks**: Encapsulan lógica compleja (WebSockets, formularios, fetching)
- **Real-time**: Socket.io para actualizaciones instantáneas sin polling

---

## 🔐 Seguridad

### Frontend

- ProtectedRoute para control de acceso a nivel UI
- Token JWT almacenado en localStorage
- Headers de autorización en todas las peticiones autenticadas

### Backend

La **seguridad real** está implementada en el backend con:

- **Middlewares de autenticación:** Verificación de tokens JWT
- **Middlewares de autorización:** Control de permisos en workspace, channel y member
- **Validación de permisos:** Cada endpoint valida los permisos del usuario
- **Hash de contraseñas:** Implementado con bcrypt

---

## 🚀 Próximas Mejoras

- [ ] **Notificaciones push** - Sistema de notificaciones en tiempo real
- [ ] **Archivos adjuntos** - Subida y compartir documentos e imágenes
- [ ] **Hilos de conversación** - Respuestas anidadas a mensajes
- [ ] **Reacciones a mensajes** - Emojis como reacciones rápidas
- [ ] **Llamadas de voz/video** - Integración con WebRTC
- [ ] **Dark mode** - Tema oscuro/claro
- [ ] **Tests E2E** - Cobertura con Playwright o Cypress

---

## 🤝 Contribuciones

Este es un proyecto personal en evolución. Sugerencias y feedback son bienvenidos.

---

## 👨‍💻 Autor

**Ramiro Oyhamburo**

- GitHub: [@OyhamburoDev](https://github.com/OyhamburoDev)
- LinkedIn: [Ramiro Oyhamburo](https://www.linkedin.com/in/ramiro-oyhamburo-30b802342/)

---

## 📄 Licencia

ISC

---

⭐ **Si te gustó el proyecto, dale una estrella en GitHub!**
