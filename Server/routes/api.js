const router = require('express').Router();
const handlers = require('./handlers')

router.get('/rooms', handlers.getRooms);
router.get('/weather/:room', handlers.getWeather);
router.get('/weather/:room/:from/:to', handlers.getWeatherBetween);
router.post('/newdata', handlers.newData)

module.exports = router;