const express = require('express');
const userController = require('../controllers/userController');
const UserMiddleware = require('../middleware/userMiddleware');
const CheckMiddleware = require('../middleware/checkMiddleware');

const router = express.Router();

router.get('/', userController.index);
router.get('/token', userController.token);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.patch('/login', UserMiddleware, userController.loginPatch);
router.get('/check', UserMiddleware, userController.check);
router.get('/user', CheckMiddleware, userController.userGetInfo);
router.get('/users', UserMiddleware, userController.usersGetAll);
router.delete('/user/:id', UserMiddleware, userController.userDelete);
router.patch('/user/:id', UserMiddleware, userController.userPatch);

router.put('/harajat', UserMiddleware, userController.harajatPut);
router.get('/harajat', UserMiddleware, userController.harajatGet);
router.delete('/harajat/:id', UserMiddleware, userController.harajatDelete);
router.patch('/harajat/:id', UserMiddleware, userController.harajatPatch);
router.post('/harajat/find', UserMiddleware, userController.harajatFinder);
router.get('/harajat/excel', UserMiddleware, userController.harajatExcel);
router.get('/harajat/excel-by-date', UserMiddleware, userController.harajatExcelByDate);
router.get('/harajat/year', UserMiddleware, userController.harajatYearGet);
router.get('/harajat/graph', UserMiddleware, userController.harajatYearGetGraph);

router.get('/sklad', UserMiddleware, userController.skladGet);
router.post('/sklad/products', UserMiddleware, userController.skladProductsPost);
router.patch('/sklad', UserMiddleware, userController.skladPatchPrice);
router.get('/sklads', UserMiddleware, userController.skladsGet);
router.put('/sklad', UserMiddleware, userController.skladPut);
router.patch('/sklad/product', UserMiddleware, userController.skladDeleteProducts);
router.delete('/sklad/:id', UserMiddleware, userController.skladDelete);
router.patch('/sklad/:id', UserMiddleware, userController.skladPatch);
router.post('/sklad/find', UserMiddleware, userController.skladFinder);
router.get('/sklad/:id/excel', UserMiddleware, userController.skladExcelGet);
router.get('/sklad/price', UserMiddleware, userController.skladPriceGet);

router.get('/products/:id', UserMiddleware, userController.productsGet);
router.post('/products/excel', UserMiddleware, userController.productsExcelPost);
router.patch('/products/:id', UserMiddleware, userController.productsPatch);
router.get('/products', UserMiddleware, userController.productsGetAll);
router.put('/products', UserMiddleware, userController.productsPut);
router.post('/products/find', UserMiddleware, userController.productsFinder);
router.post('/products/:id', UserMiddleware, userController.productsGetClients);
router.post('/products/client/:id', UserMiddleware, userController.productsGetClientsByDate);
router.get('/products/saled', UserMiddleware, userController.productsGetSaled);
router.post('/productId', UserMiddleware, userController.getProductId);
router.put('/product', UserMiddleware, userController.productPut);
router.post('/products/:id/debts', UserMiddleware, userController.getProductsWithDebts);
router.post('/products/info/:id', UserMiddleware, userController.postProductsInfo);
router.post('/products/debt/:id', UserMiddleware, userController.postProductsDebt);
router.put('/products/debt/:id', UserMiddleware, userController.putProductsDebt);
router.get('/products/seller/:id', UserMiddleware, userController.productsGetSeller);
router.post('/products/seller/:id', UserMiddleware, userController.productsPostSeller);
router.get('/products/debts/price', UserMiddleware, userController.getProductsWithDebtsPrice);
router.post('/edit/product', UserMiddleware, userController.editProduct);


router.get('/clients', UserMiddleware, userController.clientsGet);
router.get('/client/:id', UserMiddleware, userController.clientsGetById);
router.put('/clients', UserMiddleware, userController.clientsPut);
router.delete('/client/:id', UserMiddleware, userController.clientsDelete);
router.post('/client/:id', UserMiddleware, userController.clientsPost);

router.post('/sell', UserMiddleware, userController.sellPost);

router.get('/sellers', UserMiddleware, userController.sellerGet);
router.get('/seller/:id', UserMiddleware, userController.getSellerById);
router.put('/sellers', UserMiddleware, userController.sellerPut);
router.delete('/sellers/:id', UserMiddleware, userController.sellerDelete);
router.post('/sellers/:id', UserMiddleware, userController.sellerPost);
router.post('/seller/:id/results', UserMiddleware, userController.getSellerResults);

router.post('/seller/:id/products', UserMiddleware, userController.getSellerProducts);

router.post('/cut', UserMiddleware, userController.cutPost);

router.get('/notices', userController.noticesGet);
router.put('/notices', UserMiddleware, userController.noticesPut);

router.get("/productsYear", UserMiddleware, userController.productsYearGet);
router.get("/productsYear/graph", UserMiddleware, userController.productsYearGetGraph);

router.post("/hisobot", UserMiddleware, userController.hisobotGet);

router.get('/businessdebt', UserMiddleware, userController.businessdebtGet);
router.get('/businessdebt/total', UserMiddleware, userController.businessdebtTotalGet);
router.post('/businessdebt/payed', UserMiddleware, userController.businessdebtPayedGet);
router.get('/businessdebt/:id', UserMiddleware, userController.businessdebtByIdGet);
router.post('/businessdebt/:id', UserMiddleware, userController.businessdebtByIdPost);

router.get("/phone", UserMiddleware, userController.phoneGet);
router.post("/phone", UserMiddleware, userController.phonePost);

module.exports = router;
