const express = require('express');

const router = express.Router();
const {
    handleGetUser,
    handlePostUser,
    handleGetStockUser,
    handlePostStockUser,
} = require('../controllers/user');
const User = require('../models/user');

router.route('/')
.get(handleGetUser)
.post(handlePostUser);
 
router.route('/stock')
.get(handleGetStockUser)
.post(handlePostStockUser);
 
module.exports = router;