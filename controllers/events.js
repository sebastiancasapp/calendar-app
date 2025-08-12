const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async( req, res = response ) => {

    const events = await Event.find()
                                .populate('user','name');

    res.json({
        ok: true,
        events
    });
}

const createEvent = async ( req, res = response ) => {

    const event = new Event( req.body );

    try {

        event.user = req.uid;
        
        const eventGuardado = await event.save();

        res.json({
            ok: true,
            event: eventGuardado
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const updateEvent = async( req, res = response ) => {
    
    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event no existe por ese id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este event'
            });
        }

        const nuevoEvent = {
            ...req.body,
            user: uid
        }

        const eventActualizado = await Event.findByIdAndUpdate( eventId, nuevoEvent, { new: true } );

        res.json({
            ok: true,
            event: eventActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteEvent = async( req, res = response ) => {

    const eventId = req.params.id;
    const uid = req.uid;

    try {

        const event = await Event.findById( eventId );

        if ( !event ) {
            return res.status(404).json({
                ok: false,
                msg: 'Event no existe por ese id'
            });
        }

        if ( event.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este event'
            });
        }


        await Event.findByIdAndDelete( eventId );

        res.json({ ok: true });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}