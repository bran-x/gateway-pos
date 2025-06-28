## 🧱 Arquitectura y Patrones de Diseño

### 🔹 Patrón de Arquitectura: Layered Architecture (Arquitectura en capas)

Se implementó una arquitectura en capas para mejorar la organización, testabilidad y mantenibilidad del código:

- **Rutas (`routes/`)**: definición de endpoints y validación de entrada.
- **Servicios (`services/`)**: lógica de negocio desacoplada de Express.
- **Repositorios (`repositories/`)**: acceso a la base de datos no relacional (Redis), encapsulado bajo una interfaz.
- **Middlewares (`middlewares/`)**: validación de headers y autorización.
- **Tipos (`types/`)**: definición de tipos compartidos entre capas (por ejemplo, `CardData`).
- **Utilidades (`utils/`)**: validaciones y funciones auxiliares.
- **Configuración (`config/`)**: setup de Redis, Postgres, etc.

---

### 🎯 Patrón de Diseño aplicado: Repository Pattern

Se aplicó el patrón **Repository** para abstraer el acceso a Redis en `repositories/token.repository.ts`, desacoplando la lógica de almacenamiento de tokens de la lógica de negocio. Esto permite:

- Mayor facilidad de testing.
- Cambio de motor (Redis → DynamoDB, etc.) sin afectar los servicios.
- Responsabilidad única y cohesión clara por módulo.

---

## 🔗 Repositorio del proyecto

📂 Repositorio: [https://github.com/bran-x/gateway-pos](https://github.com/bran-x/gateway-pos)  

---

## 📦 Build & Run

```bash
# Compilar el proyecto
npm run build

# Correr en modo producción (node)
npm start

# Correr en desarrollo
npm run dev

# Ejecutar tests
npm test

# Docker build + run (local)
docker-compose up --build