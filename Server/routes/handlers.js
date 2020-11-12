const make_request = require('./../database')
const validateDate = require('./validators')

function getRooms(_, res) {
    make_request(
        `SELECT room_name
         FROM Rooms`,
        res
    );
}

function getParams(req, res, params) {

    const { room, from, to } = req.query;
    if (room !== undefined) {

        const fromParsed = validateDate(from);
        const toParsed = validateDate(to);

        console.log(fromParsed);
        console.log(toParsed);

        if (from !== undefined && to !== undefined) {
            if (fromParsed !== null && toParsed !== null) {
                make_request(
                    `SELECT ${params}
                    FROM WeatherReadings
                    WHERE room_name = '${room}'
                        AND time BETWEEN '${fromParsed}' AND '${toParsed}'`,
                    res
                )
            } else {
                res.status(400);
                res.json({
                    message: 'Invalid date'
                });
            }
        } else if (from !== undefined) {
            if (fromParsed !== null) {
                make_request(
                    `SELECT ${params}
                    FROM WeatherReadings
                    WHERE room_name = '${room}'
                        AND time > '${fromParsed}'`,
                    res
                )
            } else {
                res.status(400);
                res.json({
                    message: 'Invalid date'
                });
            }
        } else if (to !== undefined) {
            if (fromParsed !== null) {
                make_request(
                    `SELECT ${params}
                     FROM WeatherReadings
                     WHERE room_name = '${room}'
                         AND time < '${toParsed}'`,
                    res
                )
            } else {
                res.status(400);
                res.json({
                    message: 'Invalid date'
                });
            }
        } else {
            make_request(
                `SELECT ${params}
                 FROM WeatherReadings
                 WHERE room_name = '${room}'`,
                res
            )
        }
    } else {
        res.status(400);
        res.json({
            message: 'Room must be provided'
        });
    }
}

function getWeather(req, res) {
    getParams(req, res, 'temperature, humidity, pressure, time')
}

function getTemperature(req, res) {
    getParams(req, res, 'temperature, time')
}

function getHumidity(req, res) {
    getParams(req, res, 'humidity, time')
}

function getPressure(req, res) {
    getParams(req, res, 'pressure, time')
}

function newData(req, res) {
    let { room_name, temperature, humidity, pressure } = req.body;

    console.log('=========================');
    console.log('Body: ');
    console.log(req.body);
    console.log('=========================');

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
            console.log('=========================');
            console.log(room_name);
            console.log(temperature);
            console.log(humidity);
            console.log(pressure);
            console.log('=========================');
            make_request(`
                INSERT INTO WeatherReadings(room_name, temperature, humidity, pressure)
                VALUES
                ('${room_name}', ${temperature}, ${humidity}, ${pressure})
            `,
                res);
        }
    }
}

module.exports = {
    getRooms: getRooms,
    getWeather: getWeather,
    getTemperature: getTemperature,
    getHumidity: getHumidity,
    getPressure: getPressure,
    newData: newData,
}