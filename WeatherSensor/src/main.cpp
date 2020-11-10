#include <Arduino.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>

#include <network.hpp>
#include <program_config.hpp>
#include <debug.hpp>

Adafruit_BME280 bme;

struct weather
{
    float temperature;
    float humidity;
    float pressure;
};

// if network fails signalize it with red diode
bool connect_to_wifi(uint32_t threshhold)
{
    uint32 counter = 0;
    WiFi.begin(network::ssid, network::pass);
    while (WiFi.status() != WL_CONNECTED)
    {
        if(counter == threshhold)
        {
            return false;
        }
        counter++;
        delay(500);
    }
    return true;
}

weather read_bme()
{
    float temperature = bme.readTemperature();
    float humidity = bme.readHumidity();
    float pressure = bme.readPressure() / 100.0f; // convert to hPa
    return {temperature, humidity, pressure};
}

// ===================
// Main program
// ===================

void setup()
{
    INIT_DEBUG
    LOG_NL("Connecting to wifi...")
    if(!connect_to_wifi(config::signalise_threshold))
    {
        LOG_NL("Unable to connect to WiFi");
        LOG_NL("Going into deep sleep...");
        pinMode(config::diode_pin, OUTPUT);
        digitalWrite(config::diode_pin, HIGH);
        ESP.deepSleep(config::sleep_time_on_error);
    }
    if(!bme.begin())
    {
        LOG_NL("Unable to init BME sensor")
        LOG_NL("Going into deep sleep...")
        ESP.deepSleep(config::sleep_time_on_error);
    }

    weather w = read_bme();
    StaticJsonDocument<300> doc;
    doc["room_name"] = config::room_name;
    doc["temperature"] = w.temperature;
    doc["humidity"] = w.humidity;
    doc["pressure"] = w.pressure;

    SERIALIZE(doc);

    HTTPClient http;
    http.begin(network::server);
    http.addHeader("Content-Type", "application/json");

    if(http.connected())
    {
        String message_body;
        serializeJson(doc, message_body);
        int client_error = http.POST(message_body);

        LOG_F("Server response: %s", http.errorToString(client_error).c_str())
    }
    else
    {
        LOG_NL("Unable to connect to sever");
    }
    LOG_NL("Going into deep sleep...")
    http.end();
    ESP.deepSleep(config::sleep_time);
}

void loop()
{
}

