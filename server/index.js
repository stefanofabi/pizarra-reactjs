import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './routes/message.js'
import {PORT, url} from './config.js'

const app = express()

// Creamos el servidor con el modulo http por defecto en NodeJS
const server = http.createServer(app)
const io = new SocketServer(server, {
    cors: {
        // permitimos peticiones de cualquier origen
        origin: '*'
    }
})

// Middlewares
app.use(cors())
// Vemos las peticiones por consola utilizando el paquete morgan en modo dev
app.use(morgan('dev'))
// Middleware para analizar cuerpos de a través de la URL
app.use(bodyParser.urlencoded({ extended: false }))
// Cualquier tipo de petición lo convertimos a json
app.use(bodyParser.json())
app.use('/api', router)

var usersOnline = 0;
var connectedUsers = {}

// Escuchar la conexión de los clientes
io.on('connection', (socket) => {
    console.log('Llego el cliente '+ socket.id)
    usersOnline++;
    console.log('Usuarios en linea: ' + usersOnline)

    // Enviamos un mensaje a todos los clientes, incluso al emisor
    io.emit('usersOnline', {
        count: usersOnline,
        users: Object.values(connectedUsers)
    })

    socket.on('message', (message, nickname) => {
        // Envio al resto de clientes conectados
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })

    // Escuchamos el evento cuando un cliente elige un nombre
    socket.on('setNickname', (nickname) => {
        connectedUsers[socket.id] = nickname;
        console.log('Cliente ' + socket.id + ' estableció el nombre de usuario: ' + nickname);

        // Enviamos un mensaje a todos los clientes, incluso al emisor
        io.emit('usersOnline', {
            count: usersOnline,
            users: Object.values(connectedUsers)
        })
    });

    socket.on('disconnect', (message, nickname) => {
        console.log('Usuario desconectado '+ socket.id)
        usersOnline--;
        console.log('Usuarios en linea: ' + usersOnline)

        // Eliminamos el nombre de usuario del objeto connectedUsers
        if (connectedUsers.hasOwnProperty(socket.id)) {
            delete connectedUsers[socket.id];
        }

        // Enviamos un mensaje a todos los clientes, incluso al emisor
        io.emit('usersOnline', {
            count: usersOnline,
            users: Object.values(connectedUsers)
        })
    })    
})

// Conexion a la base de datos
mongoose.connect(url).then(() => {
    console.log('Conexion a la base de datos establecida')

    // Escucha al puerto 
    server.listen(PORT, () => {
        console.log('Servidor ejecutandose en http://localhost:', PORT)
    })
})