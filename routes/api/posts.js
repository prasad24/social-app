const router = require('express').Router();

router.get('/test', (req, res) => {
    res.json({
        message: 'posts works'
    });
});

module.exports = router;