import axios from 'axios'
import React, {useState} from 'react'
const Home = () => {

    const RRR = localStorage.getItem('role')
    const [sent, setS] = useState('')
    const [M, setM] = useState('')
    const [pass, setPass] = useState('')

    const Changep = async(e) => {
        e.preventDefault
        try{
            const feedback = await axios.put('http://localhost:8000/edit')
            const res = feedback.data
            const fB = res.sent 
            localStorage.setItem('feedback', fB)
            setS(true)
            const Message = localStorage.getItem('feedback')
            setM(Message)
        }
        catch(error){
            console.error(error.message)
            setS(false)
        }
    }

  return (
    <>
    {sent ? (<p>{M}</p>):(<p>{M}</p>)}
    <p>Welcom {RRR}</p>
    <form onSubmit={Changep}>
        <input type='password' value={pass} onChange={(e)=>setPass(e.target.value)}></input>
    </form>
    </>
  )
}

export default Home

/////