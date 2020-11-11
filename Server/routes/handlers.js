const make_request = require('./../database')

function getRooms(_, res) {
    make_request(
        `SELECT room_name
         FROM Rooms`,
        res
    );
}

function getRoomData(req, res) {
    const room_name = req.params.room;
    make_request(
        `SELECT temperature, humidity, pressure, time
         FROM WeatherReadings
         WHERE room_name = '${room_name}'`,
        res
    )
}

function getRoomTemperature(req, res) {
    const room_name = req.params.room;
    make_request(
        `SELECT temperature, time
         FROM WeatherReadings
         WHERE room_name = '${room_name}'`,
        res
    )
}

function getRoomHumidity(req, res) {
    const room_name = req.params.room;
    make_request(
        `SELECT humidity, time
         FROM WeatherReadings
         WHERE room_name = '${room_name}'`,
        res
    )
}

function getRoomPressure(req, res) {
    const room_name = req.params.room;
    make_request(
        `SELECT pressure, time
         FROM WeatherReadings
         WHERE room_name = '${room_name}'`,
        res
    )
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
    getRoomData: getRoomData,
    getRoomTemperature: getRoomTemperature,
    getRoomHumidity: getRoomHumidity,
    getRoomPressure: getRoomPressure,
    newData: newData,
}