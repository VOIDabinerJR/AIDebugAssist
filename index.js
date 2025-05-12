const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: [], // Coloca aqui o domínio frontend ex: ['http://localhost:5173']
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// View engine (opcional)
app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

// Static file (se tiver HTML ou assets)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const authRoutes = require('./routes/authRoutes');
const debugRoutes = require('./routes/debugRoutes');

app.use('/auth', authRoutes);
app.use('/debug', debugRoutes); // inputs e outputs

// Test route
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🔥 Server running on port ${PORT}`);
});
