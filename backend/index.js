
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const errorHandler = require('./middleware/errorHandler')
const  routes  = require('./routes')
const cookie = require('cookie-parser')
const app = express()


app.use(cookie())
app.use(express.json())

app.use(routes)


app.use(errorHandler)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("running successfully")
    })
}

)
.catch((error)=>{
    console.log(error)
})

