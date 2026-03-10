# Microservices E-Commerce API

Backend de ejemplo basado en **arquitectura de microservicios** usando **NestJS**, **Docker**, **PostgreSQL** y **Prisma ORM**.

El sistema está compuesto por tres microservicios principales y un **API Gateway** que centraliza todas las peticiones.

---

# Arquitectura

```
Client
  │
  ▼
API Gateway (3000)
  │
  ├── Users Service (3001)
  ├── Products Service (3002)
  └── Orders Service (3003)
```

Cada servicio tiene:

* su propio **NestJS app**
* su propia **base de datos PostgreSQL**
* **Prisma ORM**
* comunicación entre servicios vía **HTTP**

---

# Microservicios

## Users Service

Puerto: **3001**

Responsabilidades:

* Registro de usuarios
* Autenticación con JWT
* Roles (USER / ADMIN)
* Gestión de usuarios

Endpoints principales:

```
POST /api/users
GET /api/users
GET /api/users/:id
PATCH /api/users/:id
DELETE /api/users/:id
```

---

## Products Service

Puerto: **3002**

Responsabilidades:

* Crear productos
* Listar productos
* Obtener producto por id
* Actualizar productos
* Eliminar productos

Endpoints principales:

```
POST /api/products
GET /api/products
GET /api/products/:id
PATCH /api/products/:id
DELETE /api/products/:id
```

---

## Orders Service

Puerto: **3003**

Responsabilidades:

* Crear órdenes
* Calcular total de la orden
* Verificar existencia de usuario
* Verificar existencia de productos
* Actualizar estado de orden

Estados de orden:

```
PENDING
PAID
CANCELLED
```

Endpoints principales:

```
POST /api/orders
GET /api/orders
GET /api/orders/:id
PATCH /api/orders/:id
```

---

# API Gateway

Puerto: **3000**

El gateway actúa como **punto único de entrada**.

Se encarga de:

* recibir requests del cliente
* redirigirlas al microservicio correspondiente
* mantener una sola URL de acceso

Ejemplo de rutas:

```
/api/users/*
/api/products/*
/api/orders/*
```

Internamente el gateway redirige a:

```
users:3001
products:3002
orders:3003
```

---

# Tecnologías utilizadas

* NestJS
* Docker
* Docker Compose
* PostgreSQL
* Prisma ORM
* Axios
* JWT Authentication
* Swagger

---

# Instalación

## 1 Clonar repositorio

```
git clone https://github.com/FacundoNSantillan/MicroShop.git

cd MicroShop
```

---

# Levantar el proyecto

Construir contenedores:

```
docker compose up --build
```

Esto levanta:

```
gateway
users
products
orders
postgres databases
```

---

# Prisma

Cada microservicio utiliza **Prisma ORM**.

Luego de levantar los contenedores debes ejecutar las migraciones.

Entrar al contenedor:

```
docker compose exec users sh
```

Luego ejecutar:

```
npx prisma migrate dev --name init
```

Hacer lo mismo para:

```
products
orders
```

Ejemplo:

```
docker compose exec products sh
npx prisma migrate dev --name init
```

```
docker compose exec orders sh
npx prisma migrate dev --name init
```

---

# Probar la API

El sistema se accede mediante el **API Gateway**.

URL base:

```
http://localhost:3000
```

---

# Crear usuario

```
fetch('http://localhost:3000/api/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Juan',
    email: 'juan@test.com',
    password: '12345678'
  })
})
.then(r => r.json())
.then(console.log)
```

---

# Crear producto

```
fetch('http://localhost:3000/api/products', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Laptop',
    price: 1000
  })
})
.then(r => r.json())
.then(console.log)
```

---

# Crear orden

```
fetch('http://localhost:3000/api/orders', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: 1,
    items: [
      {
        productId: 1,
        quantity: 2
      }
    ]
  })
})
.then(r => r.json())
.then(console.log)
```

---

# Obtener productos

```
fetch('http://localhost:3000/api/products')
  .then(r => r.json())
  .then(console.log)
```

---

# Obtener órdenes

```
fetch('http://localhost:3000/api/orders')
  .then(r => r.json())
  .then(console.log)
```

---

# Actualizar estado de orden

```
fetch('http://localhost:3000/api/orders/1', {
  method: 'PATCH',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    status: "PAID"
  })
})
.then(r => r.json())
.then(console.log)
```

---

# Swagger

Cada microservicio tiene documentación Swagger:

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

---

# Características implementadas

* arquitectura de microservicios
* comunicación entre servicios
* API Gateway
* autenticación JWT
* roles de usuario
* validación con class-validator
* ORM con Prisma
* contenedores Docker
* bases de datos separadas por servicio


Facundo Santillán
Backend Developer
