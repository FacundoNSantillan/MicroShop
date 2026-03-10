# Microservicio E-Commerce API

Backend de ejemplo basado en **arquitectura de microservicios** usando **NestJS**, **Docker**, **PostgreSQL** y **Prisma ORM**.

El sistema está compuesto por tres microservicios principales y un **API Gateway** que centraliza todas las peticiones.

---

## Arquitectura

```
        Client
           │
           ▼
      Gateway (3000)
           │
 ┌─────────┼─────────┐
 ▼         ▼         ▼
Users    Products   Orders
(3001)    (3002)    (3003)

Cada servicio tiene:

* Base de datos propia
* Prisma ORM
* Swagger documentation
* Docker container
```
---

# Tecnologías utilizadas

* **NestJS**
* **PostgreSQL**
* **Prisma ORM**
* **Docker / Docker Compose**
* **Swagger**
* **JWT Authentication**
* **Axios (service to service communication)**

---

# Estructura del proyecto

```
microshop
│
├── gateway
│
├── users
│   ├── auth
│   ├── users
│   └── prisma
│
├── products
│   └── prisma
│
├── orders
│   └── prisma
│
└── docker-compose.yml
```

Cada microservicio es un **proyecto NestJS independiente**.

---

# Variables de entorno

Cada servicio utiliza su propio archivo `.env`.

Por seguridad **no se incluyen en el repositorio**.

Debes crear manualmente los siguientes archivos.

---

# Users Service

Archivo:

```
users/.env
```

Contenido:

```
DATABASE_URL="AQUI_TU_DATABASE_URL"

PORT=3001

```

---

# Products Service

Archivo:

```
products/.env
```

Contenido:

```
DATABASE_URL="AQUI_TU_DATABASE_URL"

PORT=3002
```

---

# Orders Service

Archivo:

```
orders/.env
```

Contenido:

```
DATABASE_URL="AQUI_TU_DATABASE_URL"

PORT=3003
```

---

# Gateway

Archivo:

```
gateway/.env
```

Contenido:

```
PORT=3000
```

---

# Instalación

Clonar el repositorio:

```
git clone https://github.com/FacundoNSantillan/MicroShop.git
cd MicroShop
```

Instalar dependencias en cada servicio:

```
cd users
npm install

cd ../products
npm install

cd ../orders
npm install

cd ../gateway
npm install
```

---

# Levantar el proyecto con Docker

Desde la raíz del proyecto:

```
docker compose up --build
```

Esto levantará:

* users
* users-db
* products
* products-db
* orders
* orders-db
* gateway

---

# Migraciones Prisma

Después de levantar los contenedores, ejecutar migraciones.

Users:

```
docker compose exec users sh
npx prisma migrate dev --name init
```

Products:

```
docker compose exec products sh
npx prisma migrate dev --name init
```

Orders:

```
docker compose exec orders sh
npx prisma migrate dev --name init
```

Esto crea las tablas en PostgreSQL.

---

# Puertos de los servicios

Gateway

```
http://localhost:3000
```

Users

```
http://localhost:3001
```

Products

```
http://localhost:3002
```

Orders

```
http://localhost:3003
```

---

# Ejemplos de Requests

Crear usuario

```
POST http://localhost:3000/api/users
```

Body:

```
{
  "email": "test@test.com",
  "password": "12345678",
  "name": "Test User"
}
```

---

Obtener productos

```
GET http://localhost:3000/api/products
```

---

Crear orden

```
POST http://localhost:3000/api/orders
```

Body:

```
{
  "userId": 1,
  "items": [
    {
      "productId": 1,
      "quantity": 2
    }
  ]
}
```

---

# Comunicación entre servicios

Los microservicios se comunican internamente usando los nombres de los contenedores Docker.

Ejemplo en **Orders Service**:

```
http://users:3001/api/users/{id}
```

```
http://products:3002/api/products/{id}
```

Docker resuelve automáticamente estos hosts dentro de la red interna.

---

# Funcionalidades implementadas

Users

* Registro de usuario
* Autenticación JWT
* Roles (ADMIN / USER)
* Protección de rutas

Products

* Crear producto
* Obtener productos
* Obtener producto por id

Orders

* Crear orden
* Validación de usuario
* Validación de producto
* Cálculo automático del total
* Obtener órdenes
* Cambiar estado de orden

Gateway

* API Gateway
* Proxy a microservicios
* Forward de headers
* Centralización de endpoints

---

# Swagger

Cada servicio expone su documentación Swagger.

Ejemplo:

Users

```
http://localhost:3001/users/docs
```

Products

```
http://localhost:3002/products/docs
```

Orders

```
http://localhost:3003/orders/docs
```

Facundo Santillan
Bac
