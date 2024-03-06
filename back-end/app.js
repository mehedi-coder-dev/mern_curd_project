const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const mongoose = require('mongoose')
const cors = require('cors')
const hpp = require('hpp')
const helmet = require('helmet')
const router = require('./src/routes/api')


// Security
app.use(cors())
app.use(helmet())
app.use(hpp())
app.use(mongoSanitize())
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({limit:"50mb"}))


// rate limit
const limiter = rateLimit({
    windowMs:15*60*1000,
   max:300
})
app.use(limiter)


//mongoose connection
const uriString = 'mongodb+srv://<username>:<password>@cluster0.265l5sm.mongodb.net/Curd';

const option = {user:"mehedi4922",pass:'mehedi4922', autoIndex:true}

mongoose.connect(uriString,option).then(()=>{
    console.log('db connect successful')

}).catch((e)=>{
    console.log('db not connect!')
})

// routes
app.use('/api/v1',router)

// Not found page
app.use("*",(req,res)=>{
    res.status(404).json({status:'fail',data:'page not found'})
})

module.exports = app