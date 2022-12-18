//npm packages import
const express = require('express');
const app = express();

//local packages import

//middlewares

app.get('/', (req, res) => {
	res.status(200).send('welcome,welcome this is the first part of mern blog');
});

app.listen(5000, () => {
	console.log('app is running on port 5000');
});