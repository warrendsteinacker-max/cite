import express from 'express'
import cors from 'cors'
import Users from '/Users.js'
import App from '../vite-project/src/App'

const app = express()

app.use(express.json())
app.use(cors({orgin: '*', }))