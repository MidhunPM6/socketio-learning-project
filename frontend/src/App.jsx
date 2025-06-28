
import './App.css'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import ChatWindow from './components/ChatWindow'
import SignUpPage from './components/SignUpPage'
import LoginPage from './components/LoginPage'


 
function App () {
  


  return (
    <>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<ChatWindow></ChatWindow>}></Route>
            <Route path='/signup' element={<SignUpPage></SignUpPage>}></Route>
            <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          </Routes>

        </Router>
      </div>
    </>
  )
}

export default App
