/*
    Event Routes
    /api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { 
validateFields } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');

const router = Router();

// Todas tienes que pasar por la validación del JWT
router.use( validarJWT );


// Obtener events 
router.get('/', getEvents );

// Crear un nuevo event
router.post(
    '/',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','date de inicio es obligatoria').custom( isDate ),
        check('end','date de finalización es obligatoria').custom( isDate ),
        
validateFields
    ],
    createEvent 
);

// Actualizar Event
router.put(
    '/:id', 
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','date de inicio es obligatoria').custom( isDate ),
        check('end','date de finalización es obligatoria').custom( isDate ),
        
validateFields
    ],
    updateEvent 
);

// Borrar event
router.delete('/:id', deleteEvent );

module.exports = router;