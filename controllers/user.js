const User = require('../models/user');

async function handleGetUser(req,res){
    try {
        const user = await User.findOne(); // Assuming a single user/document for stock
        return res.render('home', {
            stock: user.stock
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
    
}

async function handlePostUser(req, res){
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

        
        return res.redirect('/'); // Redirect back to the homepage or appropriate page
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred while updating the stock" });
    }
}

async function handleGetStockUser(req,res){
    
    const user = await User.find({});
    
    return res.render('stock');
}

async function handlePostStockUser(req, res){
    const { oilstock } = req.body;
    
    try {
        const filter = { _id: "6690bb96c78f3d96ec454214" };
        const updateDocument = { $set: { stock: oilstock } };
        await User.updateOne(filter, updateDocument);
        
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to update stock");
    }
}

module.exports = {
    handleGetUser,
    handlePostUser,
    handleGetStockUser,
    handlePostStockUser,
}