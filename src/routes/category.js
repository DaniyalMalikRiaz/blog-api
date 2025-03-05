const Category = require('../models/category');
const express = require('express');
const router = express.Router();
const AuthMiddleware = require('../middleware/auth')



router.post('/create',async(req,res)=>{
    const {name} = req.body;

    try {
        const category = new Category({
            name,
        })


        await category.save();
        res.status(201).json({
            message:'category Created',
            details: category
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
        res.status(500).json({ error: 'Failed to create category' });
    }
})

module.exports = router;