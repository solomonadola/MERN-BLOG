//npm packages import
const { config } = require('dotenv');
const express = require('express');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

//database
require('./startup/db')();
//local packages router setup import
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

//database connection

//middlewares
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/post', postRoute);

app.listen(5000, () => {
	console.log('app is running on port 5000');
});
