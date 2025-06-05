const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/userroutes');
const nurseryRoutes=require('./routes/nurseryRouter');
<<<<<<< HEAD
const wishRoute = require('./routes/addToWish');
const bagRoute = require('./routes/bagRoutes');
const locationRoute = require('./routes/Location');
const paymentRoute = require('./routes/payment');

=======
const potRoutes=require('./routes/potRouter');
const bagRoute = require('./routes/addToBag');
>>>>>>> a9e76b14fb723ee31a9364a796c16a8b2a108be3

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI= 'mongodb+srv://karaktusar:tusarkarak%40123@completecoding.wxrzziq.mongodb.net/collage-project?retryWrites=true&w=majority&appName=CompleteCoding';

app.use(authRoutes);
app.use(nurseryRoutes);
<<<<<<< HEAD
app.use(bagRoute);
app.use(wishRoute);
app.use(locationRoute)
app.use(paymentRoute)
=======
app.use(potRoutes);
app.use(bagRoute);
>>>>>>> a9e76b14fb723ee31a9364a796c16a8b2a108be3

const PORT = 5000;
mongoose.connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
