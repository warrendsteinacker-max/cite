import Loginp from './c:/Users/User/llm/vite-project/src/Loginp'
import {Routes, Route} from 'react-router-dom'

function App() {
  
  return (
    <>
    <Routes>
      <Route path='/' element={<Loginp/>}/>
      <Route path='/H' element={<Home/>}/>
    </Routes>
    </>
  )
}

export default App
