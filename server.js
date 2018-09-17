const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');
const authRoutes = require('./routes/api/auth');
const postRoutes = require('./routes/api/posts');
const profileRoutes = require('./routes/api/profile');
const passport = require('passport');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


//db connection
mongoose.connect(config.mongoUri, {
        useNewUrlParser: true
    })
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log('Mongo connection failed', err));

//Passport
app.use(passport.initialize());
require('./config/passport')(passport);

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`);
});