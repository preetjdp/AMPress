const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    res.render('gallery' , {title: 'WOW Title'});
});

router.get('/story', (req, res) => {
    res.render('story1' , {layout: 'storyLayout' , title: 'WOW Story'});
});

module.exports = router;