import Message from '../models/message.js'

var controller = {
     // Funcion para guardar los mensajes
     save: (req, res) => {
        var params = req.body
        var message = new Message()
        message.message = params.message
        message.from = params.from

        message.save((error, messageStored) => {
            if (error || !messageStored) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No ha sido posible guardar el mensaje'
                })
            }

            return res.status(200).send({
                status: 'Success',
                messageStored
            })
        })
     },

      // Funcion para obtener todos los mensajes
      getMessages: (req, res) => {
        var query = Message.find({})
        query.sort('-_id').exec((error, messages) => {
            if (error) {
                return res.status(500).send({
                    status: 'Error',
                    message: 'Error al extraer los datos'
                })
            }

            if (! messages) {
                return res.status(404).send({
                    status: 'Error',
                    message: 'No hay mensajes para mostrar'
                })
            }

            return res.status(200).send({
                status: 'Success',
                messages
            })
        })

      }
}

export default controller