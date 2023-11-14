
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Hero from './components/Hero'
import Playpage from './components/Playpage'
import Navbar from './components/Navbar'
import Login from './components/Login'
import PricePage from './components/PricePage'


function App() {
 

  return (
    <>
      
      <BrowserRouter basename='/'>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Hero/>}/>
        <Route path='/:id' element={<Playpage/>} />
        <Route path='/Login' element={<Login/>} />
        <Route path='/price/:price' element={<PricePage/>} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
