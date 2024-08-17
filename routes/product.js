const {Router} = require('express');

const Product = require('../models/product');
const router = Router();

const{
    handleAddNew,
    handlePostProduct,
    handleGetProduct,
    handlePostUser,
    handleGetStockUser,
    handlePostStockUser,
}= require('../controllers/product');

router.get('/add-new', handleAddNew);
router.get('/stock', handleGetStockUser);
router.post('/stock', handlePostStockUser);
router.post('/', handlePostProduct);
router.get('/:productName', handleGetProduct);
router.post('/:productName', handlePostUser);



module.exports = router;