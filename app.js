const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 4000;

const Mongo_Url = process.env.MONGO_URL;

app.set("view engine", 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


// app.get('/', (req, res) => {
//     res.send("Hello World!")
// })

app.use('/', require('./routes/userroute'))
app.use('/api', require('./routes/adminroute'))

app.set('*', (req, res) => {
    return res.redirect('/login');
})

mongoose.connect(Mongo_Url).then(() => {
    app.listen(port, () => {
        console.log(`MongoDB is Connected is ${port}`);
    })
}).catch((err) => {
    console.log(err);

})

