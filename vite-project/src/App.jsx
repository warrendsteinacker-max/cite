import { useState } from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function App() {
  
  const [pass, setP] = useState('')
  const nav = useNavigate()
   
  const loginf = async(e) => {
    e.preventDefault()

    try{
        e.preventDefault()
        const d = await axios.post('http://localhost:8000/login', {password: pass})
        const res = d.data
        const R = res.role 
        localStorage.setItem('role', R)
        nav('/H')
      }
      catch(error){
        console.error(error.message)
      }

  }

  return (
    <>
    <form onSubmit={loginf}>
      <input type='password' onChange={(e)=> setP(e.target.value)}></input>
      <button type='submit'>post</button>
    </form>
    </>
  )
}

export default App
