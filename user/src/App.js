import './App.css';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom"
import { Routes } from "react-router"
import Alert from "./components/Alert"
import { useState } from "react"

function App() {
  const[alert,setAlert] = useState(null)
  const showAlert= (type,message)=>{
    setAlert({type:type,
      msg:message
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }
  return (
    <div >
      <Router>
        <Alert alert={alert}/>
          <Routes>
          {/* <Route exact path="/" element={<Home showAlert={showAlert}/>}> </Route> */}
          {/* <Route exact path="/about" element={<About />}> </Route> */}
          {/* <Route exact path="/login" element={<Login showAlert={showAlert}/>} > </Route> */}
          <Route exact path="/signup" element={<Signup  showAlert={showAlert}/>}> </Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
