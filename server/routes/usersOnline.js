import express from 'express'
import controller from '../controllers/usersOnline.js'

var router = express.Router()

// Definir las rutas de la aplicación
router.get('/usersOnline', controller.getUsersOnline)

export default router