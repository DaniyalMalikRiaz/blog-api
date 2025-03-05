const express = require('express');
const router = express.Router();
const Post = require('../models/posts');
const Category = require('../models/category');
const AuthMiddleware = require('../middleware/auth')



router.post('/create', AuthMiddleware([
    'Admin','Writer'
]) ,async(req,res)=>{
    const {title,content,categoryName} = req.body;

    try {

        const category = await Category.findOne({name: {'$regex': `^${categoryName}$`, $options: 'i'}})
        if(!category){
            const allCategories = await Category.find();
           return res.status(500).json({ error: 'Cannot find category' , 
           message: 'Choose from the following categories:', 
           details: allCategories.map(category => category.name)});
        }

        const post = new Post({
            title,
            content,
            category: category._id,
            author : req.user.id
        })


        await post.save();
        res.status(201).json({
            message:'Post Created',
            details: post
        })
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        res.status(500).json({ error: 'Failed to create post' });
    }
})

module.exports = router;