const express = require('express');
const userController = require('../controllers/userController');
const UserMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

router.get('/', userController.index);
router.get('/token', userController.token);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/check', UserMiddleware, userController.check);
router.get('/user', UserMiddleware, userController.userGetInfo);

router.put('/harajat', UserMiddleware, userController.harajatPut);
router.get('/harajat', UserMiddleware, userController.harajatGet);
router.post('/harajat', UserMiddleware, userController.harajatPost);
router.delete('/harajat/:id', UserMiddleware, userController.harajatDelete);
router.patch('/harajat/:id', UserMiddleware, userController.harajatPatch);
router.post('/harajat/find', UserMiddleware, userController.harajatFinder);
router.get('/harajat/excel', UserMiddleware, userController.harajatExcel);

router.post('/filter/harajat', UserMiddleware, userController.aggregateHarajatwithYear);

router.get('/sklad', UserMiddleware, userController.skladGet);
router.put('/sklad', UserMiddleware, userController.skladPut);
router.delete('/sklad/:id', UserMiddleware, userController.skladDelete);
router.patch('/sklad/:id', UserMiddleware, userController.skladPatch);
router.post('/sklad/find', UserMiddleware, userController.skladFinder);
router.get('/sklad/:id/excel', UserMiddleware, userController.skladExcelGet);

router.get('/products/:id', UserMiddleware, userController.productsGet);
router.patch('/products/:id', UserMiddleware, userController.productsPatch);
router.get('/products', UserMiddleware, userController.productsGetAll);
router.put('/products', UserMiddleware, userController.productsPut);
router.post('/products/:id', UserMiddleware, userController.productsGetClients);
router.post('/products/client/:id', UserMiddleware, userController.productsGetClientsByDate);
router.get('/products/saled', UserMiddleware, userController.productsGetSaled);
router.post('/productId', UserMiddleware, userController.getProductId);
router.put('/product', UserMiddleware, userController.productPut);
router.post('/products/:id/debts', UserMiddleware, userController.getProductsWithDebts);
router.post('/products/info/:id', UserMiddleware, userController.postProductsInfo);

router.get('/clients', UserMiddleware, userController.clientsGet);
router.get('/client/:id', UserMiddleware, userController.clientsGetById);
router.put('/clients', UserMiddleware, userController.clientsPut);
router.delete('/client/:id', UserMiddleware, userController.clientsDelete);
router.post('/client/:id', UserMiddleware, userController.clientsPost);

router.post('/sell', UserMiddleware, userController.sellPost);

module.exports = router;
