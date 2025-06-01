const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
//const { MONGO_URI } = require('./config');
const authRoutes = require('./routes/userroutes');
const nurseryRoutes=require('./routes/nurseryRouter');
const potRoutes=require('./routes/potRouter');
const bagRoute = require('./routes/addToBag');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI= 'mongodb+srv://karaktusar:tusarkarak%40123@completecoding.wxrzziq.mongodb.net/collage-project?retryWrites=true&w=majority&appName=CompleteCoding';

app.use(authRoutes);
app.use(nurseryRoutes);
app.use(potRoutes);
app.use(bagRoute);

const PORT = 5000;
mongoose.connect(MONGO_URI)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch(err => console.error(err));
