import axios from 'axios'
import React, {useState} from 'react'
const Home = () => {

    const RRR = localStorage.getItem('role')
    // const [sent, setS] = useState(false)
    // const [M, setM] = useState('')
    // const [pass, setPass] = useState('')
    const [count, setC] = useState(0)
    const [data, setData] = useState([])
    // const [E, setE] = useState(false)

   const deletef = async(id)=> {
    try{
        const Ddata = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        const res = Ddata.data
        const fdata = data.filter((d)=> d.id !== id)
        setData(fdata)
    }
    catch(error){
        console.error(error.message)
    } 
    
}

    const fetchd = async() => {
       try{
        const index = count + 1
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts/${index}`)
        const dataa = res.data
        console.log(dataa)
        setC(index)
        setData([...data, dataa]
        )
       }
       catch(error){
        console.error(error.message)
       }
    }

    // const Changep = async(e) => {
    //     e.preventDefault()
    //     try{
    //         const feedback = await axios.put('http://localhost:8000/edit', {pass: pass, RRR: RRR})
    //         const res = feedback.data
    //         const fB = res.sent 
    //         localStorage.setItem('feedback', fB)
    //         setS(true)
    //         setM(fB)
    //     }
    //     catch(error){
    //         console.error(error.message)
    //         setS(false)
    //     }
    // }

  return (
    <>
    {/* {sent ? (<p>{M}</p>):(<p>{M}</p>)} */}
    <p>Welcom {RRR}</p>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}><button onClick={fetchd}>fetch d</button><div id="D">{data.map((item)=>{return <><div key={item.id}><p>{item.id}</p><button onClick={() => deletef(item.id)}></button></div></>})}</div></div>
    <button onClick={fetchd}> fetch d </button>
    </>
  )

}
////////////////
export default Home
////
/////<div style={{display: flex, justifyContent: center, alignItems: center}}><button onClick={fetchd}>fetch d</button><div>{data.map((item)=>{<p>{item.id}</p>})}</div></div>
    // <form onSubmit={Changep}>
    //     <input type='password' value={pass} onChange={(e)=>setPass(e.target.value)}></input>
    //     <button type='submit'>change p</button>
    //     <button onClick={fetchd}> fetch d </button>
    // </form>