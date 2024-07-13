const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");
const path = require('path');
const methodOverride = require('method-override');
require("dotenv").config();
const userRouter = require('./routes/user');
const app = express();

const connecting = process.env.CONNECT;
mongoose.connect(connecting)
.then (()=> {console.log("Mongodb connected")})
.catch(err => {console.log(err)});


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));
app.use('/', userRouter);


app.listen(process.env.PORT, () => console.log(`Server Started at PORT: ${process.env.PORT}`));