
import NavigationBar from './components/NavigationBar'
import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css'

function App() {


  return (
    <>
      <NavigationBar />
      
      <div className="App">
        <Container>
          <Outlet />
        </Container>
       
        
      </div>
      
       
    </>
  )
}

export default App
