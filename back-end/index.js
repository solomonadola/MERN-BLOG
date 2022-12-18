//npm packages import
const { config } = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
dotenv.config();

//local packages import
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

//database connection
mongoose
	.connect(process.env.DATABASE, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		family: 4,
	})
	.then(console.log('database connection successful'))
	.catch((err) => console.log('something wrong ', err));

//middlewares
app.use(express.json());
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

app.get('/', (req, res) => {
	res.status(200).send('welcome,welcome this is the first part of mern blog');
});

app.listen(5000, () => {
	console.log('app is running on port 5000');
});
