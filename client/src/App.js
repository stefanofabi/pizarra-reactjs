import './App.css';
import io from 'socket.io-client';
import axios from 'axios';
import { useState, useEffect } from 'react'

// Conexion para escuchar y enviar los eventos
const socket = io('http://localhost:4000')
const url = 'http://localhost:4000/api/'

function App() {
 {/* Variables de estado */}
  const [nickname, setNickname] = useState('')
  const [message, setMessage] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [messages, setMessages] = useState([])
  
  const [storedMessages, setStoredMessages] = useState([])
  const [firstTime, setFirstTime] = useState(false)

  const [usersOnline, setUsersOnline] = useState(0)

  useEffect(() => {
    const receivedMessage = (message) => {
      setMessages([message, ...messages])
    }

    socket.on('message', receivedMessage)

    // Desuscribimos el estado de este componente para cuando ya no es necesario
    return () => {
      socket.off('message', receivedMessage)
    }

    // actualizamos la vista cuando llega un nuevo mensaje
  }, [messages])

  useEffect(() => {
    const usersOnlineMessage = (message) => {
      setUsersOnline(message.count)
    }

    socket.on('usersOnline', usersOnlineMessage)

    // Desuscribimos el estado de este componente para cuando ya no es necesario
    return () => {
      socket.off('usersOnline', usersOnlineMessage)
    }

    // actualizamos la vista cuando llega un nuevo mensaje
  }, [usersOnline])

  if (! firstTime) {
    axios.get(url + 'messages').then(res => {
      setStoredMessages(res.data.messages)
      console.log(res.data.messages)
    })

    // Solo se ejecuta la primera vez que renderizamos la aplicacion
    setFirstTime(true)
  }

  const handlerSubmit = (e) => {
    e.preventDefault()

    if (nickname !== '') {
      socket.emit('message', message, nickname)

      const newMessage = {
        body: message,
        from: 'Yo'
      }

      // Agregar el mensaje que envio el usuario a su lista de mensajes
      setMessages([newMessage, ... messages])
      setMessage('')

      // Peticion HTTP por POST para guardar el mensaje
      axios.post(url + 'save', {
        message: message,
        from: nickname
      }) 
    } else {
      alert('Para enviar un mensaje tenes que establecer un nickname')
    }
  }

  const nicknameSubmit = (e) => {
    e.preventDefault()
    setNickname(nickname)
    setDisabled(true)
  }

  return (
    <div className="App">
      <div className="container mt-3">
        <div className="m-3 text-light"> Usuarios Online: {usersOnline} </div>

        <div className="card">
          <div className="card-body">
            <h5 className="text-center"> Chat </h5>
          
            {/* Nickname */}
            <form onSubmit={nicknameSubmit}>
              <div className="d-flex">
                <input type="text" className="form-control" placeholder="Nickname..." id="nickname" disabled={disabled} onChange={e => setNickname(e.target.value) }/>

                <button className="btn btn-success mx-3" type="submit" id="btn-nickname" disabled={disabled}> Establecer </button>
              </div>
            </form>

            {/* Chat form */}
            <form onSubmit={handlerSubmit}>
              <div className="d-flex mt-3">
                <input type="text" className="form-control" placeholder="Mensaje..." id="message" onChange={e => setMessage(e.target.value) } value={message} />

                <button className="btn btn-success mx-3" type="submit" id="btn-message"> Enviar </button>
              </div>
            </form>
          </div>
        </div>

        {/* Chat messages */}
        <div className="card mt-3 mb-3" id="content-chat">
          <div className="card-body"> 
            {messages.map((message, index) => (
              <div key={index} className={`d-flex p-3 ${message.from === "Yo" ? "justify-content-end" : "justify-content-start"}`}> 
                <div className={`card mb-3 border-1 ${message.from === "Yo" ? "bg-success bg-opacity-25" : "bg-light"}`}> 
                  <div className="card-body"> 
                    <small> {message.from}: {message.body} </small>
                  </div>
                </div>
              </div>
            ))}

            {/* Chat stored messages */}
            <small className="tex-center text-muted"> ... Mensajes guardados ... </small>
            {storedMessages.map((message, index) => (
              <div key={index} className={`d-flex p-3 ${message.from === nickname ? "justify-content-end" : "justify-content-start"}`}> 
                <div className={`card mb-3 border-1 ${message.from === nickname ? "bg-success bg-opacity-25" : "bg-light"}`}> 
                  <div className="card-body"> 
                    <small> {message.from}: {message.message} </small>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>





      </div>
    </div>
  );
}

export default App;