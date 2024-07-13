const express = require("express");
const mongoose = require("mongoose");
const { type } = require("os");
const path = require('path');
const methodOverride = require('method-override');
require("dotenv").config();
console.log(process.env.PORT);
const app = express();

const connecting = process.env.CONNECT;
mongoose.connect(connecting)
.then (()=> {console.log("Mongodb connected")})
.catch(err => {console.log(err)});

const userSchema = new mongoose.Schema(
    {
        stock: {
            type: Number,
            required:true,
            default: 0,
        },
    },
    { timestamps: true }
  );


const User = mongoose.model("User", userSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.set('view engine', "ejs");
app.set('views', path.join(__dirname, 'views'));


app.get('/', async(req,res) =>{
    try {
        const user = await User.findOne(); // Assuming a single user/document for stock
        return res.render('home', {
            stock: user.stock
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
    
});
 

app.post('/', async(req,res) =>{
    
    try {
        const userId = "6690bb96c78f3d96ec454214"; // Replace this with the actual user ID or dynamic ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (user.stock <= 0) {
            return res.status(400).json({ error: "No stock available" });
        }

        user.stock -= 1;
        await user.save();

        console.log("Stock updated:", user);
        return res.redirect('/'); // Redirect back to the homepage or appropriate page
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred while updating the stock" });
    }
});



app.get('/stock', async(req,res) =>{
    console.log(req.body)
    const user = await User.find({});
    console.log(user);
    return res.render('stock');
});

app.post('/stock',async(req,res) => {
    const { oilstock } = req.body;
    console.log('Received stock value:', oilstock); // Debugging line
    try {
        const filter = { _id: "6690bb96c78f3d96ec454214" };
        const updateDocument = { $set: { stock: oilstock } };
        const result = await User.updateOne(filter, updateDocument);
        console.log('Update result:', result); // Debugging line
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to update stock");
    }
});

// app.patch('/stock', async(req,res) => {
//     const body = req.params.oilstock;
//     console.log(body);
// });


app.listen(process.env.PORT, () => console.log(`Server Started at PORT: ${process.env.PORT}`));