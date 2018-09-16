const router = require('express').Router();

router.get('/test', (req, res) => {
    res.json({
        message: 'profile works'
    });
});

module.exports = router;