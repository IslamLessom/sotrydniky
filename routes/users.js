const express = require('express');
const { current, register, login } = require('../controllers/users');
const router = express.Router();

/* /api/user/login */
router.post('/login', login);

/* /api/user/register */
router.post('/register', register);

/* /api/user/current */
router.get('/current', current);

module.exports = router;
