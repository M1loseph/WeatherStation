const chalk = require('chalk')
const db = require('./../database')
const validateDate = require('./validators')

const clientErr = (message) => console.log(chalk.yellow.inverse(message));
const serverErr = (message) => console.log(chalk.red.bold.inverse(message));

function getRooms(_, res) {
    db.getRooms(
        (rows) => {
            res.send(rows);
        },
        (err) => {
            serverErr(err);
            res.status(500);
            res.send('Server side error')
        });
}

function getWeather(req, res) {
    const { room } = req.params;
    db.getWeather(room, (rows) => {
        res.send(rows);
    }, (err) => {
        serverErr(err);
        res.status(500);
        res.send('Server side error')

    });
}

function getWeatherBetween(req, res) {
    const { room, from, to } = req.params;
    const fromParsed = validateDate(from);
    const toParsed = validateDate(to);
    if (fromParsed !== undefined && toParsed !== undefined) {
        db.getWeatherBetween(room, fromParsed, toParsed,
            (rows) => {
                res.send(rows);
            },
            (err) => {
                serverErr(err);
                res.status(500);
                res.send('Server side error');
            });
    } else {
        clientErr(`[getWeatherBetween] Client arguments: ${from}, ${to}`);
        res.status(400);
        res.send('Incorrect date format');
    }
}

function newData(req, res) {
    let { room, temperature, humidity, pressure } = req.body;
    if (room === undefined) {
        clientErr(`[newData] Client arguments: ${room}`)
        res.status(400);
        res.send("Room name must be privided");
    } else {
        temperature = temperature !== undefined ? parseFloat(temperature) : null;
        humidity = humidity !== undefined ? parseFloat(humidity) : null;
        pressure = pressure !== undefined ? parseFloat(pressure) : null;

        if (temperature === NaN || humidity === NaN || pressure === NaN) {
            clientErr(`[newData] Client numbers: 
                       temperature: ${temperature},
                       humidity: ${humidity},
                       pressure: ${[pressure]}`);
            res.status(400);
            res.send("Arguments are not numbers");
        } else {
            db.addWeatherReaging(room, temperature, humidity, pressure,
                () => {
                    res.status(200);
                    res.send('OK');
                },
                (err) => {
                    serverErr(err);
                    res.send(500);
                    res.send('Server side error');
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