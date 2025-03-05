const express = require('express');
const router = express.Router();
const User = require('../models/users');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async(req,res)=>{
    const {name, email, password, role} = req.body;

    try {
        const user = new User({name, email, password, role})
        await user.save();
        console.log(req.body);
        res.status(201).json({message: 'Registered'})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/login', async(req,res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });

    } catch (error) {
        res.status(500).json({ error: 'Error logging in' });
    }
})

module.exports = router;