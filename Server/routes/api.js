const router = require('express').Router();
const handlers = require('./handlers')

router.get('/rooms', handlers.getRooms);
router.get('/weather/:room/:from-:to', handlers.getRoomData);
router.get('/temperature/:room/:from-:to', handlers.getRoomTemperature)
router.get('/humidity/:room/:from-:to', handlers.getRoomHumidity)
router.get('/preccuse/:room/:from-:to', handlers.getRoomPressure)

router.post('/newdata', handlers.newData)

module.exports = router;