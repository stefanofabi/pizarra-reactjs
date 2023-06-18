import { usersOnline } from '../index.js'

var controller = {
    // Funcion para mostrar los usuarios en linea
    getUsersOnline: (req, res) => {
        return res.status(200).send({
            count: usersOnline
        })
 },

}

export default controller