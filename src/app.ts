import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import todoRoutes from './routes'

const { DB_NAME, DB_PARAMS, PROTOCOL, DB_URL, USER, PASSWORD } = process.env

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cors())
app.use(todoRoutes)

const uri: string = `${PROTOCOL}://${USER}:${PASSWORD}@${DB_URL}/${DB_NAME}?${DB_PARAMS}`
const options = { useNewUrlParser: true, useUnifiedTopology: true }
//mongoose.set('useFindAndModify', false)

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on localhost:${PORT}`))
  )
  .catch((error) => {
    throw error
  })
