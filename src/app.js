const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');
const categoryRoutes = require('./routes/category')
app.use('/user', authRoutes);
app.use('/post', postRoutes);
app.use('/category',categoryRoutes);

app.get('/', (req, res) => res.send('Blog-Api issdsadrunning...'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



