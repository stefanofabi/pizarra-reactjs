import express from 'express'
import morgan from 'morgan'
import {Server as SocketServer} from 'socket.io'
import http from 'http'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import router from './routes/message.js'

var url = ''

// verificar la conexion con mongodb 
mongoose.Promise = global.Promise

const app = express()
const PORT = 4000

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
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/api', router)

// Escuchar la conexión de los clientes
io.on('connection', (socket) => {
    console.log('Llego el cliente '+ socket.id)

    socket.on('message', (message, nickname) => {
        // Envio al resto de clientes conectados
        socket.broadcast.emit('message', {
            body: message,
            from: nickname
        })
    })
})

// Conexion a la base de datos
mongoose.connect(url, { useNewUrlParser: true }).then(() => {
    console.log('Conexion a la base de datos establecida')

    // Escucha al puerto 
    server.listen(PORT, () => {
        console.log('Servidor ejecutandose en http://localhost:', PORT)
    })
}) 
