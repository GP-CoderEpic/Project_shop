const Product = require('../models/product');

async function handleGetStockUser(req,res){
    
    const product = await Product.find({});
    // console.log(product);
    return res.render('stock',{product});
}

async function handlePostStockUser(req, res){
    const product = req.body;
    const key = Object.keys(product)[0];
    const value = product[key];
    console.log('Key:', key);
    console.log('Value:', value);
    // const number = req.body;
    // console.log(number);
    
    try {
        const filter = { productName: key };
        const updateDocument = { $set: { Stock: value } };
        await Product.updateOne(filter, updateDocument);
        
        return res.redirect(`/product/${key}`);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Failed to update stock");
    }
}

async function handleAddNew(req, res) {
    return res.render('addProduct');
}

async function handlePostProduct(req,res){
    const { productName, costPrice, sellingPrice, ExpiryDate, Stock } = req.body;

    try {
        const product = await Product.create({
            productName,
            costPrice,
            sellingPrice,
            ExpiryDate,
            Stock,
        });
        return res.redirect(`/product/${product.productName}`);
    } catch (error) {
        console.error('Error creating product:', error);
        return res.status(500).send('An error occurred while creating the product.');
    }
}

async function handleGetProduct(req, res){
    const { productName } = req.params;
    
    try {
        const product = await Product.findOne({ productName: req.params.productName });
        

        if (!product) {
            return res.status(404).send('Product not found.');
        }

        // console.log(product.Stock);
        return res.render('products', {
            product,
        });
        
    } catch (error) {
        console.error('Error fetching product:', error);
        return res.status(500).send('An error occurred while fetching the product.');
    }
}

async function handlePostUser(req, res){
    try {
        const product = await Product.findOne({ productName: req.params.productName });
        // console.log(product.productName);
        if (!product) {
            return res.status(404).json({ error: "User not found" });
        }

        if (product.stock <= 0) {
            return res.status(400).json({ error: "No stock available" });
        }

        const a = product.Stock -= 1;
        await product.save();

        
        return res.redirect(`/product/${product.productName}`); // Redirect back to the homepage or appropriate page
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occurred while updating the stock" });
    }
}



module.exports = {
    handleAddNew,
    handlePostProduct,
    handleGetProduct,
    handlePostUser,
    handleGetStockUser,
    handlePostStockUser,
};