const express = require('express');
const userController = require('../controllers/userController');
const UserMiddleware = require('../middleware/user2Middleware');
const CheckMiddleware = require('../middleware/checkMiddleware');

const router = express.Router();

router.patch('/login', UserMiddleware, userController.loginPatch);
router.get('/user', CheckMiddleware, userController.userGetInfo);

router.get('/sklad', UserMiddleware, userController.skladGet);
router.get('/sklad/:id/excel', UserMiddleware, userController.skladExcelGet);
router.post('/sklad/products', UserMiddleware, userController.skladProductsPost);

router.get('/products/:id', UserMiddleware, userController.productsGet);

module.exports = router;
