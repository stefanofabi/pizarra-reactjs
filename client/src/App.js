import './App.css';

function App() {
  return (
    <div className="App">
      <div className="container mt-3">
        <div className="card">
          <div className="card-body">
            <h5 className="text-center"> Chat </h5>
          
            {/* Nickname */}
            <form>
              <div className="d-flex">
                <input type="text" className="form-control" placeholder="Nickname..." id="nickname"/>

                <button className="btn btn-success mx-3" type="submit" id="btn-nickname"> Establecer </button>
              </div>
            </form>

            {/* Chat form */}
            <form>
              <div className="d-flex mt-3">
                <input type="text" className="form-control" placeholder="Mensaje..." id="message"/>

                <button className="btn btn-success mx-3" type="submit" id="btn-message"> Enviar </button>
              </div>
            </form>
          </div>
        </div>

        {/* Chat messages */}
        <div className="card mt-3 mb-3" id="content-chat">
          <div className="card-body"> 

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
