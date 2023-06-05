import express from 'express'
import controller from '../controllers/message.js'

var router = express.Router()

// Definir las rutas de la aplicación
router.post('/save', controller.save)
router.get('/messages', controller.getMessages)

export default router