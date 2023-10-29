
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Hero from './components/Hero'
import Playpage from './components/Playpage'
import Navbar from './components/Navbar'
import Login from './components/Login'


function App() {
 

  return (
    <>
      
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path="/:id" element={<Playpage/>} Component={Playpage}/>
        <Route path="/Login" element={<Login/>} Component={Login}/>
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
