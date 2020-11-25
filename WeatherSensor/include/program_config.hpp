#ifndef __PROGRAM_CONFIG_HPP__
#define __PROGRAM_CONFIG_HPP__

#include <Arduino.h>

#if (defined(ESP32) && defined(ESP8266)) || (!defined(ESP32) && !defined(ESP8266))
#error Wrong build flags!
#endif

#if (defined(MILOSZ) && defined(SEBA)) || (!defined(MILOSZ) && !defined(SEBA))
#error Only one name can be specified!
#endif 

#ifdef ESP8266
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#elif defined(ESP32)
#include <Wifi.h>
#include <HTTPClient.h>
#endif

static constexpr uint8_t get_diode_pin()
{
#ifdef ESP8266
    return D5;
#elif defined(ESP32)
    return 33U
#endif
}

static constexpr const char* get_room_name()
{
#ifdef MILOSZ
    return "milosz";
#elif defined(MILOSZ)
    return "seba";
#endif
}

namespace config
{
    constexpr uint32_t signalise_threshold = 20U;
    constexpr unsigned long monitor_speed = 115200;
    constexpr uint8_t diode_pin = get_diode_pin();
    constexpr uint64_t sleep_time = 20e7;
    constexpr uint64_t sleep_time_on_error = 10e7;
    constexpr const char *room_name = get_room_name();
} // namespace config

#endif // __PROGRAM_CONFIG_HPP__