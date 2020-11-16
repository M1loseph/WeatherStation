const pool = require('./../database')
const validateDate = require('./validators')

function getRooms(_, res) {
    pool
        .query('SELECT room_name FROM Rooms')
        .then(rows => {
            res.send(rows);
        })
        .catch(err => {
            res.status(500);
            res.send('Server side error')
        })
}

function getWeather(req, res) {
    const { room } = req.params;
    pool
        .query('SELECT temperature, humidity, pressure, time FROM WeatherReadings WHERE room_name = ?', [room])
        .then(rows => {
            res.send(rows);
        })
        .catch(err => {
            res.status(500);
            res.send('Server side error')
        })
}

function getWeatherBetween(req, res) {
    const { room, from, to } = req.params;
    const from_parsed = validateDate(from);
    const to_parsed = validateDate(to);
    if(from_parsed !== undefined && to_parsed !== undefined) {
        pool
            .query('SELECT temperature, humidity, pressure, time FROM WeatherReadings WHERE room_name = ? AND time BETWEEN ? AND ?', [room, from_parsed, to_parsed])
            .then(rows => {
                res.send(rows);
            })
            .catch(err => {
                res.status(500);
                res.send('Server side error');
            })
    } else {
        res.status(400);
        res.send('Incorrect date format');
    }
}

function newData(req, res) {
    let { room_name, temperature, humidity, pressure } = req.body;
    if (room_name === undefined || temperature === undefined || humidity === undefined || pressure === undefined) {
        res.status(400);
        res.send("Not enough arguments");
    } else {
        temperature = parseFloat(temperature);
        humidity = parseFloat(humidity);
        pressure = parseFloat(pressure);

        if (temperature === NaN || humidity === NaN || pressure === NaN) {
            res.status(400);
            res.send("Arguments are not numbers");
        } else {
            pool
                .query(`
                INSERT INTO WeatherReadings(room_name, temperature, humidity, pressure)
                VALUES (?, ?, ?, ?)`,
                    [room_name, temperature, humidity, pressure])
                .then(() => {
                    res.status(200);
                    res.send("OK");
                })
                .catch(err => {
                    res.status(400);
                    res.send("Querry error, problably this room name does not exist")
                })
        }
    }
}

module.exports = {
    getRooms: getRooms,
    getWeather: getWeather,
    getWeatherBetween: getWeatherBetween,
    newData: newData,
}