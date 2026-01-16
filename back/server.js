import express from 'express'
import cors from 'cors'
import Users from './Users.js'

const app = express()

// 1. MUST be first
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

// 2. MUST be before routes to read req.body
app.use(express.json())

app.post('/login', (req, res) => {
    try {
        const { password } = req.body
        const foundUser = Users.find((U) => password == U.password)

        // Safety check to prevent crash
        if (!foundUser) {
            return res.status(401).json({ error: "Invalid password", S: false })
        }

        return res.status(200).json({ role: foundUser.R })
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).json({ S: false })
    }
})

app.put('/edit', (req, res) => {
    try {
        const { pass, RRR } = req.body
        
        // Find if user exists first
        const userExists = Users.some(U => U.R == RRR)
        
        if (!userExists) {
            return res.status(404).json({ sent: 'User not found' })
        }

        Users.forEach((U) => {
            if (RRR == U.R) {
                U.password = pass
            }
        })
        
        return res.status(200).json({ sent: 'was sent' })
    }
    catch (error) {
        console.error(error.message)
        return res.status(500).json({ sent: 'was not sent try again' })
    }
})

app.listen(8000, () => {
    console.log('server running on 8000')
})