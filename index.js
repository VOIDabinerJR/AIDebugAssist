const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');


//const { sendRecoverEmail } = require('./utils/email');

require('dotenv').config({ path: './.env' });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    origin: [],
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));
app.set('view engine', 'ejs');
//app.set('views', path.join(__dirname, 'views/formulario'));





const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);
//const pagesRoutes = require('./routes/pagesRoutes');
//const userRoutes = require('./routes/userRoutes');
//const buttonRoutes = require('./routes/buttonRoutes');
//const orderRoutes = require('./routes/orderRoutes');
//const payRoutes = require('./routes/payRoutes');
//const sdkRoutes = require('./routes/sdkRoutes');


//app.use('/pages', pagesRoutes);
//app.use('/user', userRoutes);
//app.use('/button', buttonRoutes);
//app.use('/order', orderRoutes);
//app.use('/pay', payRoutes);
//app.use('/sdk', sdkRoutes); 

app.get('/a', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});




const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
