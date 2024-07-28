const express = require('express');

const router = express.Router();
const {
    handleGetUser,
    handlePostUser,
    handleGetStockUser,
    handlePostStockUser,
} = require('../controllers/user');
const User = require('../models/user');

router.route('https://project-shop-re5vekj8i-gp-coderepics-projects.vercel.app/')
.get(handleGetUser)
.post(handlePostUser);
 
router.route('https://project-shop-re5vekj8i-gp-coderepics-projects.vercel.app/stock')
.get(handleGetStockUser)
.post(handlePostStockUser);

module.exports = router;