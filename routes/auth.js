/*
    Rutas de Users / Auth
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { 
validateFields } = require('../middlewares/validar-campos');
const { createUser, login, revalidarToken } = require('../controllers/auth');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();



router.post(
    '/new', 
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        
validateFields
    ],
    createUser 
);

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }),
        
validateFields
    ],
    login 
);


router.get('/renew', validarJWT ,revalidarToken );




module.exports = router;