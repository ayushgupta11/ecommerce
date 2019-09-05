import express from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = process.env.PORT || 8181

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Server up & running!")
})

app.listen(port, () => {
    console.log(`Listening to port ${port}`)
})