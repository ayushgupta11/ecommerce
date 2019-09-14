import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import approutes from './routes'

const app = express()
const port = process.env.PORT || 8181

app.use(bodyParser.json())
app.use(cors())
app.use(morgan('tiny'))

approutes(app)

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})