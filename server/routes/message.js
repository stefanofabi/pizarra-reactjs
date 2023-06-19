import express from 'express'
import controller from '../controllers/message.js'

var router = express.Router()

const checkMessageFields = (req, res, next) => {
    // Comprueba si las propiedades 'from' y 'message' están presentes y no están vacías
    if (!req.body.from || !req.body.message) {
      return res.status(400).json({ error: 'Las propiedades "from" y "message" son requeridas' });
    }
    
    // Aceptar la solicitud
    next();
  };

// Definir las rutas de la aplicación
router.post('/save', checkMessageFields, controller.save)
router.get('/messages', controller.getMessages)

export default router