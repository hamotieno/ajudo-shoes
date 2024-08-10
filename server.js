const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files (like images) from the 'public' folder
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ajudo-shoes', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define the shoe schema and model
const shoeSchema = new mongoose.Schema({
    name: String,
    price: Number,
    color: String,
    sizes: [String],
    image: String,
    phoneNumber: String
});

const Shoe = mongoose.model('Shoe', shoeSchema);

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Routes

// Add new shoe
app.post('/add-shoe', upload.single('shoe-image'), async (req, res) => {
    try {
        const newShoe = new Shoe({
            name: req.body['shoe-name'],
            price: req.body['shoe-price'],
            color: req.body['shoe-color'],
            sizes: req.body['shoe-size'].split(','),
            image: req.file.path,
            phoneNumber: req.body['phone-number']
        });

        await newShoe.save();
        res.status(201).json(newShoe);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all shoes
app.get('/shoes', async (req, res) => {
    try {
        const shoes = await Shoe.find();
        res.json(shoes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
