const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'WeatherStation',
    connectionLimit: 5
});

function getWeather(room, success, error) {
    pool.query(`
        SELECT temperature, humidity, pressure, time
        FROM WeatherReadings
        WHERE room_id = 
        (
            SELECT room_id
            FROM Rooms
            WHERE room_name = ?
        )`, [room])
        .then(rows => {
            success(rows);
        })
        .catch(err => {
            error(err);
        })
}

function getWeatherBetween(roomName, success, error, success, error) {
    pool.query(`
        SELECT temperature, humidity, pressure, time
        FROM WeatherReadings
        WHERE room_id = 
        (
            SELECT room_id
            FROM Rooms
            WHERE room_name = ?
        )`, [roomName])
        .then(rows => {
            success(rows);
        })
        .catch(err => {
            error(err);
        })
}

function getRooms(success, error) {
    pool.query('SELECT room_name FROM Rooms')
        .then(rows => {
            success(rows);
        })
        .catch(err => {
            error(err);
        })
}

function addWeatherReaging(room, temperature, humidity, pressure, success, error) {
    pool
        .query(`
            INSERT INTO WeatherReadings(room_id, temperature, humidity, pressure)
            SELECT room_id, ?, ?, ?
            FROM Rooms
            WHERE room_name = ? `,
            [temperature, humidity, pressure, room])
        .then(() => {
            success();
        })
        .catch(err => {
            error(err);
        })
}

module.exports = {
    getWeather: getWeather,
    getWeatherBetween: getWeatherBetween,
    getRooms: getRooms,
    addWeatherReaging: addWeatherReaging,
};