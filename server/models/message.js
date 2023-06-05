import mongoose from 'mongoose'
var Schema = mongoose.Schema

// Crear el esquema de la base de datos
var messageSchema = new Schema({
    message: String,
    from: String
})

export default mongoose.model('Message', messageSchema)