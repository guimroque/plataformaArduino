var express = require("express")
var router = express.Router();
const AdminController = require('../controllers/AdminController');
const middleware = require('../middleware/auth')

router.get('/missions', middleware.admin, AdminController.index);

router.post('/validar', middleware.admin, AdminController.validar);

router.post('/validarconfronto', middleware.admin, AdminController.validarconfronto);

router.get('/addperson', middleware.admin, AdminController.addperson);

router.post('/adddino', middleware.admin, AdminController.adddino);

router.post('/addcomponente', middleware.admin, AdminController.addcomponenteadm);

router.post('/addhuman', AdminController.addhuman);

router.get('/componentes',middleware.admin, AdminController.componentes);

router.post('/comppacote1',middleware.login, AdminController.addComponente);

router.get('/sorteioconfrontos', middleware.admin, AdminController.rsorteio);

router.get('/gerarconfrontos', middleware.admin, AdminController.sorteio);

module.exports = router;