const express = require('express')
const cors = require('cors')
require('dotenv').config()
const errorHandler = require('./utils/error.handler.js')
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');


const app = express()

let corsOption = {
    origin: '*'
}


app.use(cors(corsOption))

//parse request of content_type application/json
app.use(express.json())
app.use(cookieParser());

//parse request of content_type aplication/x-www-form-urllencoded
app.use(express.urlencoded({ extende: true }))

app.get('/', (req, res) => {
    res.json({
        message: 'welcome to homepage'
    })
})

// Routes
app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes.js'));


app.use(errorHandler);
connectDB();


app.listen(process.env.PORT || 5000, () => {
    console.log('server is running on port:' + process.env.PORT || 8000)
})
