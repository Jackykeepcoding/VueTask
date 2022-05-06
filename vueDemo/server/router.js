let express = require('express')
let router = express.Router()
let user = require('./user')
let login = require('./login')
let register = require('./register')
let goods = require('./goods')
let picture = require('./picture')

router.get('/user', user.get)
router.get('/login', login.login)
router.post('/register', register.register)
router.get('/goods', goods.goods)
router.get('/picture', picture.picture)

module.exports = router
