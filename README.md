# Pizarra Compartida con React.js, MongoDB y Socket.IO

Este proyecto es una aplicación de pizarra compartida en tiempo real desarrollada utilizando React.js, MongoDB y Socket.IO. Permite a múltiples usuarios escribir en un chat de forma simultánea.

## Características

- Interfaz de usuario interactiva construida con React.js + Bootstrap, que proporciona una experiencia de usuario intuitiva y amigable.
- Almacenamiento de datos en MongoDB, una base de datos NoSQL, para guardar y recuperar los mensajes colocados en la pizarra
- Comunicación bidireccional en tiempo real utilizando Socket.IO, lo que permite la sincronización instantánea de los cambios realizados por los usuarios conectados.
- Manejo de mensajes en formato JSON

## Instalación

1. Clonar el repositorio
2. Navegar al directorio del servidor: `cd server`
3. Instalar las dependencias del servidor: `npm install`
4. Configurar la conexión a MongoDB en el archivo `config.js`.
5. Iniciar el servidor: `npm run dev`
6. Navegar al directorio del cliente `cd cliente`
7. Instalar las dependencias del cliente: `npm install`
8. Iniciar el cliente: `npm run start`
9. Abrir la aplicación en tu navegador: `http://localhost:3000`

## Tecnologías utilizadas

- React.js: biblioteca de JavaScript para construir interfaces de usuario interactivas.
- MongoDB: base de datos NoSQL para el almacenamiento de datos.
- Socket.IO: biblioteca de JavaScript para la comunicación en tiempo real entre el servidor y el cliente.
