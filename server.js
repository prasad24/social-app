const express = require('express');
// const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./config/config');
const authRoutes = require('./routes/api/auth');
const postRoutes = require('./routes/api/posts');
const profileRoutes = require('./routes/api/profile');

const app = express();
const PORT = process.env.PORT || 5000;

//db connection
mongoose.connect(config.mongoUri, {
        useNewUrlParser: true
    })
    .then(() => console.log('Mongodb connected'))
    .catch((err) => console.log('Mongo connection failed', err));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/posts", postRoutes);

app.get("/", (req, res) => res.send('hello'));

// // app.use(bodyParser.urlencoded(true));
// // app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Connected on port ${PORT}`);
});