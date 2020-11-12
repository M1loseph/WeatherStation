const router = require('express').Router();
const handlers = require('./handlers')

router.get('/rooms', handlers.getRooms);
router.get('/weather', handlers.getWeather);
router.get('/temperature', handlers.getTemperature)
router.get('/humidity', handlers.getHumidity)
router.get('/pressure', handlers.getPressure)

router.post('/newdata', handlers.newData)

module.exports = router;