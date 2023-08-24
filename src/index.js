const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv')
dotenv.config();
const PORT = process.env.PORT;
const database = require('./database');
database.connect();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const orderRoute = require('./routes/order')
const orderHistoryRoute = require('./routes/orderHistory')
const productsHandleRouter = require('./routes/productsHandle')
const app = express();
app.use(cors());
app.use(cookieParser())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// Route
app.use('/v1/auth', authRoute);
app.use('/v1/user',userRoute);
app.use('/v1/order', orderRoute)
app.use('/v1/order-history',orderHistoryRoute)
app.use('/v1/products',productsHandleRouter)
app.get('/',(req,res)=>{
    res.send('Hello')
})
app.listen(PORT || 5000, ()=>{
    console.log(`This app is running on http://localhost:${PORT}`)
})