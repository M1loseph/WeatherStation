CREATE DATABASE WeatherStation;
USE WeatherStation;

CREATE USER 'WeatherClient'@'localhost' IDENTIFIED BY '!V44isG@9U';
GRANT ALL PRIVILEGES ON * . * TO 'WeatherClient'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE Rooms
(
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(30) UNIQUE
);

CREATE TABLE WeatherReadings
(
    weather_reading_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id VARCHAR(30) NOT NULL REFERENCES Rooms(room_id),
    temperature FLOAT DEFAULT NULL,
    humidity FLOAT DEFAULT NULL,
    pressure FLOAT DEFAULT NULL,
    time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
