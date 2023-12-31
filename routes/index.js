var express = require('express');
var router = express.Router();

const userRoute = require('./userRouter/index')
const productRoute = require('./productRoute/index')

router.use('/user', userRoute);
router.use('/product', productRoute);

router.get('/', function (req, res) {
    res.send({
        mes:"Index page"
    })
});
module.exports = router;