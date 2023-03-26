const express =require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyparser = require('body-parser');
const router = require('./Routers/UserRegister&Login');


// Connect MongoDB at default port 27017.
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/PracticeDB',  (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.')
    } else {
        console.log('Error in DB connection: ' + err)
    }
});

const app =express();

app.use(cors());
app.use(bodyparser.json())
app.use(router)

const PORT = process.env.PORT | 5000;
app.listen(PORT,(req,res)=>{
    console.log(`listinig succesfully at port ${PORT}`)
})
