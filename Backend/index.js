const connectToMongo= require('./db')
const express = require('express')
connectToMongo()
const app = express()
var cors = require('cors')
const port = 5000
app.use(express.json())
app.use(cors())
app.get('/', (req, res) => {
  res.send('Hello Hari!')
})


app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})