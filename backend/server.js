const express  = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const db = require('./db')
const PORT = process.env.PORT || 8000
const router = require('./Routes/Index')

// db connection
db.connect()

// middleware
app.use(bodyParser.json({limit:"50mb"}))
app.use(bodyParser.urlencoded({ extended:true,limit:"50mb"}))

app.use(express.json())

// headers
app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next()
})
// api
app.use('/backend',router)

// cors
app.use(cors())

// listning
app.listen(PORT , ()=>{
    console.log("Server lisning on port 8000")
})
