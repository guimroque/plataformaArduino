var express = require("express")
var router = express.Router();
var UserController = require('../controllers/UserController');
const middleware = require('../middleware/auth')

router.get('/index',middleware.login, UserController.index);

router.get('/env',middleware.login, UserController.env);

router.get('/dino/:id',middleware.login, UserController.dino);

router.get('/componente/:id',middleware.login, UserController.componente);

router.get('/humano/:id',middleware.login, UserController.humano);

router.get('/wiki',middleware.login, UserController.wiki);

router.post('/store',middleware.login, UserController.store);

router.get('/exercicio',middleware.login, UserController.exercicios);

router.post('/respostas',middleware.login, UserController.respostas);

router.get('/aviso',middleware.login, UserController.aviso);

router.get('/componentes1',middleware.login, UserController.componentes1);

router.post('/comppacote1',middleware.login, UserController.addComponente);

router.get('/desafios',middleware.login, UserController.desafios);

router.post('/storeconfronto', middleware.login, UserController.storeconfrontos);

router.get('/confrontos', middleware.login, UserController.confrontosList);

module.exports = router;