import axios from 'axios'
import React, {useState} from 'react'
const Home = () => {

    const RRR = localStorage.getItem('role')
    const [sent, setS] = useState(false)
    const [M, setM] = useState('')
    const [pass, setPass] = useState('')
    const [data, setData] = useState([])

    const Changep = async(e) => {
        e.preventDefault()
        try{
            const feedback = await axios.put('http://localhost:8000/edit', {pass: pass, RRR: RRR})
            const res = feedback.data
            const fB = res.sent 
            localStorage.setItem('feedback', fB)
            setS(true)
            setM(fB)
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
        <button type='submit'>change p</button>
    </form>
    <div style={{display: flex, justifyContent: center, alignItems: center}}><div>{data.map((item)=>{<p></p>})}</div>
    </>
  )
}

export default Home

/////