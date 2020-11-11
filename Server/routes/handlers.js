const make_request = require('./../database')

function getRooms(_, res) {
    make_request(
        `SELECT room_name
         FROM Rooms`,
        res
    );
}

function getRoomData(req, res) {
    const room_name = req.params.name;
    make_request(
        `SELECT temperature, humidity, pressure
         FROM WeatherReadings
         WHERE room_name = ${room_name}`,
        res
    )
}

function getRoomTemperature(req, res) {
    res.send(req.params);
}

function getRoomHumidity(req, res) {
    res.send(req.params);
}

function getRoomPressure(req, res) {
    res.send(req.params);
}

function newData(req, res) {
    res.send(req.body);
}

module.exports = {
    getRooms: getRooms,
    getRoomData: getRoomData,
    getRoomTemperature: getRoomTemperature,
    getRoomHumidity: getRoomHumidity,
    getRoomPressure: getRoomPressure,
    newData: newData,
}