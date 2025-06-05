const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const { MONGO_URI } = require('./config');
const authRoutes = require('./routes/userroutes');
const nurseryRoutes=require('./routes/nurseryRouter');
const wishRoute = require('./routes/addToWish');
const bagRoute = require('./routes/bagRoutes');
const locationRoute = require('./routes/Location');
const paymentRoute = require('./routes/payment');


const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI= 'mongodb+srv://karaktusar:tusarkarak%40123@completecoding.wxrzziq.mongodb.net/collage-project?retryWrites=true&w=majority&appName=CompleteCoding';

app.use(authRoutes);
app.use(nurseryRoutes);
app.use(bagRoute);
app.use(wishRoute);
app.use(locationRoute)
app.use(paymentRoute)

const PORT = 5000;
mongoose.connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
