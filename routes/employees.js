const express = require('express')
const router = express.Router();
const { auth } = require('../middleware/auth')
const { all, add } = require('../controllers/employees')

// /api/employees
router.get('/', auth, all)
// /api/employees/:id
router.get('/:id', auth, () => console.log('get one person'))
// /api/employees/add
router.post('/add', auth, add)
// /api/employees/remove/:id
router.post('/remove/:id', auth, () => console.log('remove person'))
// /api/employees/edit
router.put('/edit/:id', auth, () => console.log('edit person'))

module.exports = router