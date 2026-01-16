import axios from 'axios'
import React, {useState} from 'react'
const Home = () => {

    const RRR = localStorage.getItem('role')
    const Message = localStorage.getItem('feedback')
    const [sent, setS] = useState('')
    const [nsent, setNs] = useState('')

    const Changep = async(e) => {
        e.preventDefualt
        try{
            const feedback = await axios.put('http://localhost:8000/edit')
            const res = feedback.data
            const fB = res.sent 
            localStorage.setItem('feedback', fB)

        }
        catch(error){
            console.error(error.message)
        }
    }

  return (
    <p>Welcom {RRR}</p>
  )
}

export default Home

/////