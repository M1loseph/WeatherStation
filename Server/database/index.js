const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: 'WeatherStation',
    connectionLimit: 5
});

function make_request(query, res) {
    pool.getConnection()
        .then(conn => {
            conn.query(query)
                .then(rows => {
                    res.send(rows);
                })
                .catch(err => {
                    res.status(400);
                    res.json({
                        message: 'Querry error',
                        err: err
                    });
                })
                .finally(() => {
                    conn.release();
                })
        })
        .catch(err => {
            res.status(500);
            res.json({
                message: 'Could not establish connection',
                err: err
            });
        });
}

module.exports = make_request;