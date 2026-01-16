import express from 'express'
import cors from 'cors'
import Users from './Users.js'

const app = express()

app.use(express.json())
// Backend
app.use(cors({
  origin: 'http://localhost:5173', // Change this to your Vite port
  credentials: true
}));

app.post('/login', (req, res) => {
    try{
        const {password} = req.body
        const User = Users.find((U)=> password == U.password)
        return res.status(200).json({role: User.R})
    }
    catch(error){
        console.error(error.message)
        return res.status(500).json({S: false})
    }
})

app.put('/edit', (req, res) => {
    try{
        const {Ro, pass, RRR} = req.body

        Users.forEach((U)=> {if(RRR == U.R){U.password = pass}})
        
        return res.status(200).json({sent: 'was sent'})
        }
        catch(error){
        console.error(error.message)
        return res.status(500).json({sent: 'was not sent try again'})
        }
})


app.listen(8000, () => {
    console.log('server running on 8000')
} )