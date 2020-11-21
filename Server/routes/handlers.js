const chalk = require('chalk')
const db = require('./../database')
const validateDate = require('./validators')

const clientErr = (message) => console.log(chalk.yellow(message));
const serverErr = (message) => console.log(chalk.red.bold(message));

function getRooms(_, res) {
    db.getRooms(
        (rows) => {
            res.send(rows);
        },
        (err) => {
            serverErr(err);
            res.sendStatus(500);
        });
}

function getWeather(req, res) {
    const { room } = req.params;
    db.getWeather(room, (rows) => {
        res.send(rows);
    }, (err) => {
        serverErr(err);
        res.sendStatus(500);
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
                res.sendStatus(500);
            });
    } else {
        clientErr(`[getWeatherBetween] Client arguments: ${from}, ${to}`);
        res.sendStatus(400);
    }
}

function newData(req, res) {
    let { room, temperature, humidity, pressure } = req.body;
    if (room === undefined) {
        clientErr(`[newData] Client arguments: ${room}`)
        res.sendStatus(400);
    } else {
        temperature = temperature !== undefined ? parseFloat(temperature) : null;
        humidity = humidity !== undefined ? parseFloat(humidity) : null;
        pressure = pressure !== undefined ? parseFloat(pressure) : null;

        if (temperature === NaN || humidity === NaN || pressure === NaN) {
            clientErr(`[newData] Client numbers: 
                       temperature: ${temperature},
                       humidity: ${humidity},
                       pressure: ${[pressure]}`);
            res.sendStatus(400);
        } else {
            db.addWeatherReaging(room, temperature, humidity, pressure,
                () => {
                    res.sendStatus(200);
                },
                (err) => {
                    serverErr(err);
                    res.sendStatus(500);
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