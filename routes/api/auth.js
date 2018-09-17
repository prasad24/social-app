const router = require("express").Router();
const User = require("../../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const passport = require('passport');

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    //Find user
    User.findOne({
        email
    }).then(user => {
        //Check if user exists
        if (!user) {
            return res.status(404).json({
                error: 'Invalid Credentials'
            });
        }
        //Verify password
        bcrypt.compare(password, user.password).then(valid => {
            if (!valid) {
                return res.status(400).json({
                    error: 'Invalid Credential'
                });
            }
            //Generate JWT
            jwt.sign({
                email: user.email,
                id: user._id,
                timestamp: Date.now()
            }, config.tokenSecretKey, {
                expiresIn: 3600
            }, (err, token) => {
                //return JWT
                res.json({
                    success: true,
                    token: 'Bearer ' + token
                });
            });
        });
    });
});

router.post("/register", (req, res) => {
    User.findOne({
            email: req.body.email
        }).then(user => {
            if (user) {
                res.status(400).json({
                    email: "Already exists"
                });
            } else {
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        console.log('Error creating salt', err);
                        throw err;
                    };
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if (err) {
                            throw err;
                        }
                        const password = hash;
                        const newUser = new User({
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            gender: req.body.gender,
                            birthYear: req.body.birthYear,
                            email: req.body.email,
                            password,
                            avatar: 'https://www.gravatar.com/avatar/?d=mm&s=200'
                        });
                        //console.log(newUser);
                        newUser.save().then((user) => {
                                res.json({
                                    id: user._id
                                });
                            })
                            .catch((err) => {
                                console.log('User creation failed', err);
                                res.status(400).json({
                                    error: 'User registration failed'
                                })
                            });
                    });
                });
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: 'User registration failed'
            })
        });
});

router.get('/user', passport.authenticate('jwt', {
    session: false
}), (req, res) => {
    console.log(req.user);
    res.json({
        id: req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email,
        birthYear: req.user.birthYear,
        gender: req.user.gender
    });
});

module.exports = router;