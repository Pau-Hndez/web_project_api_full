# Tripleten web_project_api_full

LINK AL WEBSITE: https://aroundtheus.chickenkiller.com/

## Descripción del proyecto

Around the U.S. es una aplicación web interactiva en la que los usuarios pueden compartir y explorar fotografías de diferentes lugares.

El proyecto cuenta con un frontend desarrollado con React y un backend desarrollado con Node.js, Express y MongoDB. Los usuarios pueden registrarse, iniciar sesión y gestionar su perfil, así como crear, eliminar y dar "Me gusta" a tarjetas con fotografías.

La aplicación implementa autenticación y autorización mediante JSON Web Tokens (JWT), de manera que las funciones que modifican información requieren que el usuario esté autenticado.

### Funcionalidades principales

- Registro de nuevos usuarios mediante correo electrónico y contraseña.
- Inicio y cierre de sesión.
- Autenticación mediante JWT.
- Persistencia de la sesión mediante `localStorage`.
- Visualización de las tarjetas de lugares.
- Creación de nuevas tarjetas con nombre e imagen.
- Eliminación de tarjetas propias.
- Sistema de "Me gusta" en las tarjetas.
- Edición del nombre y descripción del perfil.
- Actualización del avatar del usuario.
- Visualización de la información del usuario autenticado.
- Protección de las rutas que requieren autorización.
- Validación de los datos enviados al servidor.
- Manejo centralizado de errores.
- Registro de solicitudes y errores del servidor.
- Validación de direcciones de correo electrónico y URLs.
- Persistencia de los datos mediante MongoDB.
- Diseño adaptable a diferentes tamaños de pantalla.

---

## Tecnologías utilizadas

### Frontend

El frontend fue desarrollado utilizando:

- **React** — biblioteca principal para construir la interfaz de usuario.
- **React Router** — utilizado para manejar la navegación y las rutas de la aplicación.
- **JavaScript (ES6+)** — lenguaje utilizado para la lógica de la aplicación.
- **HTML5** — estructura de los componentes.
- **CSS3** — estilos y diseño responsivo.
- **Fetch API** — utilizada para realizar solicitudes HTTP al servidor.
- **Context API** — utilizada para compartir información y funciones entre diferentes componentes.
- **LocalStorage** — utilizado para almacenar el token JWT y mantener la sesión del usuario.

### Backend

El servidor fue desarrollado utilizando:

- **Node.js** — entorno de ejecución de JavaScript.
- **Express.js** — framework utilizado para crear la API REST.
- **MongoDB** — base de datos utilizada para almacenar usuarios y tarjetas.
- **Mongoose** — ODM utilizado para trabajar con MongoDB y definir los esquemas de datos.
- **bcryptjs** — utilizado para generar hashes de las contraseñas antes de almacenarlas.
- **jsonwebtoken (JWT)** — utilizado para la autenticación y autorización de usuarios.
- **Celebrate** — utilizado para validar los datos recibidos en las solicitudes.
- **Joi** — utilizado para definir los esquemas de validación.
- **validator** — utilizado para validar correos electrónicos y URLs.
- **Winston** — utilizado para registrar solicitudes y errores del servidor.

---

## Técnicas implementadas

### Autenticación

Los usuarios pueden registrarse utilizando un correo electrónico y una contraseña.

Las contraseñas no se almacenan directamente en la base de datos. Antes de guardarlas se genera un hash utilizando `bcryptjs`.

Al iniciar sesión correctamente, el servidor genera un JSON Web Token (JWT) que contiene el identificador del usuario.

El token se almacena en `localStorage` en el frontend y se envía al servidor mediante el encabezado:

`Authorization: Bearer <token>`

### Autorización

Las rutas protegidas requieren un token JWT válido.

El middleware de autorización verifica el token y obtiene el identificador del usuario para almacenarlo en:

`req.user`

Esto permite comprobar que el usuario tenga permiso para realizar determinadas acciones.

Por ejemplo:

- Un usuario solo puede eliminar sus propias tarjetas.
- Un usuario solo puede modificar su propio perfil.
- Las rutas protegidas no pueden utilizarse sin autenticación.

### Validación de datos

Las solicitudes recibidas por el servidor son validadas antes de llegar a los controladores.

Se utilizan `Celebrate`, `Joi` y `validator` para comprobar datos como:

- Correos electrónicos.
- Contraseñas.
- Nombres.
- Descripciones.
- URLs de imágenes.
- Identificadores de usuarios y tarjetas.

### Manejo de errores

El backend utiliza un middleware centralizado para manejar los errores.

Los errores se responden utilizando códigos HTTP apropiados, por ejemplo:

- `400` — solicitud incorrecta.
- `401` — usuario no autenticado.
- `403` — usuario autenticado pero sin autorización para realizar la acción.
- `404` — recurso no encontrado.
- `500` — error inesperado del servidor.

### Persistencia de sesión

El token JWT se almacena en `localStorage`.

Cuando el usuario actualiza la página, la aplicación comprueba si existe un token válido y, si es así, recupera nuevamente la información del usuario y las tarjetas.

Esto permite que la sesión permanezca activa después de actualizar la página, hasta que el usuario cierre sesión o el token deje de ser válido.

### Context API

Se utiliza `CurrentUserContext` para compartir información relacionada con el usuario, las tarjetas y diferentes funciones de la aplicación entre los componentes.

Esto evita tener que pasar manualmente las mismas propiedades a través de múltiples niveles de componentes.

### Diseño responsive

La interfaz utiliza CSS y técnicas de diseño responsive para adaptar la aplicación a diferentes tamaños de pantalla, incluyendo dispositivos móviles, tablets y computadoras.

---

## Estructura general del proyecto

web_project_api_full/
│
├── frontend/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── contexts/
│ │ ├── utils/
│ │ ├── index.css
│ │ └── main.jsx
│ │
│ ├── public/
│ │ ├── favicon.svg
│ │ ├── icons.svg
│ ├── vendor/
│ │ ├── fonts/...
│ │ ├── fonts.css
│ │ ├── normalize.css
│ │
│ ├── index.html
│ ├── package-lock.json
│ ├── package.json
│ ├── vite.config.js
│  
├── backend/
│ ├── controllers/
│ │ ├── users.js
│ │ └── cards.js
│ │
│ ├── middlewares/
│ │ ├── auth.js
│ │ ├── validation.js
│ │ └── errorHandler.js
│ │ └── logger.js
│ │
│ ├── models/
│ │ ├── user.js
│ │ └── card.js
│ │
│ ├── routes/
│ │ ├── users.js
│ │ └── cards.js
│ │
│ ├── .editorconfig
│ ├── .eslintcr
│ ├── .gitignore
│ ├── app.js
│ ├── package-lock.json
│ ├── package.json
│
└── README.md
