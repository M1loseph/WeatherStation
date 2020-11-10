CREATE DATABASE WeatherStation;

CREATE TABLE Rooms
(
    room_id INT PRIMARY KEY AUTO_INCREMENT,
    room_name VARCHAR(30) NOT NULL,
    owner VARCHAR(30) DEFAULT NULL 
);

CREATE TABLE WeatherReadings
(
    weather_reading_id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT NOT NULL REFERENCES Rooms(room_id),
    temperature FLOAT DEFAULT NULL,
    humidity FLOAT DEFAULT NULL,
    pressure FLOAT DEFAULT NULL
);
