const router = require('express').Router();
const { getUser } = require('../handlers/apiHandler');


router.get('/user', getUser);

module.exports = router;