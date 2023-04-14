const mongoose = require('mongoose');


module.exports = () => {
    mongoose
        .connect(process.env.CONNECTION_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        })
        .then(console.log('database connection successful'))
        .catch((err) => console.log('something wrong ', err));
}