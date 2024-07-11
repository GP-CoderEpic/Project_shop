const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");
const path = require('path');

const app = express();

mongoose.connect("mongodb+srv://Gaurav-admin:gaurav_200519@cluster0.ujtovnr.mongodb.net/stockCheck")
.then (()=> {console.log("Mongodb connected")})
.catch(err => {console.log(err)});

const userSchema = new mongoose.Schema(
    {
        stock: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
  );


const User = mongoose.model("User", userSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));


app.get('/', async(req,res) =>{
    
    return res.render('home');
    
});
 

app.post('/', async(req,res) =>{
    const minus = req.body.stock - 1;
    console.log(minus);
    const message = "only 1 product left";
    const Message = "Stock of this product finished re-stock as soon as possible";
    const error = "NO stock available"; 
    if(minus==1) return res.json({Reminder: message}); 
    if(minus==0) return res.json({Reminder: Message});
    if(minus<0) return res.json({error: error});
    await User.create({
        stock: minus,
    });  
    return res.json({stockLeft: minus});
});

app.get('/stock', async(req,res) =>{
    const Stock = User.find({});
    return res.render('stock', {
        Stock,
    });
});
app.post('/stock', async(req,res) => {
    const body = req.body;
    await User.create({
        stock: body.oilstock,
    });
    await User.create({
        stock_left: stock,
      });
    return res.render('home');
});
// const plus = document.querySelector(".plus"),
//       minus = document.querySelector(".minus"),
//       num = document.querySelector(".num");
// let a=0;

//  plus.addEventListener("click", () => {
//     a++;
//     a = (a<10) ? "0" + a : a;
//     num.innerText = a;
// });

// minus.addEventListener("click", () => {
//     if(a>0){
//     a--;
//     a = (a<10) ? "0" + a : a;
//     num.innerText = a;
//     }
// });     

app.listen(8080, () => console.log(`Server Started at PORT:8080`));